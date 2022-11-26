const express = require("express");
const router = express.Router();
const {
  GetProducts,
  GetProductById,
  GetBestSellers,
  AdminGetProducts,
  AdminDeleteProduct,
  AdminCreateProduct,
  AdminUpdateProduct,
  AdminUpload,
  AdminDeleteImage,
} = require("../controllers/productController");

router.get('/category/:categoryName/search/:searchQuery', GetProducts);
router.get("/category/:categoryName", GetProducts);
router.get("/search/:searchQuery", GetProducts);
router.get("/", GetProducts);
router.get("/bestsellers", GetBestSellers);
router.get("/:id", GetProductById);

// Admin routes
router.get("/admin", AdminGetProducts);
router.delete("/admin/:id", AdminDeleteProduct);
router.delete("/admin/:imagePath/:id", AdminDeleteImage);
router.put("/admin/:id", AdminUpdateProduct);
router.post("/admin", AdminCreateProduct);
router.post("/admin/upload", AdminUpload);


module.exports = router;
