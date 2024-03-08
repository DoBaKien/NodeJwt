import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isemail";

const Account = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

Account.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

Account.statics.login = async function (email, password) {
  const acc = await this.findOne({ email });
  if (acc) {
    const auth = await bcrypt.compare(password, acc.password);
    if (auth) {
      return acc;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Account", Account);
