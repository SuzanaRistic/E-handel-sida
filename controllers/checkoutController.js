const checkoutGET = async (req, res) => {
    res.render('checkout.ejs',{shoppingCart: req.shoppingCart})
}

module.exports = checkoutGET;