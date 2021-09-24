import { Request, Response } from "express";
import { foodPlanService, userService } from "../services";

class FoodPlanController {
  async getUserDailyCalorie(req: Request, res: Response) {
    try {
      const data = await userService.getDailyCalorie(req.body.user.username);
      res.send({ dailyCalorie: data[0].dailyCalorie });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export const foodPlanController = new FoodPlanController();
