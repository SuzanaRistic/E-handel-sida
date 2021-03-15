const mongoose = require("mongoose");
//require prod. schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },

  lastName: { type: String, require: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, minlength: 5 },

  token: String,

  tokenExpiration: Date,

  shoppingCart:[{
    type:mongoose.Schema.ObjectId,
    ref:"Product"
  }],
  wishlist:[{
    type:mongoose.Schema.ObjectId,
    ref:"Product"
  }],

});


userSchema.methods.addProductToCart =  function(productId){
  this.shoppingCart.push(productId);
  this.save();
}

const User = mongoose.model("User", userSchema);
module.exports = User;
