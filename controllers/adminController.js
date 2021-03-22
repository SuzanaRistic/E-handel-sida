
const { User } = require('../models/userSchema');




const adminGET = async (req, res) => {
    console.log(req.email)
    const user = await User.findOne({ email: req.email })
    if (user.role !== "Admin") {
        return res.redirect("/")
    }
    res.render("admin.ejs", { error: "" })
}




module.exports = { adminGET }