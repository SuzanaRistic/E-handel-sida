const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");
const { User } = require("../models/userSchema");
/* Skrivet som middleware för att enkelt ge tillgång till shoppingcart
på alla sidor, ger också tillgång till userobjektet så med mer tid
hade man kunnat ta bort decodeUser helt 
Kollar hela tiden att inte något produktid är null, ifall en admin
skulle ha tagit bort ett objekt från databasen medan användare har den i cart

*/
const shoppingCart = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findOne({ email: decoded.user.email });

    let cart = await Cart.findOne({ userId: user._id }).populate(
      "products.productId"
    );


    let index = cart.products.findIndex((x) => x.productId == null);
    if (index != -1 ){
      cart.products.splice([index], 1)
      cart = await cart.save()
    }
   
    genTotal(cart);
    
    req.shoppingCart = cart;
    req.email = decoded.user.email;
    req.userFull = decoded;
 
    if (cart.products.length === 0) {
      cart.total = 0;
    }
   
    cart = await cart.save();
  } catch (err) {
    console.log(err);
  }

  next();
};


async function genTotal(cart) {
  for (let i = 0; i < cart.products.length; i++) {
    cart.products[i].productTotal =
      cart.products[i].quantity * cart.products[i].productId.price;

    let map1 = cart.products.map((x) => x.productTotal);
    let total = map1.reduce((a, b) => a + b, 0);

    cart.total = total;

  }
}


module.exports = shoppingCart;