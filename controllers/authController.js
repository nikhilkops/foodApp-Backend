import "express-async-errors";
import UserModel from "../models/UserModel.js";
import { UnauthenticatedError } from "../errors/customErros.js";
import { StatusCodes } from "http-status-codes"; 
import { encryptPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const userLogin = async (req, res) => {
  console.log(req.body)
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
  res.status(StatusCodes.CREATED).json({ message: "User Created",userCreated });
};

export const userLogout = async(req,res)=>{
  res.cookie('JWT_TOKEN','logout',{
    httpOnly:true ,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({message:'User Logout!'})
}
 
 