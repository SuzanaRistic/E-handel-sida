const express = require("express");
const router = express.Router();

const {plantGET, cactusGET, tulipGET, bouquetGET, vaseGET, specificGET} = require("../controllers/productController")
const addToCart = require("../controllers/shoppingCartController");
const verifyUser = require("../middleware/verifyUser");
const jwtDecode = require("../middleware/decodeUser");
const shoppingCart = require("../middleware/shoppingCart");
router.get("/plants",shoppingCart,  plantGET) 

router.get("/cactuses", shoppingCart, cactusGET) 

router.get("/tulips",shoppingCart, tulipGET) 

router.get("/bouquets", shoppingCart, bouquetGET) 

router.get("/vases",shoppingCart, vaseGET) 

router.get("/specific/:id", shoppingCart, specificGET) 

router.get("/addToCart/:id",verifyUser, jwtDecode,shoppingCart,  addToCart, )

module.exports = router;