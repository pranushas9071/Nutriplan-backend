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
    try {
      await UserDetails.insertMany([data]);
      const result = jwtService.createToken(username, "user");
      return { result: result };
    } catch (err) {
      throw "Error ocurred while inserting data.";
    }
  }

  checkUser(username: string) {
    return UserDetails.findOne({ username: username }, (err: CallbackError) => {
      if (err) throw "Error in finding user.";
    });
  }

  getAllUser() {
    return UserDetails.find({}, (err) => {
      if (err) throw "Unable to fetch user data.";
    }).sort({ username: 1 });
  }

  searchUser(user: string) {
    var regex = new RegExp(user, "i");
    return UserDetails.find({ username: regex }, (err) => {
      if (err) throw "Error occurred while searching.";
    });
  }

  deleteUser(username: string) {
    return UserDetails.deleteOne(
      { username: username },
      (err: CallbackError) => {
        if (err) throw "Unable to delete user.";
      }
    );
  }

  getAptWeight(username: string) {
    return UserDetails.find(
      { username: username },
      { aptWeight: 1, _id: 0, BMI: 1, weight: 1, status: 1 },
      {},
      (err) => {
        if (err) throw "Error in getting user aptWeight.";
      }
    );
  }

  getRole(username: string) {
    return UserDetails.find(
      { username: username },
      { role: 1, _id: 0 },
      {},
      (err) => {
        if (err) throw "Error in getting user role";
      }
    );
  }

  getUserGoal(username: string) {
    return UserDetails.find(
      { username: username },
      {
        aptWeight: 1,
        _id: 0,
        weight: 1,
        status: 1,
        goalPerWeek: 1,
        currentCalorie: 1,
      },
      {},
      (err) => {
        if (err) throw "Error in getting user goal.";
      }
    );
  }

  getDailyCalorie(username: string) {
    return UserDetails.find(
      { username: username },
      {
        _id: 0,
        dailyCalorie: 1,
      },
      {},
      (err) => {
        if (err) throw "Cannot find calorie details.";
      }
    );
  }

  searchEmail(email: string) {
    return UserDetails.countDocuments({ email: email }, (err, result) => {
      if (err) {
        throw "Searching failed.";
      }
    });
  }

  searchUsername(username: string) {
    return UserDetails.countDocuments({ username: username }, (err, result) => {
      if (err) {
        throw "Searching failed.";
      }
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
        if (err) throw "Error in updating user goal.";
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
        if (err) throw "Unable to update user details.";
      }
    );
  }

  updateUserRole(username: string, role: string) {
    return UserDetails.updateOne(
      { username: username },
      { $set: { role: role } },
      {},
      (err) => {
        if (err) throw "Error in updating user role.";
      }
    );
  }
}

export const userService = new UserService();
