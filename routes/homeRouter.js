const express = require("express");
const router = express.Router();
const homeGET = require("../controllers/homeController");
const shoppingCart = require("../middleware/shoppingCart");

router.get("/", shoppingCart, homeGET)

module.exports = router;