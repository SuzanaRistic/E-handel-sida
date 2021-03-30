const { User } = require("../models/userSchema");
const { Product } = require("../models/productSchema");
const Cart = require("../models/cartSchema");

const wishlistGET = async (req, res) => {
    const userId = req.decoded.user._id;
    let user = await User.findOne({ _id: userId });
    const token = req.cookies.jwToken;

    await user.populate("wishlist").execPopulate()

    res.render('wishlist.ejs', {
        wishlist: user.wishlist,
        token
    })
}

const addToWishlist = async (req, res) => {
    const userId = req.decoded.user._id;
    const productId = req.params.id;

    try {
        let user = await User.findOne({ _id: userId });
        user.wishlist.push(productId);
        user.save()

        console.log("PRODUCT ADDED TO WISHLIST")
        return res.redirect(req.headers.referer);

    } catch (error) {
        res.send(error);
    }
};

const deleteWishlist = async (req, res) => {
    try {
        const userId = req.decoded.user._id;
        const productId = req.params.id;

        let user = await User.findOne({ _id: userId });
        const wishlist = user.wishlist;

        let index = wishlist.findIndex((x) => x._id == productId);
        wishlist.splice([index], 1);
        user = await user.save();
        return res.redirect(req.headers.referer);
    } catch (error) {
        console.log(error)
        return res.redirect(req.headers.referer);
    }
};

const addToCartFromList = async (req, res) => {
    try {
        const userId = req.decoded.user._id;
        const productId = req.params.id;

        let user = await User.findOne({ _id: userId });
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            let cart = await new Cart({ userId: userId }).save();
            cart.products.push({ productId: productId, quantity: 1 });
            cart = await cart.save();
        }

        let index = cart.products.findIndex((x) => x.productId == productId);
        if (index === -1) {
            cart.products.push({ productId: productId, quantity: 1 });
            cart = await cart.save();
        }

        let quantity = cart.products[index].quantity;
        quantity += 1;
        cart.products[index].quantity = quantity;
        cart = await cart.save();

        const wishlist = user.wishlist;

        let indexWish = wishlist.findIndex((x) => x._id == productId);
        wishlist.splice([indexWish], 1);
        user = await user.save();
        return res.redirect(req.headers.referer);

    } catch (error) {
        console.log(error)
        return res.redirect(req.headers.referer);
    }
};

module.exports = {
    wishlistGET,
    addToWishlist,
    deleteWishlist,
    addToCartFromList
}