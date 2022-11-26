const User = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");

const GetUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const RegisterUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    // Todo: replace with Zod
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = hashPassword(password);
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      return res.status(201).json(user);
    }




  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  GetUsers,
  RegisterUser,
};
