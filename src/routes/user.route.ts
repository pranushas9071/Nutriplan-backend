import express from "express";
import { userController } from "../controllers";

export const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.post("/checkUser", userController.checkUser);
userRouter.post("/searchUser", userController.searchUsername);
userRouter.post("/searchEmail", userController.searchEmail);
userRouter.put("/updateUserDetails", userController.updateUserDetails);
userRouter.get("/getUserDetails", userController.getUserDetails);
userRouter.put("/updateGoal", userController.updateGoal);
userRouter.get("/getAptWeight", userController.getAptWeight);
