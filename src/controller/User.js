const User = require("../modal/user");

let getAllUser = async (req, res, next) => {
  try {
    const acc = await User.find({});
    res.status(201).json(acc);
  } catch (err) {
    res.status(400).json({ err });
  }
};
let getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const acc = await User.findById(id);
    res.status(201).json({ acc });
  } catch (err) {
    res.status(400).json({ err });
  }
};
let editUser = async (req, res) => {
  const { info } = req.body;
  try {
    const user = await User.findById(info._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(user, info);
    user.save();
    res.status(201).json({ message: "done" });
  } catch (err) {
    res.status(400).json({ err });
  }
};
module.exports = {
  getAllUser,
  getUser,
  editUser,
};
