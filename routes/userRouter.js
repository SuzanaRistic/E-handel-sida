const express = require("express");
const router = express.Router();
const loginGET = require("../controllers/loginController.js");
const registerGET = require("../controllers/registerController.js");



router.get("/login", loginGET)
router.get("/register", registerGET)

module.exports = router;