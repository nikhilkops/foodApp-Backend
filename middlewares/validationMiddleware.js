import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError,UnauthenticatedError, Unauthorized } from "../errors/customErros.js";
import { JOB_STATUS, JOB_TYPE, ROLE_TYPE } from "../utils/constants.js";
import mongoose from "mongoose"; 
import User from "../models/UserModel.js";

const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg + " ");
        if (errorMessages[0].startsWith("No Job")) {
          throw new NotFoundError(`No Job with given id `);
        }
        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

export const validateTest = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Length must be  2"),
]);

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company is Required"),
  body("position").notEmpty().withMessage("Position Required"),
  body("jobLocation").notEmpty().withMessage("Job Location is Required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid Status Value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid Job Type Value"),
]);

export const validateIdParams = withValidationErrors([
  param("id").custom(async (id,{req}) => {
    const isMongoDBIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isMongoDBIdValid)
      throw new BadRequestError(`MongoDB id :${id} is not valid`);

    const job = await Job.findById(String(id)); 

    const isAdmin = req.user.role=== ROLE_TYPE.ADMIN;
    const isOwner = req.user.userId ===job.createdBy.toString();

    if(!isAdmin && isOwner) throw new Unauthorized("Not Authorized to access this route")

    if (!job) {
      throw new NotFoundError(`No Job with id :${id}`);
    }
  }),
]);

export const validateUserLogin = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid Email Format")
   ,
    body("password").trim().notEmpty().withMessage("Password cannot be empty")
]);

export const validateUserSignup = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email Already Exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 Character Long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email,{req}) => {
      const user = await User.findOne({ email });
      // Checking if the new email is already in database 
      // if the user exist than only taht user can manipuate that user
      if (user && user._id.toString()!==req.user.userId) {
        throw new BadRequestError("Email Already Exist");
      }
    }), 
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);