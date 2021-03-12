const Product = require("../models/productSchema")

const plantGET = async (req,res) => {
    const plants = await Product.find({category:"plants"})  
    res.render("product.ejs", {product:plants});
}
const cactusGET = async (req,res) => {
  const cactuses = await Product.find({category:"cactuses"})  
  res.render("product.ejs", {product:cactuses});
  //console.log(cactus);
}
const tulipGET = async (req,res) => {
    const tulips = await Product.find({category:"tulips"})  
    res.render("product.ejs", {product:tulips});
}
const bouquetGET = async (req,res) => {
    const bouquets = await Product.find({category:"bouquets"})  
    res.render("product.ejs", {product:bouquets});
}
const vaseGET = async (req,res) => {
    const vases = await Product.find({category:"vases"})  
    res.render("product.ejs", {product:vases});
}



module.exports = {
    plantGET,
    cactusGET,
    tulipGET,
    bouquetGET,
    vaseGET
}
