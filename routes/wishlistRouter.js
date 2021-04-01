const express = require("express");
const router = express.Router();
const { wishlistGET, addToWishlist, deleteWishlist, addToCartFromList } = require("../controllers/wishlistController");
const { addToCart } = require("../controllers/shoppingCartController");
const verifyUser = require("../middleware/verifyUser");
const jwtDecode = require("../middleware/decodeUser");
const shoppingCart = require("../middleware/shoppingCart");

router.get("/wishlist", jwtDecode,shoppingCart, wishlistGET)
router.get("/addToWishlist/:id", verifyUser, jwtDecode, addToWishlist)
router.get("/deleteWishlist/:id", verifyUser, jwtDecode, deleteWishlist)
router.get("/addToCartFromList/:id", verifyUser, jwtDecode, addToCartFromList)

module.exports = router;