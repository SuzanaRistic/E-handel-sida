const User = require("../models/userSchema")
const bcrypt = require("bcrypt")

const registerGET = (req,res)=>{
    res.render("register.ejs")
}

module.exports = registerGET;