import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    itemName: { type: Schema.Types.String, index: true },
    quantity: { type: Schema.Types.Number },
    unit: { type: Schema.Types.String },
    type: { type: [Schema.Types.String] },
    calorie: { type: Schema.Types.Number },
    combo: { type: [Schema.Types.String] },
    kind: { type: Schema.Types.String },
  },
  { strict: true }
);

foodSchema.index({ itemName: 1 }, { unique: true });

export const FoodDetails = mongoose.model(
  "FoodDetail",
  foodSchema,
  "FoodDetail"
);
