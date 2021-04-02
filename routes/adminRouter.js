const express = require("express");
const router = express.Router();
const { adminGET, adminPOST, adminDELETEGET, adminEDITGET} = require("../controllers/adminController");
const shoppingCart = require("../middleware/shoppingCart")
const verifyUser = require("../middleware/verifyUser")
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
    try {
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
    } catch (error) {
        res.render("admin.ejs", { error: error })
    }

})

router.get("/adminDelete/:id", adminDELETEGET)

router.get("/adminEdit/:id",shoppingCart, verifyUser,adminEDITGET)

router.post("/adminEdit/:id", upload.single("image"), async (req, res) => {
    try {
        const { name, desc, price, image} = req.body;

        //const { error } = validateProduct(req.body)
        //if (error) return res.render("admin.ejs", { error: error.details[0].message });

      /*   console.log(req.file)
        if (req.file) {
            const image = req.file.filename;
        }

        console.log(image) */
        const product = await Product.findOne({_id:req.params.id})
        product.name = name;
        product.price = price;
        product.description = desc;
        console.log(image)
        if (req.file){
            product.image.path = req.file.filename;
        }
        console.log(req.file)
      await product.save()
        //const product =await Product.findOneAndUpdate({_id:req.params.id, name:name,description:desc,price:price,image:{path:image}})
        return res.redirect("/specific/"+ product.id)

       // console.log(product)
        //console.log(data.image.path)
       // res.redirect("/")
    } catch (error) {
        res.render("admin.ejs", { error: error })
    }
})


module.exports = router;