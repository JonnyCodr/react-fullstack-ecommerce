const express = require("express");

const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken");


const router = express.Router();
const {
  NewCategory,
  GetCategories,
  DeleteCategory,
  SaveAttr
} = require("../controllers/categoryController");

router.get("/", GetCategories);

//Admin routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.post("/", NewCategory);
router.delete("/:category", DeleteCategory);
router.post("/attr", SaveAttr);

module.exports = router;
