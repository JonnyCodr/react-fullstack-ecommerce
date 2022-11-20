const express = require("express");
const router = express.Router();
const {NewCategory, GetCategories} = require("../controllers/categoryController");

router.get("/", GetCategories);
router.post("/", NewCategory);

module.exports = router;
