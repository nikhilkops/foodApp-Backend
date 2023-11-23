import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model, change it accordingly
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Set the expiration time for the OTP in seconds (e.g., 5 minutes)
  },
});

 const OTP = mongoose.model('OTP', otpSchema);
 export default OTP
 