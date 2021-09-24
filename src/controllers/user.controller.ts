import { Request, Response } from "express";
import {
  userGoalService,
  userService,
  userValidationService,
} from "../services";

class UserController {
  async addUser(req: Request, res: Response) {
    if (
      typeof req.body.username == "string" &&
      typeof req.body.email == "string" &&
      typeof req.body.password == "string"
    ) {
      try {
        const data = await userService.addUser(
          req.body.username,
          req.body.email,
          req.body.password
        );
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async checkUser(req: Request, res: Response) {
    if (
      typeof req.body.username == "string" &&
      typeof req.body.password == "string"
    ) {
      try {
        const data = await userValidationService.loginCheck(
          req.body.username,
          req.body.password
        );
        res.send(data);
      } catch (err) {
        res.send(err);
      }
    }
  }

  async searchUsername(req: Request, res: Response) {
    if (typeof req.body.username == "string") {
      try {
        const data = await userService.searchUsername(req.body.username);
        if (typeof data == "number" && data > 0)
          res.send({ usernameTaken: true });
        else res.send({ usernameTaken: false });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async searchEmail(req: Request, res: Response) {
    if (typeof req.body.email == "string") {
      try {
        const data = await userService.searchEmail(req.body.email);
        if (typeof data == "number" && data > 0) res.send({ emailTaken: true });
        else res.send({ emailTaken: false });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async updateUserDetails(req: Request, res: Response) {
    try {
      const data = await userGoalService.metabolicIndex(
        req.body.user.username,
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
  }

  async getUserDetails(req: Request, res: Response) {
    try {
      const data = await userService.checkUser(req.body.user.username);
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async updateGoal(req: Request, res: Response) {
    if (typeof req.body.goalPerWeek == "number") {
      try {
        const weightData = await userService.getUserGoal(
          req.body.user.username
        );
        const data = await userGoalService.dailyCalorieCalculator(
          req.body.user.username,
          req.body.goalPerWeek,
          weightData[0].status,
          weightData[0].currentCalorie
        );
        res.send({ message: "Successfully updated goal" });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.send("Invalid input");
    }
  }

  async getAptWeight(req: Request, res: Response) {
    try {
      const data = await userService.getAptWeight(req.body.user.username);
      res.send({
        AptWeight: data[0].aptWeight,
        Weight: data[0].weight,
        BMI: data[0].BMI,
        status: data[0].status,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

}

export const userController = new UserController();
