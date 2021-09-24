import { foodService } from "./food.service";
import { userService, dailyDataService } from "./index";

class FoodPlanService {
  dailyCalorie: number = 0;
  totalCalorie: number = 0;

  async dailyCalorieCalculator(
    username: string,
    type: string,
    finalDate: string
  ) {
    try {
      const data = await userService.getDailyCalorie(username);
      this.dailyCalorie = data[0].dailyCalorie;
      return this.getPlan(username, type, finalDate);
    } catch (err) {
      throw err;
    }
  }

  async getPlan(username: string, type: string, finalDate: string) {
    let items: string[] = [];
    let quantity: number[] = [];
    let lastBalance: number = 0;
    let foodCalorie: number = 0;
    let result;
    try {
      if (type !== "breakfast") {
        if (type === "lunch")
          result = await dailyDataService.getBalance(
            username,
            finalDate,
            "breakfast"
          );
        else
          result = await dailyDataService.getBalance(
            username,
            finalDate,
            "lunch"
          );
        lastBalance = result[0].balance;
      }

      if (lastBalance != 0) {
        foodCalorie = Math.round(this.dailyCalorie / 3) + lastBalance;
      } else {
        foodCalorie = Math.round(this.dailyCalorie / 3);
      }

      const mainFoodCalorie = Math.round(foodCalorie / 2);
      const comboFoodCalorie = Math.round(foodCalorie / 4);
      const partFoodCalorie = Math.round(foodCalorie / 4);

      let balance = 0;

      const mainFoods = await foodService.getMainFood(mainFoodCalorie, type);

      if (mainFoods.length !== 0) {
        const finalMain = this.getRandomInt(0, mainFoods.length);

        items.push(mainFoods[finalMain].itemName);

        const comboFoods = await foodService.getComboFood(
          mainFoods[finalMain].combo,
          comboFoodCalorie,
          type
        );

        const finalCombo = this.getRandomInt(0, comboFoods.length);
        if (comboFoods.length == 0) {
          items.push(" ");
        } else {
          items.push(comboFoods[finalCombo].itemName);
        }

        const partFoods = await foodService.getPartFood(partFoodCalorie, type);
        const finalPart = this.getRandomInt(0, partFoods.length);

        if (partFoods.length == 0) {
          items.push(" ");
        } else {
          items.push(partFoods[finalPart].itemName);
        }

        const mainCalorie = mainFoods[finalMain].calorie;
        const comboCalorie =
          comboFoods.length !== 0 ? comboFoods[finalCombo].calorie : 0;
        const partCalorie =
          partFoods.length !== 0 ? partFoods[finalPart].calorie : 0;

        let mainFoodQuantity = Math.floor(mainFoodCalorie / mainCalorie);
        quantity.push(mainFoodQuantity);
        balance = mainFoodCalorie % mainCalorie;

        const qty =
          isNaN(comboFoodCalorie / comboCalorie) ||
          !isFinite(comboFoodCalorie / comboCalorie)
            ? 0
            : comboFoodCalorie / comboCalorie;
        let comboFoodQuantity = Math.floor(qty);

        quantity.push(comboFoodQuantity);
        balance +=
          isNaN(comboFoodCalorie % comboCalorie) ||
          !isFinite(comboFoodCalorie % comboCalorie)
            ? comboFoodCalorie
            : comboFoodCalorie % comboCalorie;

        const partqty =
          isNaN(partFoodCalorie / partCalorie) ||
          !isFinite(partFoodCalorie / partCalorie)
            ? 0
            : partFoodCalorie / partCalorie;
        let partFoodQuantity = Math.floor(partqty);

        quantity.push(partFoodQuantity);
        balance +=
          isNaN(partFoodCalorie % partCalorie) ||
          !isFinite(partFoodCalorie % partCalorie)
            ? partFoodCalorie
            : partFoodCalorie % partCalorie;

        this.totalCalorie =
          mainCalorie * mainFoodQuantity +
          comboCalorie * comboFoodQuantity +
          partCalorie * partFoodQuantity;

        result = [
          {
            itemName: items[0],
            quantity: quantity[0],
            unit: mainFoods[finalMain].unit,
          },
          {
            itemName: items[1],
            quantity: quantity[1],
            unit: comboFoods.length == 0 ? " " : comboFoods[finalCombo].unit,
          },
          {
            itemName: items[2],
            quantity: quantity[2],
            unit: partFoods.length == 0 ? " " : partFoods[finalPart].unit,
          },
          {
            balance: balance,
          },
        ];
      } else {
        const superFoods = await foodService.getSuperFood(foodCalorie);

        const finalSuper = this.getRandomInt(0, superFoods.length);

        const superFoodQuantity = Math.floor(
          foodCalorie / superFoods[finalSuper].calorie
        );

        this.totalCalorie = superFoods[finalSuper].calorie * superFoodQuantity;
        balance = foodCalorie % superFoods[finalSuper].calorie;

        result = [
          {
            itemName: superFoods[finalSuper].itemName,
            quantity: superFoodQuantity,
            unit: superFoods[finalSuper].unit,
          },
          {
            balance: balance,
          },
        ];
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  getCalorie() {
    return this.totalCalorie;
  }
}

export const foodPlanService = new FoodPlanService();
