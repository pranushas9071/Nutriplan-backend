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
        console.log(data);
        res.send(`Successfully registered!!`);
      } catch (err) {
        res.send(`Error : user already exists!!`);
      }
    }
  }

  async getAllUser(req: Request, res: Response) {
    const data = await userService.getAllUser();
    res.send(data);
  }

  async searchUser(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      const data = await userService.searchUser(req.query.username);
      res.send(data);
    }
  }

  async deleteUser(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      const data = await userService.deleteUser(req.query.username);
      res.send("Deleted Successfully");
    }
  }

  async checkUser(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.query.password == "string"
    ) {
      try {
        const data = await userValidationService.loginCheck(
          req.query.username,
          req.query.password
        );
        res.send(data);
      } catch (err) {
        res.send(err);
      }
    }
  }

  async searchUsername(req: Request, res: Response) {
    if (typeof req.body.username == "string") {
      const data = await userService.searchUsername(req.body.username);
      if (typeof data == "number" && data > 0)
        res.send("username already exists");
      else res.send(`username doesn't exist`);
    }
  }

  async searchEmail(req: Request, res: Response) {
    if (typeof req.body.email == "string") {
      const data = await userService.searchEmail(req.body.email);
      if (typeof data == "number" && data > 0) res.send("email already exists");
      else res.send(`email doesn't exist`);
    }
  }

  async updateUserDetails(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
    const data = await userGoalService.metabolicIndex(
      req.query.username,
      req.body.gender,
      req.body.age,
      req.body.height,
      req.body.weight,
      req.body.activityState
    );
    res.send("Successfully updated");
    }
  }

  async getUserDetails(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      const data = await userService.checkUser(req.query.username);
      console.log(data);
      res.send(data);
    }
  }

  async updateUserRole(req: Request, res: Response) {
    if (
      typeof req.query.username == "string" &&
      typeof req.body.role == "string"
    ) {
      const result = await userService.updateUserRole(
        req.query.username,
        req.body.role
      );
      res.send("successfully updated role");
    }
  }

  async updateGoal(req: Request, res: Response) {
    if (
      typeof req.body.username == "string" &&
      typeof req.body.goalPerWeek == "number"
    ) {
      const weightData = await userService.getUserGoal(req.body.username);
      const data = await userGoalService.dailyCalorieCalculator(
        req.body.username,
        req.body.goalPerWeek,
        weightData[0].status,
        weightData[0].currentCalorie
      );
      console.log(`data after update : ${data}`);
      res.send("Successfully updated goal");
    }
  }

  async getAptWeight(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      const data = await userService.getAptWeight(req.query.username);
      res.send({
        AptWeight: data[0].aptWeight,
        Weight: data[0].weight,
        BMI: data[0].BMI,
        status: data[0].status,
      });
    }
  }

  async getRole(req: Request, res: Response) {
    if (typeof req.query.username == "string") {
      const data = await userService.getRole(req.query.username);
      res.send(data[0].role);
    }
  }
}

export const userController = new UserController();
