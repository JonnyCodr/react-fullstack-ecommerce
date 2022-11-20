const mongoose = require("mongoose");
const Review = require("./ReviewsModel");

const imageSchema = mongoose.Schema({
  path: {
    type: String, required: true
  }
});

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    required: true,
  },
  category:{
    type: String, //should be of type enum
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  reviewsNumber: {
    type: Number,
  },
  sales: {
    type: Number,
  },
  attr:[
    {key: {type: String}, value: {type: String}}
  ],
  images: [imageSchema],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Review,
  }]
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

productSchema.index({name: "text", description: "text"}, {name: "ProductTextIndex"});
productSchema.index({"attr.key": 1, "attr.value":1});
module.exports = Product;
