const express = require("express");
const router = express.Router();
const GetOrders = require("../controllers/orderController");

router.get("/", GetOrders);

module.exports = router;
