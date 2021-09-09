import { Request, Response } from "express";
import { dailyDataService } from "../services";

class DailyDataController {
  async createFoodPlan(req: Request, res: Response) {
    if (
      typeof req.body.username == "string" &&
      typeof req.body.type == "string"
    ) {
      try {
        const data = await dailyDataService.createFoodPlan(
          req.body.username,
          req.body.type
        );
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
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
      try {
        const data = await dailyDataService.updateIntake(
          req.query.username,
          req.body.date,
          req.body.food,
          req.body.quantity,
          req.body.type,
          req.body.unit
        );
        res.send(`Successfully updated ${req.body.type}`);
      } catch (err) {
        res.status(500).send(err);
      }
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
      try {
        const data = await dailyDataService.removeIntake(
          req.query.username,
          req.body.type,
          req.body.date,
          req.body.itemName,
          req.body.quantity
        );
        res.send("successfully removed");
      } catch (err) {
        res.status(500).send(err);
      }
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
      try {
        const data = await dailyDataService.getIntakeFood(
          req.query.username,
          req.query.type,
          req.query.date
        );
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async getFood(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.date == "string" &&
      typeof req.query.type == "string"
    ) {
      try {
        const data = await dailyDataService.getFood(
          req.query.username,
          req.query.date,
          req.query.type
        );
        res.send(data[0]);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async getCurrentIntake(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.date == "string" &&
      typeof req.query.type == "string"
    ) {
      try {
        const data = await dailyDataService.getCurrenIntake(
          req.query.username,
          req.query.date,
          req.query.type
        );
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async getDailyData(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.date == "string"
    ) {
      try {
        const data = await dailyDataService.getDailyData(
          req.query.username,
          req.query.date
        );
        res.status(200).send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.send({ error: "Invalid input" });
    }
  }
}

export const dailyDataController = new DailyDataController();
