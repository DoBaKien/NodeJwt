import mongoose from "mongoose";
import isEmail from "validator/lib/isemail";
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
      required: [true, "Please enter an email"],
    },

    address: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: new Date("2000-01-01"),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
