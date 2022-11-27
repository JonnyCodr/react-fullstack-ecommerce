const User = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
const { generateAuthToken } = require("../utils/generateAuthToken");

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
      return res
        .cookie("access_token", generateAuthToken( user._id, user.name, user.lastName, user.email, user.isAdmin ), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict"
        })
        .status(201)
        .json({ success: true, userCreated: {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
        } });
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
