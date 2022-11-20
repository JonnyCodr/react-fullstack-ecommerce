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

const SaveAttr = async (req, res, next) => {
  const {key, val, categoryChosen} = req.body
  if (!key || !val || !categoryChosen) {
    return res.status(400).send("All inputs are required")
  }

  try {
    const category = categoryChosen.split("/")[0]
    const categoryExists = await Category.findOne({name: category}).orFail()
    if(categoryExists.attrs.length > 0) {
      // if key exists in the database then add a value to the key
      var keyDoesNotExistsInDatabase = true
      categoryExists.attrs.map((item, idx) => {
        if(item.key === key) {
          keyDoesNotExistsInDatabase = false
          let copyAttributeValues = [...categoryExists.attrs[idx].value];
          copyAttributeValues.push(val)
          let newAttributeValues = [...new Set(copyAttributeValues)]; // Set ensures unique values
          categoryExists.attrs[idx].value = newAttributeValues
        }
      })

      if(keyDoesNotExistsInDatabase) {
        categoryExists.attrs.push({key: key, value: [val]})
      }
    } else {
      // push to the array
      categoryExists.attrs.push({key: key, value: [val]})
    }
    await categoryExists.save()
    let cat = await Category.find({}).sort({name: "asc"})
    return res.status(201).json({categoriesUpdated: cat})
  } catch(err) {
    next(err)
  }
}

module.exports = {
  GetCategories,
  NewCategory,
  DeleteCategory,
  SaveAttr
};
