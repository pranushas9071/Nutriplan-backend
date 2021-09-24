import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dailyDetailsSchema = new Schema(
  {
    username: { type: Schema.Types.String, index: true },
    date: { type: Schema.Types.String },
    type: { type: Schema.Types.String },
    allottedFood: { type: [Schema.Types.Mixed] },
    calorieIntake: { type: Schema.Types.Number },
    balance: { type: Schema.Types.Number },
    allottedCalorie: { type: Schema.Types.Number },
    intakeFood: { type: [Schema.Types.Mixed] },
  },
  { strict: true }
);

dailyDetailsSchema.index({ username: 1 }, { unique: true });

export const dailyDetails = mongoose.model(
  "DailyDetails",
  dailyDetailsSchema,
  "DailyDetails"
);
