const express = require("express");
const router = express.Router();
const { wishlistGET } = require("../controllers/wishlistController");

router.get("/wishlist", wishlistGET)

module.exports = router;