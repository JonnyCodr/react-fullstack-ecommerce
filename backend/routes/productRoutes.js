const express = require("express");
const router = express.Router();
const {
  GetProducts,
  GetProductById,
  GetBestSellers,
} = require("../controllers/productController");

router.get('/category/:categoryName/search/:searchQuery', GetProducts);
router.get("/category/:categoryName", GetProducts);
router.get("/search/:searchQuery", GetProducts);
router.get("/", GetProducts);
router.get("/bestsellers", GetBestSellers);
router.get("/:id", GetProductById);

module.exports = router;
