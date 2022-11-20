const express = require("express");
const router = express.Router();
const {NewCategory, GetCategories, DeleteCategory} = require("../controllers/categoryController");

router.get("/", GetCategories);
router.post("/", NewCategory);
router.delete("/:category", DeleteCategory);

module.exports = router;
