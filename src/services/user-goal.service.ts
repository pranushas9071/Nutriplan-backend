import { userService } from "./index";

class UserGoalService {
  metabolicIndex(
    username: string,
    gender: string,
    age: number,
    height: number,
    weight: number,
    activityState: string
  ) {
    let aptWeight,
      BMR,
      currentCalorie,
      status,
      goalPerWeek = 0;

    const BMI = parseFloat((weight / Math.pow(height / 100, 2)).toFixed(1));

    if (BMI > 24.9) {
      aptWeight = Math.round(23 * Math.pow(height / 100, 2));
      status = "overweight";
    } else if (BMI < 18.5) {
      aptWeight = Math.round(20 * Math.pow(height / 100, 2));
      status = "underweight";
    } else {
      aptWeight = weight;
      status = "normal";
    }

    if (gender == "male") {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
      currentCalorie = Math.round(this.currentCalorie(BMR, activityState));
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
      currentCalorie = Math.round(this.currentCalorie(BMR, activityState));
    }

    return userService.updateUserBasicDetails(
      username,
      gender,
      age,
      height,
      weight,
      activityState,
      BMI,
      BMR,
      aptWeight,
      currentCalorie,
      status,
      goalPerWeek
    );
  }

  currentCalorie(BMR: number, activityState: string): number {
    if (activityState == "No Activity") return BMR * 1.2;
    else if (activityState == "Lightly active") return BMR * 1.375;
    else if (activityState == "Moderately active") return BMR * 1.55;
    else return BMR * 1.725;
  }

  async dailyCalorieCalculator(
    username: string,
    goalPerWeek: number,
    status: string,
    currentCalorie: number
  ) {
    let dailyCalorie;
    if (status == "overweight") {
      if (goalPerWeek == 0.25) {
        dailyCalorie = currentCalorie - 275;
      } else if (goalPerWeek == 0.5) {
        dailyCalorie = currentCalorie - 550;
      } else if (goalPerWeek == 0.75) {
        dailyCalorie = currentCalorie - 825;
      } else {
        dailyCalorie = currentCalorie - 1100;
      }
    } else if (status == "underweight") {
      if (goalPerWeek == 0.25) {
        dailyCalorie = currentCalorie + 275;
      } else if (goalPerWeek == 0.5) {
        dailyCalorie = currentCalorie + 550;
      } else if (goalPerWeek == 0.75) {
        dailyCalorie = currentCalorie + 825;
      } else {
        dailyCalorie = currentCalorie + 1100;
      }
    } else {
      dailyCalorie = currentCalorie;
    }
    const data = await userService.updateGoal(
      username,
      goalPerWeek,
      dailyCalorie
    );
    return data;
  }
}

export const userGoalService = new UserGoalService();
