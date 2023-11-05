import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// Router
import authRouter from "./routes/authRouter.js";

// middleware
// import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
// import { authenticateUser } from "./middlewares/authMiddleware.js";
// import {validateTest} from "./middlewares/validationMiddleware.js";

// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({ name });
// });

app.use(cors({ origin: "https://foodapp-react-sctz.onrender.com/" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/test", (req, res) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("Test", "QWERTY", {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
  });
  return res.json({ message: "This is a message from test route" });
});
 
app.use("/api/v1/auth", authRouter); 
// app.use("*", (req, res) => {
//   res.status(404).json({ msg: `Not Found` });
// });
//middleware
// app.use(errorHandlerMiddleware);


app.get("/api/v1/hello", (req, res) => {
  return res.json({msg:"Hello"});
});

app.get("/", (req, res) => {
  // const oneDay = 1000 * 60 * 60 * 24;
  // res.cookie("Test", "QWERTY", {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  //   secure: true,
  // });
  // return res.json({ message: "This is a message from default route" });
});
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
