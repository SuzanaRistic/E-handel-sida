const express = require("express");
const router = express.Router();
const { loginGET, loginPOST, logoutGET } = require("../controllers/loginController.js");
const { registerGET, registerPOST } = require("../controllers/registerController.js");
const { resetRender, resetSubmit, resetParams, resetFormSubmit } = require("../controllers/resetPasswordController.js");
const verifyUser = require("../middleware/verifyUser.js");
const shoppingCart = require("../middleware/shoppingCart")

router.get("/login", loginGET, verifyUser)
router.post("/login", loginPOST)

router.get("/register", registerGET)
router.post("/register", registerPOST)

router.get("/reset", resetRender);
router.post("/reset", resetSubmit)

router.get("/reset/:token", resetParams)
router.post("/resetPasswordForm", resetFormSubmit)

router.get("/logout", shoppingCart,logoutGET)

module.exports = router;