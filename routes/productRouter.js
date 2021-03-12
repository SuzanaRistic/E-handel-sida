const express = require("express");
const router = express.Router();

const {plantGET, cactusGET, tulipGET, bouquetGET, vaseGET} = require("../controllers/productController")

router.get("/plants", plantGET) 

router.get("/cactuses", cactusGET) 

router.get("/tulips", tulipGET) 

router.get("/bouquets", bouquetGET) 

router.get("/vases", vaseGET) 

module.exports = router;