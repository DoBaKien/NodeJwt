const Account = require("../modal/account");
const User = require("../modal/user");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

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
  const { email, password } = req.body;

  try {
    const acc = await Account.create({ email, password });
    const atIndex = email.indexOf("@");

    if (atIndex !== -1) {
      // Lấy phần tử của chuỗi trước ký tự '@'
      const name = email.slice(0, atIndex);
      await User.create({ name, email });
    } else {
      console.log("Không tìm thấy ký tự @ trong địa chỉ email.");
    }

    const token = createToken(acc._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ acc: acc._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
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

let checkLogin = async (req, res) => {
  const jwtCookie = req.headers.cookie
    ? req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt="))
    : null;
  if (jwtCookie) {
    // Tách giá trị của cookie
    const token = jwtCookie.split("=")[1];

    // Giải mã token
    jwt.verify(token, "net ninja secret", (err, decodedToken) => {
      if (err) {
        console.log("Token không hợp lệ:", err.message);
        res.send("Token không hợp lệ.");
      } else {
        // Token hợp lệ, xử lý nó ở đây
        console.log("Dữ liệu trong token:", decodedToken);
        res.send("Dữ liệu trong token: " + JSON.stringify(decodedToken));
      }
    });
  } else {
    // Cookie không tồn tại
    console.log("Cookie không tồn tại.");
    res.send("Cookie không tồn tại.");
  }
};

let deleteAcc = async (req, res, next) => {};

module.exports = {
  getAllAccounts,
  register,
  login,
  deleteAcc,
  checkLogin,
};
