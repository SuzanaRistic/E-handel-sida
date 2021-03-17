const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const { populate } = require("../models/userSchema");
const User = require("../models/userSchema")
//Dekodar jwt för att ge tillgång till username osv

const shoppingCart = async(req, res, next)=>
{const token = req.cookies.jwToken;
    
const decoded = jwt.verify(token, process.env.TOKEN_KEY)


const user = await User.findOne({email: decoded.user.email}).populate(
   "shoppingCart"
    
)

console.log(user.shoppingCart[0].id + "KASDLASN") 


req.shoppingCart = user.shoppingCart;
req.user = decoded
next()
}

module.exports = shoppingCart;