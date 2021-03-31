const { User } = require("../models/userSchema");

const adminGET = async (req, res) => {

  const user = await User.findOne({ email: req.email });

  if (user.role !== "Admin") {
    return res.render("index.ejs", { error: "Access denied" });
  }
  res.render("admin.ejs", { error: "" });
};

module.exports = {
  adminGET,
};
