const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
    console.log(req.email)
    const user = await User.findOne({ email: req.email });

    const product = await Product.findOne({ _id: req.params.id });
    console.log(product)
    user.addProductToCart(product);
    res.redirect(req.headers.referer)
}


module.exports = addToCart;