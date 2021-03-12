const express = require("express");
const router = express.Router();

const {plantGET, cactusGET, tulipGET, bouquetGET, vaseGET} = require("../controllers/productController")

router.get("/plant", plantGET) 

router.get("/cactus", cactusGET) 

router.get("/tulip", tulipGET) 

router.get("/bouquet", bouquetGET) 

router.get("/vase", vaseGET) 

module.exports = router;