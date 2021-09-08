import express from "express";
import { dailyDataController } from "../controllers";

export const dailyDataRouter = express.Router();

dailyDataRouter.post("/addFoodPlan", dailyDataController.createFoodPlan);
dailyDataRouter.put("/updateIntake", dailyDataController.updateIntake);
dailyDataRouter.get("/getFood", dailyDataController.getFood);
dailyDataRouter.get("/currentIntake", dailyDataController.getCurrentIntake);
dailyDataRouter.get("/getIntakeFood", dailyDataController.getIntakeFood);
dailyDataRouter.put("/removeIntake", dailyDataController.removeIntake);
dailyDataRouter.get("/dailyData", dailyDataController.getDailyData);
