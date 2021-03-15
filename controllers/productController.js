const shoppingCart = require("../middleware/shoppingCart");
const Product = require("../models/productSchema");

const plantGET = async (req, res) => {
    pagination(req, res, "plants");
};
const cactusGET = async (req, res) => {
    console.log(req.shoppingCart)
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
        const dataPerPage = 2;
        const dataToShow = page + page;
        const plants = await Product.find({ category: category })
            .limit(dataToShow)
            .sort({ name: sorted });
        const totalData = await Product.find({
            category: category,
        }).countDocuments();


        res.render("product.ejs", {
            product: plants,
            dataToShow: dataToShow,
            dataPerPage: dataPerPage,
            totalData: totalData,
            page: page,
            shoppingCart: req.shoppingCart,
        });
    } catch (err) {
        console.log("ERRRO");
        res.send("asdasd");
    }
}

const specificGET = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });

    res.render("specificProduct.ejs", { product: product, shoppingCart: req.shoppingCart })
}
module.exports = {
    plantGET,
    cactusGET,
    tulipGET,
    bouquetGET,
    vaseGET,
    specificGET
};