const express = require("express");
const router = express.Router();
const { GetUsers, RegisterUser } = require("../controllers/userController");

router.get("/", GetUsers);
router.post("/register", RegisterUser);

module.exports = router;
