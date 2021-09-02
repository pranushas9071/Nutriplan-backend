import cors from "cors";
import dotenv from "dotenv";
import express, { json, Request, Response } from "express";
import mongoose from "mongoose";
import { dailyDataRouter, foodRouter, userRouter } from "./routes";


dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/dailyUpdate",dailyDataRouter)

app.use("*", (req: Request, res: Response) => {
  res.status(404);
  res.send("Page not found!!!");
});

let url = "";
if (!!process.env.CONNECTION && !!process.env.DATABASE)
  url = process.env.CONNECTION + process.env.DATABASE;
const PORT = process.env.PORT;

mongoose
  .connect(url, {
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
