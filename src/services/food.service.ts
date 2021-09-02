import { CallbackError } from "mongoose";
import { FoodDetails } from "../models";

class FoodService {
  addFood(
    itemName: string,
    quantity: number,
    unit: string,
    type: string[],
    calorie: number,
    combo: string[],
    kind: string
  ) {
    const data = {
      itemName: itemName,
      quantity: quantity,
      unit: unit,
      type: type,
      calorie: calorie,
      combo: combo,
      kind: kind,
    };
    return FoodDetails.insertMany([data]);
  }

  getFood(itemName: string) {
    return FoodDetails.findOne({ itemName: itemName });
  }

  getAllFood() {
    return FoodDetails.find({});
  }

  getAllComboFood() {
    return FoodDetails.find({ kind: "side" }, { itemName: 1, _id: 0 });
  }

  searchFood(food: string) {
    var regex = new RegExp(food, "i");
    return FoodDetails.find({ itemName: regex });
  }

  getMainFood(calorie: number, type: string) {
    return FoodDetails.find({
      type: { $in: [type] },
      kind: "main",
      calorie: { $lte: calorie },
    });
  }

  getComboFood(combos: string[], calorie: number, type: string) {
    return FoodDetails.find({
      kind: "side",
      type: { $in: [type] },
      itemName: { $in: combos },
      calorie: { $lte: calorie },
    });
  }

  getPartFood(calorie: number, type: string) {
    return FoodDetails.find({
      kind: "part",
      type: { $in: [type] },
      calorie: { $lte: calorie },
    });
  }

  deleteFood(itemName: string) {
    return FoodDetails.deleteOne(
      { itemName: itemName },
      (err: CallbackError) => {
        console.log(err);
      }
    );
  }

  updateFood(
    id: string,
    itemName: string,
    quantity: number,
    unit: string,
    type: string[],
    calorie: number,
    combo: string[],
    kind: string
  ) {
    const filter = { _id: id };
    const updateData = {
      itemName: itemName,
      quantity: quantity,
      unit: unit,
      type: type,
      calorie: calorie,
      combo: combo,
      kind: kind,
    };
    return FoodDetails.updateOne(
      filter,
      { $set: updateData },
      { new: true },
      (err, res) => {
        console.log(`Food Updation : ${res}`);
      }
    );
  }
}

export const foodService = new FoodService();
