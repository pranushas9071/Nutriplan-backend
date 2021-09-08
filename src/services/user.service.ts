import { CallbackError } from "mongoose";
import { UserDetails } from "../models";
import { jwtService } from "./jwt.service";
import bcrypt from "bcrypt";

class UserService {
  async addUser(username: string, email: string, password: string) {
    const salt = 10;
    const encodedPassword = bcrypt.hashSync(password, salt);
    const data = {
      username: username,
      email: email,
      password: encodedPassword,
      role: "user",
    };
    await UserDetails.insertMany([data]);
    const result = jwtService.createToken(username);
    return result;
  }

  checkUser(username: string) {
    return UserDetails.findOne({ username: username });
  }

  getAllUser() {
    return UserDetails.find({});
  }

  searchUser(user: string) {
    var regex = new RegExp(user, "i");
    return UserDetails.find({ username: regex });
  }

  deleteUser(username: string) {
    return UserDetails.deleteOne(
      { username: username },
      (err: CallbackError) => {
        console.log(err);
      }
    );
  }

  getAptWeight(username: string) {
    return UserDetails.aggregate([
      { $match: { username: username } },
      { $project: { aptWeight: 1, _id: 0, BMI: 1, weight: 1, status: 1 } },
    ]);
  }

  getRole(username: string) {
    return UserDetails.aggregate([
      { $match: { username: username } },
      { $project: { role: 1, _id: 0 } },
    ]);
  }

  getUserGoal(username: string) {
    return UserDetails.aggregate([
      { $match: { username: username } },
      {
        $project: {
          aptWeight: 1,
          _id: 0,
          weight: 1,
          status: 1,
          goalPerWeek: 1,
          currentCalorie: 1,
        },
      },
    ]);
  }

  getDailyCalorie(username: string) {
    return UserDetails.aggregate([
      { $match: { username: username } },
      {
        $project: {
          _id: 0,
          dailyCalorie: 1,
        },
      },
    ]);
  }

  searchEmail(email: string) {
    return new Promise((res, rej) => {
      UserDetails.countDocuments({ email: email }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }

  searchUsername(username: string) {
    return new Promise((res, rej) => {
      UserDetails.countDocuments({ username: username }, (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }

  updateGoal(username: string, goalPerWeek: number, dailyCalorie: number) {
    const filter = { username: username };
    const updateData = { goalPerWeek: goalPerWeek, dailyCalorie: dailyCalorie };
    return UserDetails.updateOne(
      filter,
      { $set: updateData },
      { new: true },
      (err, res) => {}
    );
  }

  updateUserBasicDetails(
    username: string,
    gender: string,
    age: number,
    height: number,
    weight: number,
    activityState: string,
    BMI: number,
    BMR: number,
    aptWeight: number,
    currentCalorie: number,
    status: string,
    goalPerWeek: number
  ) {
    const filter = { username: username };
    const update = {
      age: age,
      gender: gender,
      height: height,
      weight: weight,
      activityState: activityState,
      BMI: BMI,
      BMR: BMR,
      aptWeight: aptWeight,
      currentCalorie: currentCalorie,
      status: status,
      goalPerWeek: goalPerWeek,
    };
    return UserDetails.updateOne(
      filter,
      { $set: update },
      { new: true },
      (err, res) => {}
    );
  }

  updateUserRole(username: string, role: string) {
    return UserDetails.updateOne(
      { username: username },
      { $set: { role: role } }
    );
  }
}

export const userService = new UserService();
