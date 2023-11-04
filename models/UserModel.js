import mongoose from "mongoose";
import { ROLE_TYPE } from "../utils/constants.js";
const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "My Location",
  },
  role: {
    type: String,
    enum: Object.values(ROLE_TYPE),
    default: ROLE_TYPE.USER,
  },
});

UserModel.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password 
 
  return obj;
};

export default mongoose.model("User", UserModel);
