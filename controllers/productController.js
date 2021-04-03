const shoppingCart = require("../middleware/shoppingCart");
const { Product, validateProduct } = require("../models/productSchema");
const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");


const plantGET = async (req, res) => {
  pagination(req, res, "plants");
};
const cactusGET = async (req, res) => {
  pagination(req, res, "cactuses");
};
const tulipGET = async (req, res) => {
  pagination(req, res, "tulips");
};
const bouquetGET = async (req, res) => {
  pagination(req, res, "bouquets");
};
const vaseGET = async (req, res) => {
  pagination(req, res, "vases");
};

async function pagination(req, res, category) {
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1;

  try {
    const dataPerPage = 6;
    const dataToShow = page * dataPerPage;
    const plants = await Product.find({ category: category })
      .limit(dataToShow)
      .sort({ price: sorted });
    const totalData = await Product.find({
      category: category,
    }).countDocuments();


    let token = req.cookies.jwToken;

    res.render("product.ejs", {
      error: "",
      product: plants,
      dataToShow: dataToShow,
      dataPerPage: dataPerPage,
      totalData: totalData,
      page: page,
      shoppingCart: req.shoppingCart,
      token,
      user:req.userFull
    });
  } catch (error) {
    res.render("product.ejs", { error: error });
  }
}

const specificGET = async (req, res) => {
  const token = req.cookies.jwToken;
  

  try {
    const product = await Product.findOne({ _id: req.params.id });

    res.render("specificProduct.ejs", {
      error: "",
      product: product,
      shoppingCart: req.shoppingCart,
      token,
      user:req.userFull,
      editMode:false,
  
    });
  } catch (error) {
    res.render("product.ejs", { error: "Product not found", token });
  }
};

const deleteGET = async (req, res) => {
  const user = await User.findOne({ email: req.email });
  user.removeProducts(req.params.id);

  return res.redirect(req.headers.referer);
};

module.exports = {
  plantGET,
  cactusGET,
  tulipGET,
  bouquetGET,
  vaseGET,
  specificGET,
  deleteGET,
};
