const express = require("express");
const router = express.Router();
const homeGET = require("../controllers/homeController");

router.get("/", homeGET)

module.exports = router;