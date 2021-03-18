const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const mongoose = require("mongoose");
const Cart = require("../models/cartSchema")
const addToCart = async (req, res)=> {
 /*    console.log(req.email)
    const user = await User.findOne({email:req.email});
    
    const product = await Product.findOne({ _id: req.params.id });
    console.log(product)
    user.addProductToCart(product);
    res.redirect(req.headers.referer) */
    //console.log(req.decoded)
    const userId = req.decoded.user._id
    const productId = req.params.id
    //console.log(userId + "AS")
    //console.log(userId)
    try{
        let cart = await Cart.findOne({userId:userId});
  
        if (!cart) {
  
          let cart = await new Cart({userId:userId}).save()
          cart.products.push({productId:productId, quantity:1})
          cart = await cart.save()
          return res.redirect(req.headers.referer)
        }


        


        
        let index = cart.products.findIndex(x=> x.productId == productId);
        if (index === -1){
            cart.products.push({productId:productId, quantity:1})
            cart = await cart.save()
            return res.redirect(req.headers.referer)
        }
       
        let quantity = cart.products[index].quantity
        quantity += 1;
        cart.products[index].quantity = quantity 
        cart = await cart.save()
        return res.redirect(req.headers.referer) 
   
    }
    catch(err){
        if(err) return console.log(err + "EREOREOREOREOEORO")
    }
}


module.exports = addToCart;