import { CallbackError } from "mongoose";
import { UserDetails } from "../models";
// import { dailyDataService } from "./index";

class UserService {
  async addUser(username: string, email: string, password: string) {
    const data = {
      username: username,
      email: email,
      password: password,
      role: "user",
    };
    // const userDailyDetail = await dailyDataService.addUser(username);
    return UserDetails.insertMany([data]);
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
          console.log("count : ", result);
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
          console.log("count : ", result);
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
      (err, res) => {
        // console.log(`Goal Updation : ${res}`);
      }
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
      (err, res) => {
        console.log(res);
      }
    );
    // return `Successfully updated the user details`;
  }

  updateUserRole(username: string, role: string) {
    console.log("username : ",username);
    
    console.log("role : ",role);
    
    return UserDetails.updateOne(
      { username: username },
      { $set: { role: role } }
    );
  }
}

export const userService = new UserService();
