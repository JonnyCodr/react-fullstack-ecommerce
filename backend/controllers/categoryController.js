const Category = require('../models/categoryModel');

const GetCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 'asc' }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const NewCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    if (!category) {
      res.status(400).json({ message: 'Please provide a category' });
    }
    const foundCategory = await Category.findOne({name: category})
    if (foundCategory) {
      res.status(400).json({ message: 'Category already exists' });
    } else {
      const newCategory = await Category.create({ name: category });
      res.status(201).send({newCategory});
    }
  } catch (error) {
    next(error);
  }
}

const DeleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== 'Choose Category') {
      const categoryExists = await Category.findOne({name: req.params.category}).orFail();
      await categoryExists.remove();
      res.status(204).json({ message: 'Category deleted' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  GetCategories,
  NewCategory,
  DeleteCategory
};
