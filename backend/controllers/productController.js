const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");


const GetProducts = async (req, res, next) =>{
  try {
    let queryCondition = false;
    let query = {};
    let priceQueryCondition = {};
    let ratingQueryCondition = {};

    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: req.query.price } };
    }
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(',') } };
    }

    if (queryCondition) {
      query = {
        $and: [priceQueryCondition, ratingQueryCondition]
      }
    }

    console.log(query);

    // pagination
    const pageNum = parseInt(req.query.pageNum) || 1;

    // sort by name, price, etc
    let sort = {};
    const sortOption = req.query.sort || '';
    if (sortOption) {
      let sortOptionArray = sortOption.split('_');
      sort = {[sortOptionArray[0]]: Number(sortOptionArray[1])};
    }

    const totalProducts = await Product.countDocuments(query);
    const allProducts = await Product.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.status(200).json({allProducts, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage)});
  } catch (error) {
   next(error)
  }
}

module.exports = GetProducts;
