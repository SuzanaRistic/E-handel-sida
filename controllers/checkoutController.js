const Cart = require("../models/cartSchema");
const stripe = require("stripe")(
  "sk_test_51ILqTtBE1mfx14b2FNCEVEBkNVi3bGoj2lHcF1SIk71VB0AbZWvBLVcedSCeO18gpfvuOx7J5MHq1wzG16EvqnZn0030wbwYCJ"
);
const { User } = require("../models/userSchema");
const ejs = require("ejs");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");

const checkoutGET = async (req, res) => {
  if (req.shoppingCart.products.length == 0) return res.redirect("/");

  res.render("checkout.ejs", { error: "", shoppingCart: req.shoppingCart });
};

const checkoutPOST = async (req, res) => {
  try {
    const { deliveryOption } = req.body;

    if (!deliveryOption)
      return res.render("checkout.ejs", {
        shoppingCart: req.shoppingCart,
        error: "Please enter all fields",
      });
    let cart = await Cart.findOne({ userId: req.shoppingCart.userId });

    cart.deliveryFee = deliveryOption;
    cart = await cart.save();

    res.redirect("/payment");
  } catch (err) {
    console.log(err);
    res.render("checkout.ejs", { error: err, shoppingCart: req.shoppingCart });
  }
  res.redirect("/payment");
};

const paymentGET = async (req, res) => {
  let cart = req.shoppingCart.populate("products.productId");
  let user = await User.findOne({ email: req.email });

  const token = await crypto.randomBytes(32).toString("hex");

  user.token = token;
  user.tokenExpiration = Date.now() + 36000;
  await user.save();

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    success_url:
      "http://localhost:8000/order/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:8000/checkout",
    payment_method_types: ["card"],
    shipping_rates: [cart.deliveryFee],
    shipping_address_collection: {
      allowed_countries: ["SE"],
    },
    line_items: cart.products.map((product) => {
      return {
        name: product.productId.name,
        amount: product.productId.price * 100,
        quantity: product.quantity,
        currency: "sek",
      };
    }),
    mode: "payment",
  });
  session.total_details.amount_shipping = cart.deliveryFee;


  res.render("payment.ejs", { sessionId: session.id });
};

const shoppingSuccessGET = async (req, res) => {
  let user = await User.findOne({ email: req.email });
  let cart = await Cart.findOne({ userId: user.id }).populate(
    "products.productId"
  );
  let cartTotal = await Cart.findOne({ userId: user.id });
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  let shipping = session.total_details.amount_shipping / 100;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dummymailfortransport@gmail.com",
      pass: process.env.TRANSPORT_PASS,
    },
  });

  const data = await ejs.renderFile(
    process.cwd() + "/views/shopSuccessEmailCopy.ejs",
    {
      items: cart.products,
      productTotal: cartTotal,
      user: user,
      shipping: shipping,
    }
  );
  await transport.sendMail({
    from: "dummymailfortransport@gmail.com",
    to: user.email,

    html: data,
  });
  cleanseCart = cartTotal.products = [];

  cleanseCart = await cartTotal.save();

  res.render("shopSuccess.ejs", {
    items: cart.products,
    total: cartTotal,
    shipping: shipping,
  });
};

module.exports = { checkoutGET, checkoutPOST, paymentGET, shoppingSuccessGET };
