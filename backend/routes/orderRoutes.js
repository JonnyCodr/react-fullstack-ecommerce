const express = require('express')
const router = express.Router()
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')
const {
  GetUserOrders,
  GetOrder,
  CreateOrder,
  UpdateOrderToPaid,
  UpdateOrderToDelivered,
  GetOrders,
  GetOrderForAnalysis
} = require("../controllers/orderController")

// user routes
router.use(verifyIsLoggedIn)
router.get("/", GetUserOrders)
router.get("/user/:id", GetOrder);
router.post("/", CreateOrder);
router.put("/paid/:id", UpdateOrderToPaid);

// admin routes
router.use(verifyIsAdmin)
router.put("/delivered/:id", UpdateOrderToDelivered);
router.get("/admin", GetOrders);
router.get("/analysis/:date", GetOrderForAnalysis);

module.exports = router
