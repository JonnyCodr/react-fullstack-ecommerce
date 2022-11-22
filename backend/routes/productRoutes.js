const express = require("express");
const router = express.Router();
const {
  GetProducts,
  GetProductById,
  GetBestSellers,
  AdminGetProducts,
  AdminDeleteProduct
} = require("../controllers/productController");

router.get('/category/:categoryName/search/:searchQuery', GetProducts);
router.get("/category/:categoryName", GetProducts);
router.get("/search/:searchQuery", GetProducts);
router.get("/", GetProducts);
router.get("/bestsellers", GetBestSellers);
router.get("/:id", GetProductById);

router.get("/admin", AdminGetProducts);
router.get("/admin/:id", AdminDeleteProduct);

module.exports = router;
