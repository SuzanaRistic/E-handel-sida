const mongoose = require("mongoose");
//require prod. schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },

  lastName: { type: String, require: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, minlength: 5 },

  token: String,

  tokenExpiration: Date,

  role:{type:String,required:true,default:"Customer"}
,
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

userSchema.methods.removeProducts = function(productId){
  const index = this.shoppingCart.indexOf(productId);
  this.shoppingCart.splice(index, 1);

this.save()
}

const User = mongoose.model("User", userSchema);
module.exports = User;
