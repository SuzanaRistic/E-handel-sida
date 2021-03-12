const Product = require("../models/productSchema")

const plantGET = (req,res) => {
    res.render("product.ejs");
}
const cactusGET = (req,res) => {
  const cactus = Product.find({category: "cactuses"})  
  res.render("product.ejs", {product:cactus});
  console.log(cactus);
}
const tulipGET = (req,res) => {
    res.render("product.ejs");
}
const bouquetGET = (req,res) => {
    res.render("product.ejs");
}
const vaseGET = (req,res) => {
    res.render("product.ejs");
}

module.exports = {
    plantGET,
    cactusGET,
    tulipGET,
    bouquetGET,
    vaseGET
}
