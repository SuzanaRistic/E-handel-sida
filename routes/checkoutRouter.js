const express = require("express");
const router = express.Router();
const shoppingCart = require("../middleware/shoppingCart")
const checkoutGET = require("../controllers/checkoutController");

router.get("/checkout" ,shoppingCart, checkoutGET)


module.exports = router;