const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const mongoose = require("mongoose");

const addToCart = async (req, res)=> {
  
    const user = await User.findOne({email:req.email});
    
    const product = await Product.findOne({ _id: req.params.id });
    const z = await User.findOne({email:req.email})

    user.addProductToCart(product, z);
 
    res.redirect(req.headers.referer)
}


module.exports = addToCart;