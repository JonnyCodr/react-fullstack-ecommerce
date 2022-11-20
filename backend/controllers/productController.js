const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");


const GetProducts = async (req, res, next) =>{
  try {
    const pageNum = parseInt(req.query.pageNum) || 1;
    const totalProducts = await Product.countDocuments({});

    // sort by name, price, etc
    let sort = {};
    const sortOption = req.query.sort || '';
    if (sortOption) {
      let sortOptionArray = sortOption.split('_');
      sort = {[sortOptionArray[0]]: Number(sortOptionArray[1])};
    }

    const allProducts = await Product.find({})
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.status(200).json({allProducts, pageNum, paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage)});
  } catch (error) {
   next(error)
  }
}

module.exports = GetProducts;
