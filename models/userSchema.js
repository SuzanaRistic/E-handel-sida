const mongoose = require("mongoose");
//require prod. schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },

  lastName: { type: String, require: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, minlength: 5 },

  token: String,

  tokenExpiration: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
