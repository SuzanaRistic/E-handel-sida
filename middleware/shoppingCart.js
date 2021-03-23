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
    console.log(cart.products);
   

    //console.log(cart.products)
    req.shoppingCart = cart.products;
    req.email = decoded.user.email;
    req.userFull = decoded;
  } catch (err) {
    console.log(err);
  }

  next();
};

module.exports = shoppingCart;

/* async function loop(arr) {
  for (let i = 0; i < arr.length; i++) {
    let productTotal = arr[i].quantity * arr[i].productId.price;
    console.log(productTotal);
    return productTotal;
  }
}
 */