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
    const data = await userService.getDailyCalorie(username);
    this.dailyCalorie = data[0].dailyCalorie;
    return this.getPlan(username, type, finalDate);
  }

  async getPlan(username: string, type: string, finalDate: string) {
    let items: string[] = [];
    let quantity: number[] = [];
    let lastBalance: number = 0;
    let foodCalorie: number = 0;

    if (type != "breakfast") {
      lastBalance = await dailyDataService.getBalance(
        username,
        finalDate,
        type
      );
    }

    if (lastBalance != 0) {
      if (type == "lunch") {
        const leftOver = Math.round(this.dailyCalorie / 3) - lastBalance;
        foodCalorie = (Math.round(this.dailyCalorie / 3) * 2 + leftOver) / 2;
      } else {
        foodCalorie = Math.round(this.dailyCalorie / 3) + lastBalance;
      }
    } else {
      foodCalorie = Math.round(this.dailyCalorie / 3);
    }

    // breakFastCalorie = Math.round(this.dailyCalorie / 3);

    const mainFoodCalorie = Math.round(foodCalorie / 2);
    const comboFoodCalorie = Math.round(foodCalorie / 4);
    const partFoodCalorie = Math.round(foodCalorie / 4);
    // console.log(mainFoodCalorie+" "+comboFoodCalorie+" "+partFoodCalorie);

    let balance = 0;

    const mainFoods = await foodService.getMainFood(mainFoodCalorie, type);
    console.log("Main food : ", mainFoods);

    const finalMain = this.getRandomInt(0, mainFoods.length);

    items.push(mainFoods[finalMain].itemName);
    console.log("Final Main food : ", mainFoods[finalMain]);

    const comboFoods = await foodService.getComboFood(
      mainFoods[finalMain].combo,
      comboFoodCalorie,
      type
    );
    console.log("combo food : ", comboFoods);

    const finalCombo = this.getRandomInt(0, comboFoods.length);
    if (comboFoods.length == 0) {
      items.push(" ");
    } else {
      items.push(comboFoods[finalCombo].itemName);
    }
    // console.log("Final combo food : ", comboFoods[finalCombo]);

    const partFoods = await foodService.getPartFood(partFoodCalorie, type);
    console.log("part food : ", partFoods);

    const finalPart = this.getRandomInt(0, partFoods.length);
    items.push(partFoods[finalPart].itemName);
    console.log("Final part food : ", partFoods[finalPart]);

    const mainCalorie = mainFoods[finalMain].calorie;
    const comboCalorie =
      comboFoods.length !== 0 ? comboFoods[finalCombo].calorie : 0;
    const partCalorie = partFoods[finalPart].calorie;

    let mainFoodQuantity = Math.floor(mainFoodCalorie / mainCalorie);
    quantity.push(mainFoodQuantity);
    balance = mainFoodCalorie % mainCalorie;

    const qty =
      isNaN(comboFoodCalorie / comboCalorie) ||
      !isFinite(comboFoodCalorie / comboCalorie)
        ? 0
        : comboFoodCalorie / comboCalorie;
    console.log("qty : ", qty);
    let comboFoodQuantity = Math.floor(qty);

    quantity.push(comboFoodQuantity);
    balance +=
      isNaN(comboFoodCalorie % comboCalorie) ||
      !isFinite(comboFoodCalorie % comboCalorie)
        ? 0
        : comboFoodCalorie % comboCalorie;

    let partFoodQuantity = Math.floor(partFoodCalorie / partCalorie);
    quantity.push(partFoodQuantity);
    balance += partFoodCalorie % partCalorie;

    console.log("combo calorie : ", comboCalorie);
    console.log("combo quantity : ", comboFoodQuantity);

    this.totalCalorie =
      mainCalorie * mainFoodQuantity +
      comboCalorie * comboFoodQuantity +
      partCalorie * partFoodQuantity;

    // console.log(mainCalorie+" "+comboCalorie+" "+partCalorie);
    const result = [
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
        unit: partFoods[finalPart].unit,
      },
    ];

    return result;
    // return { food: breakfastItems, quantity: breakfastQuantity };
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
