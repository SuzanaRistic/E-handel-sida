const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        productId:{type:String,default:0},
        quantity:{type:Number,default:0}

    }]
})

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
