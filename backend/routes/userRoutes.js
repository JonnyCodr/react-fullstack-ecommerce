const express = require("express");
const router = express.Router();
const GetUsers = require("../controllers/usersController");

router.get("/", GetUsers);

module.exports = router;
