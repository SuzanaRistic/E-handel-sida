const { Product } = require("../models/productSchema");
const { User } = require("../models/userSchema");

const adminGET = async (req, res) => {
  const token = req.cookies.jwToken;

  const user = await User.findOne({ email: req.email });
  console.log(user);
  if (user.role != "Admin") {
    return res.render("index.ejs", {
      error: "Access denied",
      shoppingCart: req.shoppingCart,
      user: req.userFull,
      token
    });
  }
  res.render("admin.ejs", {
    error: "",
    shoppingCart: req.shoppingCart,
    user: req.userFull,
  });
};

const adminDELETEGET = async (req, res) => {
  const product = await Product.deleteOne({ _id: req.params.id });
  return res.redirect("/");
};

const adminEDITGET = async (req, res) => {
  const token = req.cookies.jwToken;

  if (req.userFull.user.role !== "Admin") {
    return res.redirect("/");
  }
  const product = await Product.findOne({ _id: req.params.id });

  res.render("specificProduct.ejs", {
    editMode: true,
    error: "",
    product: product,
    shoppingCart: req.shoppingCart,
    token,
    user: req.userFull,
  });
};

module.exports = {
  adminGET,
  adminDELETEGET,
  adminEDITGET,
};
