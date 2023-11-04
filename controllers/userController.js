import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/jobModels.js";

export const getCurrentUser = async (req, res) => {
  const getUser = await User.findOne({ _id: req.user.userId });
  const user = getUser.toJSON();
  res.status(StatusCodes.OK).json({ user });
};
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ userCount: users, jobCount: jobs });
};
export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ message: "User Updated" });
};
