const Category = require('../models/categoryModel');

const GetProducts = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 'asc' }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = GetProducts;
