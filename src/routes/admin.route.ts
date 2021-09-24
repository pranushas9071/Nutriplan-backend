import express from "express";
import { adminController } from "../controllers";

export const adminRouter = express.Router();

adminRouter.get("/findUser", adminController.searchUser);
adminRouter.delete("/deleteUser", adminController.deleteUser);
adminRouter.put("/updateRole", adminController.updateUserRole);
adminRouter.put("/updateUserDetails", adminController.updateUserDetails);
adminRouter.put("/updateGoal", adminController.updateGoal);
adminRouter.get("/getAllUser", adminController.getAllUser);
adminRouter.get("/getUserDetails", adminController.getUserDetails);

