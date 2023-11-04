import * as dotenv from "dotenv";

dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// Router
import authRouter from "./routes/authRouter.js" 
const cors = require("cors");

// middleware
// import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
// import { authenticateUser } from "./middlewares/authMiddleware.js";
// import {validateTest} from "./middlewares/validationMiddleware.js";

// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({ name });
// });

app.use(cors({ origin: "https://omnifood-nikhilverma.netlify.app" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "test" });
});
// app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", authenticateUser, userRouter);
// app.use("*", (req, res) => {
//   res.status(404).json({ msg: `Not Found` });
// });
//middleware
// app.use(errorHandlerMiddleware);
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
