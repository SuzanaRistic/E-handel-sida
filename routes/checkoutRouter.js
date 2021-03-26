const express = require("express");
const router = express.Router();
const shoppingCart = require("../middleware/shoppingCart")
const {checkoutGET, checkoutPOST, paymentGET, shoppingSuccessGET} = require("../controllers/checkoutController");

router.get("/checkout" ,shoppingCart, checkoutGET)
router.post("/checkout" ,shoppingCart,checkoutPOST)

router.get("/payment" ,shoppingCart, paymentGET)



router.get("/order/success/:token", shoppingCart, shoppingSuccessGET)


router.get('/order/success', shoppingSuccessGET)
module.exports = router;