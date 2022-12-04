const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateAuthToken } = require("../utils/generateAuthToken");
const Review = require("../models/ReviewsModel");
const { ObjectId } = require("mongodb");
const Product = require("../models/ProductModel");

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const GetUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("");
    return res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const LoginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await User.findOne({ email });
    if (user && (await comparePassword(password, user.password))) {
      // to do: compare passwords
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
      }

      return res.cookie(
        "access_token",
        generateAuthToken(
          user._id,
          user.name,
          user.lastName,
          user.email,
          user.isAdmin
        ),
        cookieParams
      ).json({
        success: "user logged in",
        userLoggedIn: { _id: user._id, name: user.name, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin, doNotLogout }
      });
    } else {
      return res.status(401).send("wrong credentials")
    }
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const GetUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    return res.send(user);
  } catch(err) {
    next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
const UpdateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    user.name = req.body.name || user.name;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    if (req.body.password !== user.password) {
      user.password = hashPassword(req.body.password);
    }
    await user.save();

    res.json({
      success: "user updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const WriteReview = async (req, res, next) => {
  const session = await Review.startSession();
  try {

    // get comment, rating from request.body:
    const { comment, rating } = req.body;
    // validate request:
    if (!(comment && rating)) {
      return res.status(400).send("All inputs are required");
    }

    // create review id manually because it is needed also for saving in Product collection
    const ObjectId = require("mongodb").ObjectId;
    let reviewId = ObjectId();

    session.startTransaction()
    await Review.create([
      {
        _id: reviewId,
        comment: comment,
        rating: Number(rating),
        user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
      }
    ], session, session)

    const product = await Product.findById(req.params.productId).populate("reviews").session(session);

    const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).send("product already reviewed");
    }

    let prc = [...product.reviews];
    prc.push({ rating: rating });
    product.reviews.push(reviewId);
    if (product.reviews.length === 1) {
      product.rating = Number(rating);
      product.reviewsNumber = 1;
    } else {
      product.reviewsNumber = product.reviews.length;
      product.rating = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
    }
    await product.save();

    await session.commitTransaction();
    await session.endSession();
    res.send('review created')
  } catch (err) {
    await session.abortTransaction()
    next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 * @constructor
 */
const AdminGetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name lastName email isAdmin')
      .orFail();
    return res.status(200).send(user);
  } catch (err) {
    next(err)
  }
 }

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 * @constructor
 */
 const AdminUpdateUser = async (req, res, next) => {
   try {
     const user = await User.findById(req.params.id).orFail();

     user.name = req.body.name || user.name;
     user.lastName = req.body.lastName || user.lastName;
     user.email = req.body.email || user.email;
     user.isAdmin = req.body.isAdmin || user.isAdmin;

     await user.save();

     res.send("user updated");

   } catch (err) {
     next(err);
   }
 }

/**
 * @description Endpoint for admin to delete a user by their id
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 * @return {Promise<void>}
 * @version 1.0.0
 * @since 1.0.0
 * @Author Michael Menard
 * @repository
 */
 const AdminDeleteUser = async (req, res, next) => {
   try {
     const user = await User.findById(req.params.id).orFail();
     await user.remove();
     res.send("user deleted");
   } catch (err) {
     next(err);
   }
 }

module.exports = {
  GetUsers,
  RegisterUser,
  LoginUser,
  UpdateUserProfile,
  GetUserProfile,
  WriteReview,
  AdminGetUser,
  AdminUpdateUser,
  AdminDeleteUser
};
