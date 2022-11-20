const express = require("express");
const router = express.Router();
const GetOrders = require("../controllers/ordersController");

router.get("/", GetOrders);

module.exports = router;
