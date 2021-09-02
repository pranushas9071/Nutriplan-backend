import { Request, Response } from "express";
import { dailyDataService } from "../services";

class DailyDataController {
  async createFoodPlan(req: Request, res: Response) {
    if (
      typeof req.body.username == "string" &&
      typeof req.body.type == "string"
    ) {
      const data = await dailyDataService.createFoodPlan(
        req.body.username,
        req.body.type
      );
      res.send(data);
    } else {
      res.send("Invalid data");
    }
  }

  async updateIntake(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.body.date == "string" &&
      typeof req.body.food == "string" &&
      typeof req.body.quantity == "number" &&
      typeof req.body.type == "string" &&
      typeof req.body.unit == "string"
    ) {
      const data = await dailyDataService.updateIntake(
        req.query.username,
        req.body.date,
        req.body.food,
        req.body.quantity,
        req.body.type,
        req.body.unit
      );
      console.log(data);
      res.send(`Successfully updated ${req.body.type}`);
    } else {
      res.send("Invalid input");
    }
  }

  async removeIntake(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.body.type == "string" &&
      typeof req.body.date == "string" &&
      typeof req.body.itemName == "string" &&
      typeof req.body.quantity == "number"
    ) {
      const data = await dailyDataService.removeIntake(
        req.query.username,
        req.body.type,
        req.body.date,
        req.body.itemName,
        req.body.quantity
      );
      res.send("successfully removed");
    } else {
      res.send("Invalid input");
    }
  }

  async getIntakeFood(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.type == "string" &&
      typeof req.query.date == "string"
    ) {
      const data = await dailyDataService.getIntakeFood(
        req.query.username,
        req.query.type,
        req.query.date
      );
      res.send(data);
    }
  }

  async getFood(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.date == "string" &&
      typeof req.query.type == "string"
    ) {
      const data = await dailyDataService.getFood(
        req.query.username,
        req.query.date,
        req.query.type
      );
      res.send(data[0]);
    }
  }

  async getCurrentIntake(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.date == "string" &&
      typeof req.query.type == "string"
    ) {
      const data = await dailyDataService.getCurrenIntake(
        req.query.username,
        req.query.date,
        req.query.type
      );
      res.send(data);
    }
  }
}

export const dailyDataController = new DailyDataController();
