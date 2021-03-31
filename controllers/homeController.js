const homeGET = (req, res) => {
    let token = req.cookies.jwToken;
    res.render("index.ejs", {
        error: "",
        token,
        shoppingCart: req.shoppingCart
    })
}

module.exports = homeGET;