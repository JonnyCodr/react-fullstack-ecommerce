const express = require("express");
const router = express.Router();
const { GetUsers, RegisterUser, LoginUser } = require("../controllers/userController");

router.get("/", GetUsers);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

module.exports = router;
