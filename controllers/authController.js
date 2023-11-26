import "express-async-errors";
import UserModel from "../models/UserModel.js";
import OTPModel from "../models/otpModel.js";
import { BadRequestError, UnauthenticatedError } from "../errors/customErros.js";
import { StatusCodes } from "http-status-codes";
import { encryptPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT, createJWT_OTP } from "../utils/tokenUtils.js";
import { getOTP, mailSender } from "../utils/otp.js";
import { verifyJWT } from "../utils/tokenUtils.js";
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
    const resetToken = createJWT_OTP({ userId: user._id });
    console.log("hello")
    const resetLink = `https://foodapp-react-sctz.onrender.com/reset-password?token=${resetToken}`;
    await OTPModel.findOneAndUpdate({ userId: user._id }, { $set: { otp: resetToken, } }, { upsert: true });
    const emailDetails = {
      email: user.email,
      resetLink: resetLink,
      name: user.name
    }
    await mailSender(emailDetails); //send otp to mail nikhil.kops@gmail.com

    res.json({ result: `OTP Send to ${email}` });
  } catch (err) {

    res.json(err.message);
  }
}

export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;
    const { userId } = verifyJWT(token)
    const user = await UserModel.findByIdAndUpdate({ _id: userId }, { new: true });

    const userOTP = await OTPModel.findOne({ userId })

    if (token === userOTP.otp) {
      const hashedPassword = await encryptPassword(password)
      user.password = hashedPassword;
      user.save();
      // Delete the userOTP record
      await OTPModel.deleteOne({ userId })
      res.status(StatusCodes.NO_CONTENT).json({});
    }
    else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "OTP is Wrong !" })
    }
  } catch (err) {

    res.send(err.message);
  }
}