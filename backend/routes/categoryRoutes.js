const express = require("express");
const router = express.Router();
const GetCategories = require("../controllers/categoryController");

router.get("/", GetCategories);

module.exports = router;
