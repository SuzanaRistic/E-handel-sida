const { User } = require("../models/userSchema");
const Product = require("../models/productSchema");
const mongoose = require("mongoose");
const Cart = require("../models/cartSchema");

const addToCart = async (req, res) => {
  const userId = req.decoded.user._id;
  const productId = req.params.id;

  /*   const addToCart = async (req, res) => {
      console.log(req.email)
      const user = await User.findOne({ email: req.email });
  
      const product = await Product.findOne({ _id: req.params.id });
      console.log(product)
      user.addProductToCart(product);
      res.redirect(req.headers.referer)
  } */

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

    return res.redirect(req.headers.referer);
  } catch (error) {
    res.render("product.ejs", { error: error })
    if (error) return console.log(error + "Add to cart error");
  }
};
const incrementProduct = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.userFull.user._id });

  let productId = req.params.id;
  let index = cart.products.findIndex((x) => x._id == productId);

  let quantity = cart.products[index].quantity;
  quantity += 1;
  cart.products[index].quantity = quantity;

  cart = await cart.save();
  return res.redirect(req.headers.referer);
};
const decrementProduct = async (req, res) => {

<<<<<<< HEAD
  //console.log(req.userFull)
  let cart = await Cart.findOne({ userId: req.userFull.user._id });
  console.log(cart)
  let productId = req.params.id;
  let index = cart.products.findIndex((x) => x._id == productId);
  console.log(index)
=======
  let cart = await Cart.findOne({ userId: req.userFull.user._id });
  console.log(cart);
  let productId = req.params.id;
  let index = cart.products.findIndex((x) => x._id == productId);
  console.log(index);
>>>>>>> cartDev
  let quantity = cart.products[index].quantity;
  quantity -= 1;
  cart.products[index].quantity = quantity;
  cart = await cart.save();
  if (cart.products[index].quantity == 0) {
<<<<<<< HEAD

    cart.products.splice([index], 1)


  };
=======
    cart.products.splice([index], 1);
  }
>>>>>>> cartDev
  cart = await cart.save();
  return res.redirect(req.headers.referer);
};

const deleteGET = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.userFull.user._id });

  let productId = req.params.id;
  let index = cart.products.findIndex((x) => x._id == productId);
<<<<<<< HEAD
  cart.products.splice([index], 1)
  cart = await cart.save();
  return res.redirect(req.headers.referer)
}

module.exports = {
  addToCart,
  incrementProduct,
  decrementProduct,
  deleteGET
};
=======
  cart.products.splice([index], 1);
  cart = await cart.save();
  return res.redirect(req.headers.referer);
};

module.exports = { addToCart, incrementProduct, decrementProduct, deleteGET };
>>>>>>> cartDev
