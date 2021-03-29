const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 0 },
      productTotal:{type:Number, default:0}
    },
  ],
  total:{type:Number,default:0},
  deliveryFee:{type:String,default:0},

});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
