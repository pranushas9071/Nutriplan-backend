import { Request, Response } from "express";
import { userGoalService, userService } from "../services";

class AdminController {
  async searchUser(req: Request, res: Response) {
    if (
      req.body.user.role == "admin" &&
      typeof req.query.username == "string"
    ) {
      try {
        const data = await userService.searchUser(req.query.username);
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    if (
      req.body.user.role == "admin" &&
      typeof req.query.username == "string"
    ) {
      try {
        const data = await userService.deleteUser(req.query.username);
        res.send({ message: "Deleted Successfully" });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }

  async updateUserRole(req: Request, res: Response) {
    if (
      req.body.user.role == "admin" &&
      typeof req.body.username == "string" &&
      typeof req.body.role == "string"
    ) {
      try {
        const result = await userService.updateUserRole(
          req.body.username,
          req.body.role
        );
        res.send({ message: "successfully updated role" });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }

  async updateUserDetails(req: Request, res: Response) {
    if (req.body.user.role == "admin" && typeof req.body.username == "string") {
      try {
        const data = await userGoalService.metabolicIndex(
          req.body.username,
          req.body.gender,
          req.body.age,
          req.body.height,
          req.body.weight,
          req.body.activityState
        );
        res.send({ message: "Successfully updated" });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }

  async updateGoal(req: Request, res: Response) {
    if (
      req.body.user.role == "admin" &&
      typeof req.body.username == "string" &&
      typeof req.body.goalPerWeek == "number"
    ) {
      try {
        const weightData = await userService.getUserGoal(req.body.username);
        const data = await userGoalService.dailyCalorieCalculator(
          req.body.username,
          req.body.goalPerWeek,
          weightData[0].status,
          weightData[0].currentCalorie
        );
        res.send({ message: "Successfully updated goal" });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }

  async getAllUser(req: Request, res: Response) {
    if (req.body.user.role == "admin") {
      try {
        const data = await userService.getAllUser();
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }

  async getUserDetails(req: Request, res: Response) {
    if (
      req.body.user.role == "admin" &&
      typeof req.query.username == "string"
    ) {
      try {
        const data = await userService.checkUser(req.query.username);
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(403).send({ message: "Not authorized" });
    }
  }
}

export const adminController = new AdminController();
