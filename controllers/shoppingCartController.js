const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");
const addToCart = async (req, res) => {

  const userId = req.decoded.user._id;
  const productId = req.params.id;

  try {
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      let cart = await new Cart({ userId: userId }).save();
      cart.products.push({ productId: productId, quantity: 1 });
      cart = await cart.save();
      return res.redirect(req.headers.referer);
    }

    let index = cart.products.findIndex((x) => x.productId == productId);
    if (index === -1) {
      cart.products.push({ productId: productId, quantity: 1 });
      cart = await cart.save();
      return res.redirect(req.headers.referer);
    }

    let quantity = cart.products[index].quantity;
    quantity += 1;
    cart.products[index].quantity = quantity;
    cart = await cart.save();
    console.log(cart);
    return res.redirect(req.headers.referer);
  } catch (err) {
    if (err) return console.log(err + "EREOREOREOREOEORO");
  }
};

module.exports = addToCart;
