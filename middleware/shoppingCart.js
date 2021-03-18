const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userSchema")
//Dekodar jwt för att ge tillgång till username osv

const shoppingCart = async (req, res, next) => {
    try {
        const token = req.cookies.jwToken;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        const user = await User.findOne({ email: decoded.user.email }).populate({
            path: "shoppingCart",
        });
        req.shoppingCart = user.shoppingCart;
        req.email = decoded.user.email
        next()
    } catch (error) {
        res.send(error)
    }
}

module.exports = shoppingCart;