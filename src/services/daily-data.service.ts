import { dailyDetails } from "../models";
import { foodPlanService } from "./food-plan.service";
import { foodService } from "./food.service";

class DailyDataService {
  async createFoodPlan(username: string, type: string) {
    try {
      const date = Date.now();
      const today = new Date(date).toUTCString().split(" ");
      const finalDate = today[1] + " " + today[2] + " " + today[3];
      const checkDocs = await this.checkUserExists(username, finalDate, type);

      if (typeof checkDocs == "number" && checkDocs > 0)
        return "Created Already";
      else {
        let balance = 0;
        const foodData = await foodPlanService.dailyCalorieCalculator(
          username,
          type,
          finalDate
        );
        if (foodData.length == 4 && !!foodData[3].balance) {
          balance = foodData[3].balance;
          foodData.pop();
        } else {
          if (!!foodData[1].balance) {
            balance = foodData[1].balance;
            foodData.pop();
          }
        }
        const calorie = foodPlanService.getCalorie();
        const data = {
          username: username,
          date: finalDate,
          type: type,
          allottedFood: foodData,
          calorieIntake: 0,
          allottedCalorie: calorie,
        };

        const result = await dailyDetails.insertMany([data]);

        const setBalance = await dailyDataService.setBalance(
          balance,
          type,
          username,
          finalDate
        );

        return "Successfully created user food plan";
      }
    } catch (err) {
      throw err;
    }
  }

  checkUserExists(username: string, date: string, type: string) {
    return new Promise((res, rej) => {
      dailyDetails.countDocuments(
        { username: username, date: date, type: type },
        (err, result) => {
          if (err) {
            rej(err);
          } else {
            res(result);
          }
        }
      );
    });
  }

  async updateIntake(
    username: string,
    date: string,
    food: string,
    quantity: number,
    type: string,
    unit: string
  ) {
    try {
      const currentCalorie = await this.getCurrenIntake(username, date, type);
      const foodCalorie = await foodService.getFood(food);
      const intake = { itemName: food, quantity: quantity, unit: unit };
      const calorie =
        currentCalorie[0].calorieIntake +
        (foodCalorie.calorie / foodCalorie.quantity) * quantity;

      const result = await dailyDetails.aggregate([
        {
          $match: {
            username: username,
            date: date,
            type: type,
            "intakeFood.itemName": food,
          },
        },
      ]);

      if (result.length != 0) {
        return dailyDetails.updateOne(
          {
            username: username,
            date: date,
            type: type,
            "intakeFood.itemName": food,
          },
          {
            $inc: { "intakeFood.$.quantity": quantity },
            $set: { calorieIntake: calorie },
          }
        );
      } else {
        return dailyDetails.updateOne(
          {
            $and: [{ username: username }, { date: date }, { type: type }],
          },
          { $set: { calorieIntake: calorie }, $push: { intakeFood: intake } }
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async removeIntake(
    username: string,
    type: string,
    date: string,
    itemName: string,
    quantity: number
  ) {
    const currentCalorie = await this.getCurrenIntake(username, date, type);
    const foodCalorie = await foodService.getFood(itemName);
    const calorie =
      currentCalorie[0].calorieIntake -
      (foodCalorie.calorie / foodCalorie.quantity) * quantity;
    return dailyDetails.updateOne(
      {
        $and: [{ username: username }, { date: date }, { type: type }],
      },
      {
        $pull: {
          intakeFood: { itemName: itemName },
        },
        $set: { calorieIntake: calorie },
      },
      {},
      (err) => {
        if (err) throw "Unable to remove intake";
      }
    );
  }

  getIntakeFood(username: string, type: string, date: string) {
    return dailyDetails.find(
      { username: username, type: type, date: date },
      { intakeFood: 1, _id: 0 },
      {},
      (err) => {
        if (err) throw "Cannot find intake-food";
      }
    );
  }

  getCurrenIntake(username: string, date: string, type: string) {
    return dailyDetails.find(
      { username: username, date: date, type: type },
      { calorieIntake: 1, _id: 0 },
      {},
      (err) => {
        if (err) throw "Cannot find food details.";
      }
    );
  }

  getFood(username: string, date: string, type: string) {
    return dailyDetails.find(
      { username: username, date: date, type: type },
      { allottedFood: 1, _id: 0, allottedCalorie: 1, calorieIntake: 1 },
      {},
      (err) => {
        if (err) throw "Cannot find food.";
      }
    );
  }

  getBalance(username: string, date: string, type: string) {
    return dailyDetails.find(
      { username: username, date: date, type: type },
      { balance: 1, _id: 0 },
      {},
      (err) => {
        if (err) throw "Error in getting balance calorie.";
      }
    );
  }

  setBalance(calorie: number, type: string, username: string, date: string) {
    return dailyDetails.updateOne(
      { type: type, username: username, date: date },
      { balance: calorie }
    );
  }

  getDailyData(username: string, date: string) {
    return dailyDetails.find(
      { username: username, date: date },
      { allottedCalorie: 1, calorieIntake: 1, _id: 0, type: 1 },
      {},
      (err) => {
        if (err) throw "Cannot get the daily data.";
      }
    );
  }
}

export const dailyDataService = new DailyDataService();
