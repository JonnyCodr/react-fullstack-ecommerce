const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");

const GetProducts = async (req, res, next) => {
  console.log("req.params: ", req.params);
  console.log("req.query: ", req.query);
  console.log("req.query attrs: ", req.query.attrs);
  try {
    let query = {};
    let queryCondition = false;

    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }
    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }
    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      categoryQueryCondition = {
        category: { $in: a },
      };
    }
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      // attrs=RAM-1TB-2TB-4TB,color-blue-red
      // [ 'RAM-1TB-4TB', 'color-blue', '' ]
      console.log('incoming attrs:', req.query.attrs);

      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          console.log('item:', item);
          let a = item.split("-");
          let values = [...a];
          console.log('values before shift:', values);
          values.shift(); // removes first item
          console.log("values after shift:", values);
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          console.log('a1:', a1);
          acc.push(a1);
          // console.dir(acc, { depth: null })
          console.log('inside acc:', acc);
          return acc;
        } else {
          console.log('outside acc:', acc);
          return acc;
        }
      }, []);

      console.log("attrsQueryCondition", attrsQueryCondition);
      //   console.dir(attrsQueryCondition, { depth: null });
      queryCondition = true;
    }

    //pagination
    const pageNum = Number(req.query.pageNum) || 1;

    // sort by name, price etc.
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    //search
    let searchQueryCondition = {};
    const searchQuery = req.params.searchQuery || "";
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      // searchQueryCondition = { $text: { $search: '"' + searchQuery + '"' } }; // exact match
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = { score: { $meta: "textScore" } };
      sort = { score: { $meta: "textScore" } };
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition
        ],
      };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};

const GetProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews').orFail();
    res.json(product);

  } catch (error) {
    next(error);
  }

}

module.exports = {GetProducts, GetProductById};

