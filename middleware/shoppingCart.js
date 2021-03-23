const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");
const User = require("../models/userSchema");
//Dekodar jwt för att ge tillgång till username osv

const shoppingCart = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findOne({ email: decoded.user.email });

    let cart = await Cart.findOne({ userId: user._id }).populate(
      "products.productId"
    );
   // let productTotal = loop(cart.products)
 
 
   // console.log(productsTotal)

   loop(cart)

  console.log(cart.products.length)
    req.shoppingCart = cart;
    req.email = decoded.user.email;
    req.userFull = decoded;
    if (cart.products.length === 0){
      cart.total = 0
    }
    
    cart = await cart.save()
  
  
  } catch (err) {
    console.log(err);
  }

  next();
};

module.exports = shoppingCart;

 async function loop(cart) {
  for (let i = 0; i < cart.products.length; i++) {
   /*  let productTotal = arr[i].quantity * arr[i].productId.price;
    console.log(productTotal)
    return productTotal; */
   
    cart.products[i].productTotal = cart.products[i].quantity * cart.products[i].productId.price
    let map1 = cart.products.map(x => x.productTotal);
    let total = map1.reduce((a,b)=>a+b,0)
    
    cart.total = total
    
    console.log(cart)
  
    
 


  }
}
 
/* async function totalGen(user){
  let cart = await Cart.findOne({ userId: user._id }).populate(
    "products.productId"
  );

  return total */

/* 
let map1 = cart.products.map(x => x.productTotal);
let total = map1.reduce((a,b)=>a+b,0)
return total
console.log(total)
//return total */