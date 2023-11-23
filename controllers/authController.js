import "express-async-errors";
import UserModel from "../models/UserModel.js";
import OTPModel from "../models/otpModel.js";
import { UnauthenticatedError } from "../errors/customErros.js";
import { StatusCodes } from "http-status-codes";
import { encryptPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { getOTP, mailSender } from "../utils/otp.js";
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  const isValidUser = user && (await comparePassword(password, user.password));
  if (!isValidUser) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  user.password = undefined;
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("JWT_TOKEN", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json(user);
};

export const userSignup = async (req, res) => {

  const user = req.body;
  const hashedPassword = await encryptPassword(user.password);
  user.password = hashedPassword;
  const userCreated = await UserModel.create(user);
  res.status(StatusCodes.CREATED).json({ message: "User Created", userCreated });
};

export const userLogout = async (req, res) => {
  res.cookie('JWT_TOKEN', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({ message: 'User Logout!' })
}

export const forgetPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    const user = await UserModel.findOne({ email });

    const otp = getOTP();
    const hashedOTP = await encryptPassword(otp);
    const otpDB = {
      userId: user._id,
      otp: hashedOTP
    } 
    await OTPModel.findOneAndUpdate({ _id: user._id }, otpDB, { upsert: true, new: true }); 
    const otpDetails = {
      email: user.email,
      otp: otp,
      name: user.name
    }
    await mailSender(otpDetails); //send otp to mail nikhil.kops@gmail.com

    res.json({ result: `OTP Send to ${email}` });
  } catch (err) {
    res.json(err.message);
  }
}