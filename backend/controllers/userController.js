const User = require("../models/userModel");

const GetUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = GetUsers;
