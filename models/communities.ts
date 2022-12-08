import mongoose from "mongoose";
import { TownUnionOffices } from "../interfaces/enums";

mongoose.Promise = global.Promise;

const communitiesScheme = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    location: {
      longitude: String,
      latittude: String,
    },
    population: Number,
    members: [
      {
        role: {
          type: String,
          enum: Object.values(TownUnionOffices),
          default: TownUnionOffices.MEMBER,
        },
        avatar: {
          type: String,
          default: "/images/avatar/user.png",
        },
        surname: { type: String },
        firstname: { type: String },
        middlename: { type: String },
        email: {
          type: String,
          unique: true,
        },
        mobile: { type: String },
        password: { type: String },
      },
    ],
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

delete mongoose.models.Communities;
const Communities =
  mongoose.models.Communities ||
  mongoose.model("Communities", communitiesScheme);
export default Communities;
