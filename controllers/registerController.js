const { User, validateUser } = require("../models/userSchema");
const bcrypt = require("bcrypt");

const registerGET = (req, res) => {
  res.render("register.ejs", { error: "" });
};

const registerPOST = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingEmail = await User.findOne({ email: req.body.email })
  if (existingEmail) {
    res.render('register.ejs', { error: "Email already registered" })
  }

  const { error } = validateUser(req.body)
  if (error) return res.render("register.ejs", { error: error.details[0].message });

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
  catch (error) {
    console.log(error)
    return res.render("register.ejs", { error: error.details[0].message })
  }
};
module.exports = {
  registerGET,
  registerPOST,
};
