const { Product } = require("../models/productSchema");
const { User } = require("../models/userSchema");

const adminGET = async (req, res) => {

  const user = await User.findOne({ email: req.email });

  if (user.role !== "Admin") {
    return res.render("index.ejs", { error: "Access denied" });
  }
  res.render("admin.ejs", { error: "" });
};


const adminDELETEGET = async (req,res)=> {
  const product = await Product.deleteOne({_id:req.params.id})
  return res.redirect("/")
 
}

const adminEDITGET = async (req,res)=> {
  const product = await Product.findOne({_id:req.params.id})
  const token = req.cookies.jwToken;
  res.render("specificProduct.ejs", {
    editMode: true,
    error: "",
    product: product,
    shoppingCart: req.shoppingCart,
    token,
    user:req.userFull,

  });
}

module.exports = {
  adminGET,
  adminDELETEGET,
  adminEDITGET,

};

