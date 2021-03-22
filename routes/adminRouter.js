const express = require("express");
const router = express.Router();
const { adminGET, adminPOST } = require("../controllers/adminController");
const jwtDecode = require("../middleware/decodeUser")
var multer = require('multer');
const { Product, validateProduct } = require("../models/productSchema");
const path = require("path")
router.get("/admin", jwtDecode, adminGET)

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });


router.post("/admin", upload.single("image"), async (req, res) => {
    const { name, category, description, price } = req.body;

    const { error } = validateProduct(req.body)
    if (error) return res.render("admin.ejs", { error: error.details[0].message });

    console.log(req.file)
    const image = req.file.filename;
    console.log(image)
    const data = await new Product({ name: name, category: category, description: description, price: price, image: { path: image } }).save()
    console.log(data)
    console.log(data.image.path)
    res.redirect("/")
})
module.exports = router;