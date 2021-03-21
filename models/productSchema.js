const Joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: { type: String, require: true },
  name: { type: String, require: true, unique: true },
  description: { type: String, require: true },
  price: { type: Number, required: true },
  image: {
    path: { type: String, required: true }
  }
});

function validateProduct(product) {
  const schema = Joi.object({
    category: Joi.string().required(),
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required()
    // IMAGE VALIDATION? joi-image-extension
  })
  return schema.validate(product)
}

//lägga till bilder

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
  validateProduct
}
