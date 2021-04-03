const homeGET = (req, res) => {
    let token = req.cookies.jwToken;
    res.render("index.ejs", {
        error: "",
        token,
        shoppingCart: req.shoppingCart,
        user:req.userFull
    })
}

module.exports = homeGET;