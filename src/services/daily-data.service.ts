import { dailyDetails } from "../models";
import { foodPlanService } from "./food-plan.service";
import { foodService } from "./food.service";

class DailyDataService {
  async createFoodPlan(username: string, type: string) {
    console.log(username + " " + type);

    const date = Date.now();
    const today = new Date(date).toUTCString().split(" ");
    const finalDate = today[1] + " " + today[2] + " " + today[3];
    // const type = "breakfast";
    const checkDocs = await this.checkUserExists(username, finalDate, type);
    if (typeof checkDocs == "number" && checkDocs > 0) return "Created Already";
    else {
      const foodData = await foodPlanService.dailyCalorieCalculator(
        username,
        type,
        finalDate
      );

      const calorie = foodPlanService.getCalorie();

      console.log("allotted : ",calorie);
      
      const data = {
        username: username,
        date: finalDate,
        type: type,
        allottedFood: foodData,
        calorieIntake: 0,
        allottedCalorie: calorie,
      };

      await dailyDetails.insertMany([data]);
      return "Successfully created user food plan";
      // return foodData;
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
            console.log("count : ", result);
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
    const currentCalorie = await this.getCurrenIntake(username, date, type);
    const foodCalorie = await foodService.getFood(food);
    const intake = { itemName: food, quantity: quantity, unit: unit };
    console.log("add food cal : " + foodCalorie);
    console.log("add current " + currentCalorie[0].calorieIntake);
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
          $inc: { "intakeFood.$.quantity": 1 },
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
    console.log("rem food cal : " + foodCalorie);
    console.log("rem cur cal" + currentCalorie[0].calorieIntake);
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
      }
    );
  }

  getIntakeFood(username: string, type: string, date: string) {
    return dailyDetails.find(
      { username: username, type: type, date: date },
      { intakeFood: 1, _id: 0 }
    );
  }

  getCurrenIntake(username: string, date: string, type: string) {
    return dailyDetails.find(
      { username: username, date: date, type: type },
      { calorieIntake: 1, _id: 0 }
    );
  }

  getFood(username: string, date: string, type: string) {
    return dailyDetails.find(
      { username: username, date: date, type: type },
      { allottedFood: 1, _id: 0, allottedCalorie: 1, calorieIntake: 1 }
    );
  }

  getBalance(username: string, date: string, type: string) {
    return dailyDetails.find(
      { username: username, date: date, type: type },
      { balance: 1, _id: 0 }
    );
  }
}

export const dailyDataService = new DailyDataService();
