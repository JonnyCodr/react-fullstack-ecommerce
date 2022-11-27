const express = require("express");
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");
const {
  GetUsers,
  RegisterUser,
  LoginUser,
  UpdateUserProfile,
  GetUserProfile,
  WriteReview,
  AdminGetUser,
  AdminUpdateUser,
  AdminDeleteUser,
} = require("../controllers/userController");



router.post("/register", RegisterUser);
router.post("/login", LoginUser);

// User Login routes
router.use(verifyIsLoggedIn);
router.get('/profile/:id', GetUserProfile);
router.put('/profile', UpdateUserProfile);
router.post('/review/:productId', WriteReview);

//Admin Routes
router.use(verifyIsAdmin);
router.get("/", GetUsers);
router.get("/:id", AdminGetUser);
router.put("/:id", AdminUpdateUser);
router.delete("/:id", AdminDeleteUser);

module.exports = router;
