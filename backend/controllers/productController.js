const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidator");
const path = require("path");
const fs = require("fs");

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 * @constructor
 */
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 * @constructor
 */
const GetProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews').orFail();
    res.json(product);

  } catch (error) {
    next(error);
  }

}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 * @constructor
 */
const GetBestSellers = async (req, res, next) => {
  try {
    const products = await Product.aggregate([
      {$sort: {category: 1, sales: -1}},
      {group: {_id: "$category", doc_with_max_sales: {$first: "$$Root"}}},
      {$replaceWith: "$doc_with_max_sales"},
      {$match: {sales: {$gt: 0}}},
      {$project: {_id: 0, name: 1, images: 1, category: 1, description: 1}},
      {$limit: 3},
    ])
    res.json(products)
  } catch (error) {
    next(error);
  }
}

/**
 * Gets all products for Admin User
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const AdminGetProducts = async (req, res, next) => {

  // try {
    // const products = await Product.find({})
    //   .sort({category: 1})
    //   .select({ name: 1, category: 1, price: 1 });
    //
    // console.log('products:', products);

    return res.json("Admin get products endpoint");
  // } catch (error) {
  //   next(error);
  // }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const AdminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).orFail();
    await product.remove();
    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const AdminCreateProduct = async (req, res, next ) => {
  try {
    const product = new Product();
    const { name, description, count, price, category, attributesTable } = req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;

    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attr.push({
          key: item.key,
          value: item.value,
        });
      })
    }

    await product.save();
    res.json({ message: "Product created successfully", productId: product._id });

  } catch (error) {
    next(error);
  }
}

const AdminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;

    if (attributesTable.length > 0) {
      product.attr = [];
      attributesTable.map((item) => {
        product.attr.push({
          key: item.key,
          value: item.value,
        });
      })
    } else {
      product.attr = [];
    }
    await product.save();
    res.json({ message: "Product updated successfully", productId: product._id });

  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 * @constructor
 */
const AdminUpload = async (req, res, next) => {
  try {
    if(!req.files || !! req.files.images === false) {
      return res.status(400).send("No files were uploaded.")
    }

    const validateResult = imageValidate(req.files.images)
    if(validateResult.error) {
      return res.status(400).send(validateResult.error)
    }

    const path = require("path")
    const { v4: uuidv4 } = require("uuid")
    const uploadDirectory = path.resolve(__dirname, "../../frontend", "public", "images", "products")

    let product = await Product.findById(req.query.productId).orFail()

    let imagesTable = []
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images
    } else {
      imagesTable.push(req.files.images)
    }

    for(let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name)
      var uploadPath = uploadDirectory + "/" + fileName
      product.images.push({ path: "/images/products/" + fileName})
      await image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err)
        }
      })
    }
    await product.save()
    return res.send("Files uploaded!")

  } catch(err) {
    next(err)
  }
}

const AdminDeleteImage = async (req, res, next) => {
  try {
    const imagePath = decodeURIComponent(req.params.imagePath);
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    return res.end();
  } catch (e) {
    next(e)
  }

}

module.exports = {
  GetProducts,
  GetProductById,
  GetBestSellers,
  AdminGetProducts,
  AdminDeleteProduct,
  AdminCreateProduct,
  AdminUpdateProduct,
  AdminUpload,
  AdminDeleteImage
};
