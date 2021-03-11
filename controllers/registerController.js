const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const registerGET = (req, res) => {
  res.render("register.ejs", {err:""});
};

const registerPOST = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    }).save();
    return res.redirect("/login")
  }
  catch(err){
      console.log(err)
   return res.render("register.ejs",{err:err})
  }
};
module.exports = {
  registerGET,
  registerPOST,
};
