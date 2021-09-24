import cors from "cors";
import dotenv from "dotenv";
import express, { json, Request, Response } from "express";
import mongoose from "mongoose";
import unless from "express-unless";
import { jwtAuth } from "./services/index";

import { adminRouter, dailyDataRouter, foodRouter, userRouter } from "./routes";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const auth:any=jwtAuth;
auth.unless = unless;
app.use(
  auth.unless({
    path: [
      "/user/checkUser",
      "/user/searchUser",
      "/user/searchEmail",
      "/user/addUser",
    ],
  })
);

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/dailyUpdate", dailyDataRouter);
app.use("/admin",adminRouter)

app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Page not found!!!");
});

let URL = "";
if (!!process.env.CONNECTION && !!process.env.DATABASE)
  URL = process.env.CONNECTION + process.env.DATABASE;
const PORT = process.env.PORT;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to db..");
    app.listen(PORT, () => {
      console.log(`Server started at port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
