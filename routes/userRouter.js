const express = require("express");
const router = express.Router();
const {loginGET, loginPOST} = require("../controllers/loginController.js");
const {registerGET, registerPOST} = require("../controllers/registerController.js");
const verifyUser = require("../middleware/verifyUser.js");



router.get("/login", loginGET, verifyUser)
router.post("/login",loginPOST)


router.get("/register", registerGET)
router.post("/register", registerPOST)
module.exports = router;