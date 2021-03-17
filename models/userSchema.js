const mongoose = require("mongoose");
//require prod. schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },

  lastName: { type: String, require: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, minlength: 5 },

  token: String,

  tokenExpiration: Date,

  shoppingCart:[
   {product:{type:mongoose.Schema.ObjectId,
               ref:"Product"}} 
  
/*   { type:mongoose.Schema.ObjectId,
  ref:"Product",
} */
  
    
   
  
 
],
  wishlist:[{
    type:mongoose.Schema.ObjectId,
    ref:"Product"
  }],

});


/* userSchema.methods.addProductToCart =  function(productId){
  this.shoppingCart.push(productId);
  this.save();
} */

userSchema.methods.addProductToCart =  function(product, populated){
  let productId = product._id
  console.log(productId)
  const index = this.shoppingCart.findIndex(x=> x._id.toString() == productId)

  let leng = this.shoppingCart.filter(x=> x._id.toString() == productId).length 
  console.log(this.shoppingCart.JSON)



  if (leng === 0){
    this.shoppingCart.push(productId);
    return this.save();
  }
  else{
      //if (this.shoppingCart[index].quantity === NaN) this.quantity = 0; return this.save()
      quantityUpdate =  this.shoppingCart[index].quantity +1;
      console.log(this.shoppingCart[index])
      this.shoppingCart[index].quantity = quantityUpdate;
      return this.save()

  }

}

  
userSchema.methods.removeProducts = function(productId){
  const index = this.shoppingCart.indexOf(productId);
  this.shoppingCart.splice(index, 1);

this.save()
}
/* userSchema.methods.removeProducts = function(productId){
  const index = this.shoppingCart.indexOf(productId);
  this.shoppingCart.splice(index, 1);

this.save()

} */

userSchema.methods.quantity = function(productId){
  //console.log(this.shoppingCart);
 

  //if(z[0] == this.shoppingCart[0]) {return console.log("true")} else {return console.log("false")}
  //console.log( this.shoppingCart.filter(x=> x ==productId).length + "asdasdasndlasnds")
}

const User = mongoose.model("User", userSchema);
module.exports = User;

