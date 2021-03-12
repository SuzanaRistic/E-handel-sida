const Product = require("../models/productSchema");

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

module.exports = {
    plantGET,
    cactusGET,
    tulipGET,
    bouquetGET,
    vaseGET,
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
        });
    } catch (err) {
        console.log("ERRRO");
        res.send("asdasd");
    }
}
