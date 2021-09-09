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
    return FoodDetails.findOne({ itemName: itemName }, (err: CallbackError) => {
      if (err) throw `${itemName} does not exists.`;
    });
  }

  getAllFood() {
    return FoodDetails.find({}, (err: CallbackError) => {
      if (err) throw "Unable to get food list.";
    });
  }

  getAllComboFood() {
    return FoodDetails.find(
      { kind: "side" },
      { itemName: 1, _id: 0 },
      {},
      (err) => {
        if (err) throw "Unable to find combo food";
      }
    );
  }

  searchFood(food: string) {
    var regex = new RegExp(food, "i");
    return FoodDetails.find({ itemName: regex }, (err) => {
      if (err) throw "Unable to find food";
    });
  }

  getMainFood(calorie: number, type: string) {
    return FoodDetails.find({
      type: { $in: [type] },
      kind: "main",
      calorie: { $lte: calorie },
    });
  }

  getComboFood(combos: string[], calorie: number, type: string) {
    return FoodDetails.find(
      {
        kind: "side",
        type: { $in: [type] },
        itemName: { $in: combos },
        calorie: { $lte: calorie },
      },
      (err) => {
        if (err) throw "Error in getting combo food.";
      }
    );
  }

  getPartFood(calorie: number, type: string) {
    return FoodDetails.find(
      {
        kind: "part",
        type: { $in: [type] },
        calorie: { $lte: calorie },
      },
      (err) => {
        if (err) throw "Error in getting part food.";
      }
    );
  }

  deleteFood(itemName: string) {
    return FoodDetails.deleteOne(
      { itemName: itemName },
      (err: CallbackError) => {
        if (err) throw "Unable to delete the food";
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
        if (err) throw "Couldn't update food details";
      }
    );
  }
}

export const foodService = new FoodService();
