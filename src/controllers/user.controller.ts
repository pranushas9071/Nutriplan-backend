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
        res.json(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const data = await userService.getAllUser();
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async searchUser(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      try {
        const data = await userService.searchUser(req.query.username);
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      try {
        const data = await userService.deleteUser(req.query.username);
        res.json("Deleted Successfully");
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
          res.json("username already exists");
        else res.json(`username doesn't exist`);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async searchEmail(req: Request, res: Response) {
    if (typeof req.body.email == "string") {
      try {
        const data = await userService.searchEmail(req.body.email);
        if (typeof data == "number" && data > 0)
          res.json("email already exists");
        else res.json(`email doesn't exist`);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async updateUserDetails(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      try {
        const data = await userGoalService.metabolicIndex(
          req.query.username,
          req.body.gender,
          req.body.age,
          req.body.height,
          req.body.weight,
          req.body.activityState
        );
        res.json("Successfully updated");
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async getUserDetails(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      try {
        const data = await userService.checkUser(req.query.username);
        res.send(data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async updateUserRole(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.body.role == "string"
    ) {
      try {
        const result = await userService.updateUserRole(
          req.query.username,
          req.body.role
        );
        res.json("successfully updated role");
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  async updateGoal(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.body.goalPerWeek == "number"
    ) {
      try {
        const weightData = await userService.getUserGoal(req.query.username);
        const data = await userGoalService.dailyCalorieCalculator(
          req.query.username,
          req.body.goalPerWeek,
          weightData[0].status,
          weightData[0].currentCalorie
        );
        res.json("Successfully updated goal");
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.send("Invalid input");
    }
  }

  async getAptWeight(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      try {
        const data = await userService.getAptWeight(req.query.username);
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

  async getRole(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      try {
        const data = await userService.getRole(req.query.username);
        res.send(data[0].role);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }
}

export const userController = new UserController();
