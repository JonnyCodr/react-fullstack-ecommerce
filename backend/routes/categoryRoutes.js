const express = require("express");
const router = express.Router();
const {
  NewCategory,
  GetCategories,
  DeleteCategory,
  SaveAttr
} = require("../controllers/categoryController");

router.get("/", GetCategories);
router.post("/", NewCategory);
router.delete("/:category", DeleteCategory);
router.post("/attr", SaveAttr);

module.exports = router;
