import "express-async-errors";
import Job from "../models/jobModels.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  // Got this user from verifying JWT
  // console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJobs = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { company, position } = req.body;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJobWithID = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const { company, position } = req.body;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(StatusCodes.OK).json({ message: "Update", updatedJob });
};

export const deleteJobs = async (req, res) => {
  const { id } = req.params;
  const deletedJob = await Job.findByIdAndDelete(id);

  if (!deletedJob) {
    return res.status(200).json({ msg: `No job with id : ${id}` });
  }

  return res.status(StatusCodes.OK).json({ message: "Deleted", deletedJob });
};
