import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: Schema.Types.String, index: true },
    email: { type: Schema.Types.String, index: true },
    password: { type: Schema.Types.String },
    role: { type: Schema.Types.String },
    age: { type: Schema.Types.Number },
    gender: { type: Schema.Types.String },
    height: { type: Schema.Types.Number },
    weight: { type: Schema.Types.Number },
    activityState: { type: Schema.Types.String },
    BMI: { type: Schema.Types.Number },
    BMR: { type: Schema.Types.Number },
    aptWeight: { type: Schema.Types.Number },
    currentCalorie: { type: Schema.Types.Number },
    status: { type: Schema.Types.String },
    goalPerWeek: { type: Schema.Types.Number },
    dailyCalorie: { type: Schema.Types.Number },
  },
  { strict: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

export const UserDetails = mongoose.model(
  "UserDetail",
  userSchema,
  "UserDetail"
);
