const User = require("../models/userSchema")


const loginGET = (req, res)=> {
    res.render("login.ejs")
}

module.exports = loginGET;