const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");
const { User } = require("../models/userSchema");

const shoppingCart = async (req, res, next) => {
  try {
    const token = req.cookies.jwToken;

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);
    const user = await User.findOne({ email: decoded.user.email });

    let cart = await Cart.findOne({ userId: user._id }).populate(
      "products.productId"
    );

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