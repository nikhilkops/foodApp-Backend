import mongoose from "mongoose";

export const MongoDB_Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!")
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  } 
}
