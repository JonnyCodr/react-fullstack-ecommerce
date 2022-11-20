require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kenny:sup3rs3cret@cluster0.ienuigz.mongodb.net/mern_ecommerce?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to Mongo SUCCESS");
  } catch (e) {
    console.log("Connected to Mongo FAILED", e);
    process.exit(1);
  }
};

module.exports = connectDB;
