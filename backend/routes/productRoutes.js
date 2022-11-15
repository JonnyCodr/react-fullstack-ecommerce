const express = require('express')
const router = express.Router()
const GetProducts = require('../controllers/productController')


router.get('/', GetProducts)

module.exports = router
