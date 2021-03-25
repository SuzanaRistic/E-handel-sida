const express = require("express");
const router = express.Router();
const shoppingCart = require("../middleware/shoppingCart")
const {checkoutGET, checkoutPOST, paymentGET, paymentPOST} = require("../controllers/checkoutController");

router.get("/checkout" ,shoppingCart, checkoutGET)
router.post("/checkout" ,shoppingCart,checkoutPOST)

router.get("/payment" ,shoppingCart, paymentGET)

router.get("/payment" ,shoppingCart, paymentPOST)

module.exports = router;