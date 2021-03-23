const express = require("express");
const router = express.Router();

const checkoutGET = require("../controllers/checkoutController");

router.get("/checkout", checkoutGET)


module.exports = router;