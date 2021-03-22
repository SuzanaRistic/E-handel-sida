const homeGET = (req, res) => {
    res.render("index.ejs", { error: "" })
}

module.exports = homeGET;