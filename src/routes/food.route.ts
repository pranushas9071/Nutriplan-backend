import express from "express";

import { foodController, foodPlanController } from "../controllers";

export const foodRouter = express.Router();
foodRouter.get("/getFood", foodController.getFood);
foodRouter.get("/getAllFood", foodController.getAllFood);
foodRouter.get("/getAllCombo", foodController.getAllComboFood);
foodRouter.post("/addFood", foodController.addFood);
foodRouter.put("/updateFood", foodController.updateFood);
foodRouter.delete("/deleteFood", foodController.deleteFood);
foodRouter.get("/searchFood", foodController.searchFood);

// foodRouter.get("/test", foodPlanController.testBreakFast);
foodRouter.get("/userDailyCalorie", foodPlanController.getUserDailyCalorie);
