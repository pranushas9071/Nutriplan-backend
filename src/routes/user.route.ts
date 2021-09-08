import express from "express";

import { jwtController, userController } from "../controllers";

export const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.get("/checkUser", userController.checkUser);
userRouter.post("/searchUser", userController.searchUsername);
userRouter.post("/searchEmail", userController.searchEmail);
userRouter.put("/updateUserDetails", userController.updateUserDetails);
userRouter.get("/getUserDetails", userController.getUserDetails);
userRouter.put("/updateGoal", userController.updateGoal);
userRouter.get("/getAptWeight", userController.getAptWeight);
userRouter.get("/getRole", userController.getRole);
userRouter.get("/getAllUser", userController.getAllUser);
userRouter.get("/findUser", userController.searchUser);
userRouter.delete("/deleteUser", userController.deleteUser);
userRouter.put("/updateRole", userController.updateUserRole);
userRouter.get("/test", jwtController.verifyToken);
