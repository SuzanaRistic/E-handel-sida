const { User } = require("../models/userSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resetRender = (req, res) => {
  res.render("reset.ejs", { error: "" });
};

const resetSubmit = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) return res.render("register.ejs", { error: "User not found, register an account" });

  const token = await crypto.randomBytes(32).toString("hex");

  user.token = token;
  user.tokenExpiration = Date.now() + 3600000;
  await user.save();

  const msg = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Requested new password",
    html: `<h2> Click <a href="http://localhost:8000/reset/${user.token}" > <b>here</b> </a> to reset password </h2>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.render("checkMail.ejs", { error: "" });
};

const resetParams = async (req, res) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({
      token: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.redirect("/register");

    res.render("resetPasswordForm.ejs", { error: "", email: user.email });
  } catch (error) {
    res.render("reset.ejs", { error: " Försök igen" });
  }
};
const resetFormSubmit = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findOne({ email: email });

  user.password = hashedPassword;
  await user.save();
  res.redirect("/login");
};

module.exports = {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
};