const express = require("express");
const router = express.Router();
const { GetUsers, RegisterUser, LoginUser, UpdateUserProfile, GetUserProfile, WriteReview } = require("../controllers/userController");
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");



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

module.exports = router;
