const mongoose = require("mongoose");
const Joi = require('joi');
//require prod. schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  token: String,
  tokenExpiration: Date,
  role: { type: String, required: true, default: "Customer" },

  wishlist: [{
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  }],
});

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().min(5).max(100).email().required(),
    password: Joi.string().min(5).max(100).required()
  })
  return schema.validate(user)
}

/* userSchema.methods.addProductToCart =  function(productId){
  this.shoppingCart.push(productId);
  this.save();
}

userSchema.methods.removeProducts = function (productId) {
  const index = this.shoppingCart.indexOf(productId);
  this.shoppingCart.splice(index, 1);

this.save()
} */

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
  validateUser
}
