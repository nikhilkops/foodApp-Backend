import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// Router
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import pricingRouter from "./routes/pricingRoutes.js"
// import paymentRouter from "./routes/paymentRouter.js"
// middleware
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

//CORS
app.use(cors({ origin: "https://foodapp-react-sctz.onrender.com/" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

// Routes for login logout signup
app.use("/api/v1/auth", authRouter);
//Route Getting current User
app.use("/api/v1/users", authenticateUser, userRouter);
//Getting Pricing card Data
app.use("/api/v1/pricing", pricingRouter)
//Handling Payment
// app.use("api/v1/payment",paymentRouter)


app.get("/", (req, res, next) => { 
  return res.json({ message: "This is a message from default route" });
});

//middleware  
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 1100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Server is running  on Port ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
  process.exit(1);
}
