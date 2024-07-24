const Account = require("../modal/account");
const User = require("../modal/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  let errors;

  // incorrect email
  if (err.message === "incorrect email") {
    errors = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
  }

  // validation errors

  return errors;
};
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

let getAllAccounts = async (req, res, next) => {
  try {
    const acc = await Account.find({});
    res.status(201).json(acc);
  } catch (err) {
    res.status(400).json({ err });
  }
};

let register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const acc = await Account.create({ email, password });

    await User.create({ name, email });

    const token = createToken(acc._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ acc: acc._id });
  } catch (err) {
    res.status(400).json({ err });
  }
};

let login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const acc = await Account.login(email, password);
    const token = createToken(acc._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ acc: acc._id, token: "jwt=" + token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
let logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
};
let checkLogin = async (req, res) => {
  const jwtCookie = req.headers.authorization
    ? req.headers.authorization
        .split("; ")
        .find((authorization) => authorization.startsWith("jwt="))
    : null;

  if (jwtCookie) {
    const token = jwtCookie.split("=")[1];

    try {
      const decodedToken = await new Promise((resolve, reject) => {
        jwt.verify(token, "net ninja secret", (err, decodedToken) => {
          if (err) {
            reject(err);
          } else {
            resolve(decodedToken);
          }
        });
      });

      return decodedToken.id;
    } catch (err) {
      console.log("Token không hợp lệ:", err.message);
      res.send("Token không hợp lệ.");
      return null;
    }
  } else {
    console.log("Cookie không tồn tại.");
    res.send("Cookie không tồn tại.");
    return null;
  }
};

let deleteAcc = async (req, res) => {
  const { id } = req.params;
  const account = await Account.findById(id);
  const userD = await User.findOne({ email: account.email });
  const acc = await Account.findByIdAndDelete(id);
  const del = await User.findByIdAndDelete(userD._id);
  if (!acc && !del) {
    return res.status(404).json({ message: "loi" });
  }
  res.status(200).json({ message: "done" });
};

let getLog = async (req, res) => {
  const userId = await checkLogin(req, res);
  if (!userId) {
    return res.status(401).json({ message: "Login required!" });
  }
  try {
    const user = await Account.findById(userId);
    const userD = await User.findOne({ email: user.email });
    return res.status(200).json({ userD });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

let changePass = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (newPassword.length < 6) {
    return res
      .status(401)
      .json({ message: "Minimum password length is 6 characters" });
  }

  const userId = await checkLogin(req, res);
  if (!userId) {
    return res.status(401).json({ message: "Login required!" });
  }

  try {
    const user = await Account.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(oldPassword, user.password, function (err, result) {
      if (result) {
        user.password = newPassword;
        user.save();
        return res
          .status(200)
          .json({ message: "Password changed successfully" });
      } else {
        return res.status(401).json({ message: "password does not match" });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllAccounts,
  register,
  login,
  deleteAcc,
  checkLogin,
  changePass,
  logout,
  getLog,
};
