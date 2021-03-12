const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: {type: String, require: true},

  name: { type: String, require: true, unique:true},

  description: {type: String, require: true},

  price: { type: Number, required: true },
});

//lägga till bilder

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
