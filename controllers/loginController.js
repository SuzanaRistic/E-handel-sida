const { findOne } = require("../models/userSchema");
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const loginGET = (req, res) => {
  res.render("login.ejs", { error: "" });
};
const loginPOST = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.render("login.ejs", { error: "Email not found" });
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser)
      return res.render("login.ejs", { error: "Invalid password" });

    const jwToken = await jwt.sign({ user: user }, process.env.TOKEN_KEY);

    if (jwToken) {
      const cookie = req.cookies.jwToken;

      if (!cookie) {
        res.cookie("jwToken", jwToken, { maxAge: 604800000, httpOnly: true });
      }
      console.log(user);
      return res.redirect("/");
    }
  } catch (error) {
    res.render("login.ejs", { error: "Login failed, try again" });
    console.log(error);
  }
};

const logoutGET = async (req, res) => {
  try {
    res.clearCookie("jwToken").redirect("/");
  } catch (error) {
    res.render("index.ejs", { error: "Logout failed" });
  }
};
module.exports = {
  loginGET,
  loginPOST,
  logoutGET,
};
