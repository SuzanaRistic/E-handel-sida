const jwt = require("jsonwebtoken");
require("dotenv").config();

//Dekodar jwt för att ge tillgång till username osv

const jwtDecode = (req, res, next) => {
    try {
        const token = req.cookies.jwToken;

        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.email = decoded.user.email;
        req.decoded = decoded;
        next()
    } catch (error) {
        return res.status(404).render("login.ejs", { error: "Log in as admin to gain access" })
    }

}
module.exports = jwtDecode;