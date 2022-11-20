const express = require("express");
const router = express.Router();
const GetUsers = require("../controllers/userController");

router.get("/", GetUsers);

module.exports = router;
