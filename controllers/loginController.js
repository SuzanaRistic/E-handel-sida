const { findOne } = require("../models/userSchema");
const User = require("../models/userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

require("dotenv").config();
const loginGET = (req, res)=> {
    res.render("login.ejs")
}
const loginPOST = async (req, res)=> {
    const {email,password} = req.body;
   
    try{
        const user = await User.findOne({email:email})
        if (!user) return res.redirect("/register")
        const validUser = await bcrypt.compare(password, user.password);
        if(!validUser) return res.redirect("/login")

        const jwToken = await jwt.sign({user:user},process.env.TOKEN_KEY)
    
        if (jwToken) {
            const cookie = req.cookies.jwToken;
    
       if (!cookie){
            res.cookie("jwToken",jwToken,{maxAge: 604800000, httpOnly:true})
        }
        return res.redirect("/")
    }
  
}
catch(err){
    console.log(err)
}
}
module.exports = {
    loginGET,
    loginPOST,
};