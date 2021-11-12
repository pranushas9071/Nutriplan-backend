import cors from "cors";
import dotenv from "dotenv";
import express, { json, Request, Response } from "express";
import mongoose from "mongoose";
import unless from "express-unless";
import { jwtAuth } from "./services/index";
// @ts-ignore
// import auth from "express-rbac";
import guard from "express-jwt-permissions";

import { adminRouter, dailyDataRouter, foodRouter, userRouter } from "./routes";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const rbac = guard();
const path = [
  "/user/checkUser",
  "/user/searchUser",
  "/user/searchEmail",
  "/user/addUser",
];

const auth: any = jwtAuth;
auth.unless = unless;
app.use(
  auth.unless({
    path: path,
  })
);

const userRbac = rbac.check([["admin"], ["user"]]);
userRbac.unless = unless;

app.use("/user", userRbac.unless({ path: path }), userRouter);
app.use("/food", rbac.check([["admin"], ["user"]]), foodRouter);
app.use("/dailyUpdate", rbac.check([["admin"], ["user"]]), dailyDataRouter);
app.use("/admin", rbac.check("admin"), adminRouter);

app.use( (err:any, req:Request, res:Response,next:any) =>{
  if (err.status === 403) {
    res.status(403).send('Forbidden');
  }
});

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
