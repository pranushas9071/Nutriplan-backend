import { Request, Response } from "express";
import { foodService } from "../services";

class FoodController {
  async addFood(req: Request, res: Response) {
    if (
      typeof req.body.itemName == "string" &&
      typeof req.body.quantity == "number" &&
      typeof req.body.unit == "string" &&
      Array.isArray(req.body.type) &&
      typeof req.body.calorie == "number" &&
      Array.isArray(req.body.combo)
    ) {
      const data = await foodService.addFood(
        req.body.itemName,
        req.body.quantity,
        req.body.unit,
        req.body.type,
        req.body.calorie,
        req.body.combo,
        req.body.kind
      );
      res.send("Successfully added");
    }
  }

  async getAllFood(req: Request, res: Response) {
    try {
      const data = await foodService.getAllFood();
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getAllComboFood(req: Request, res: Response) {
    try {
      const data = await foodService.getAllComboFood();
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getFood(req: Request, res: Response) {
    if (typeof req.query.itemName == "string") {
      try {
        const data = await foodService.getFood(req.query.itemName);
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async searchFood(req: Request, res: Response) {
    if (typeof req.query.itemName == "string") {
      try {
        const data = await foodService.searchFood(req.query.itemName);
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  updateFood(req: Request, res: Response) {
    if (
      typeof req.query.id == "string" &&
      typeof req.body.itemName == "string" &&
      typeof req.body.quantity == "number" &&
      typeof req.body.unit == "string" &&
      Array.isArray(req.body.type) &&
      typeof req.body.calorie == "number" &&
      Array.isArray(req.body.combo)
    ) {
      try {
        const data = foodService.updateFood(
          req.query.id,
          req.body.itemName,
          req.body.quantity,
          req.body.unit,
          req.body.type,
          req.body.calorie,
          req.body.combo,
          req.body.kind
        );
        res.send("Updated successfully");
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.send("invalid inputs");
    }
  }

  deleteFood(req: Request, res: Response) {
    try {
      if (typeof req.query.itemName == "string") {
        const data = foodService.deleteFood(req.query.itemName);
        res.send("Deleted successfully");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export const foodController = new FoodController();
