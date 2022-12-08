import mongoose from "mongoose";
import { AccountRoles } from "../interfaces/enums";

mongoose.Promise = global.Promise;

const accountsScheme = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: Object.values(AccountRoles),
      default: AccountRoles.USER,
    },
    lastname: { type: String },
    firstname: { type: String },
    email: {
      type: String,
      unique: true,
    },
    mobile: { type: String },
    otp: {
      enabled: { type: Boolean, default: true },
      code: String,
    },
    password: { type: String },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

delete mongoose.models.Accounts;
const Accounts =
  mongoose.models.Accounts || mongoose.model("Accounts", accountsScheme);
export default Accounts;
