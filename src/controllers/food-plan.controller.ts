import { Request, Response } from "express";
import { foodPlanService, userService } from "../services";

class FoodPlanController {

  //for test
  async testBreakFast(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.type == "string"
    ) {
      const data = await foodPlanService.dailyCalorieCalculator(
        req.query.username,
        req.query.type,
        "28 Aug 2021"
      );
      res.send(data);
    }
  }

  async getUserDailyCalorie(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      const data = await userService.getDailyCalorie(req.query.username);
      res.send({ dailyCalorie: data[0].dailyCalorie });
    }
  }
}

export const foodPlanController = new FoodPlanController();
