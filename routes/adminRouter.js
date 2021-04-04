const express = require("express");
const router = express.Router();
const {
  adminGET,
  adminPOST,
  adminDELETEGET,
  adminEDITGET,
} = require("../controllers/adminController");
const shoppingCart = require("../middleware/shoppingCart");
const verifyUser = require("../middleware/verifyUser");
const jwtDecode = require("../middleware/decodeUser");
var multer = require("multer");
const { Product, validateProduct } = require("../models/productSchema");
const path = require("path");

router.get("/admin", jwtDecode, shoppingCart, adminGET);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.post("/admin", upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    const { error } = validateProduct(req.body);
    if (error)
      return res.render("admin.ejs", { error: error.details[0].message });

    const image = req.file.filename;
  
    const data = await new Product({
      name: name,
      category: category,
      description: description,
      price: price,
      image: { path: image },
    }).save();

    res.redirect("/");
  } catch (error) {
    res.render("admin.ejs", { error: error });
  }
});

router.get("/adminDelete/:id", shoppingCart, adminDELETEGET);

router.get("/adminEdit/:id", shoppingCart, verifyUser, adminEDITGET);

router.post("/adminEdit/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, image } = req.body;

    
    const product = await Product.findOne({ _id: req.params.id });
    product.name = name;
    product.price = price;
    product.description = desc;
    console.log(image);
    if (req.file) {
      product.image.path = req.file.filename;
    }

    await product.save();
    return res.redirect("/specific/" + product.id);

    
  } catch (error) {
    res.render("admin.ejs", { error: error });
  }
});

module.exports = router;
