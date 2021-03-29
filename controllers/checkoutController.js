const Cart = require("../models/cartSchema");
const stripe = require("stripe")("sk_test_51ILqTtBE1mfx14b2FNCEVEBkNVi3bGoj2lHcF1SIk71VB0AbZWvBLVcedSCeO18gpfvuOx7J5MHq1wzG16EvqnZn0030wbwYCJ")
const {User} = require("../models/userSchema")
const crypto = require("crypto");
const checkoutGET = async (req, res) => {
  res.render("checkout.ejs", { error: "", shoppingCart: req.shoppingCart });
};

const checkoutPOST = async (req, res) => {
  try {
    const {
      deliveryOption,
     
    } = req.body;

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
  res.redirect("/payment")
};

const paymentGET = async (req, res) => {

   let cart = req.shoppingCart.populate("products.productId");
   let user = await User.findOne({email:req.email})
  console.log(cart.deliveryFee)
  console.log(cart.userId)

  const token = await crypto.randomBytes(32).toString("hex");
 
  user.token = token;
  user.tokenExpiration = Date.now() + 36000;
  await user.save();

const session=    await stripe.checkout.sessions.create({
    success_url: 'http://localhost:8000/order/success/' + token,
    cancel_url: 'http://localhost:8000/checkout',
    payment_method_types: ['card'],
    shipping_rates: [cart.deliveryFee],
    shipping_address_collection: {
      allowed_countries: ['SE'],
    },
    line_items: cart.products.map( product => {

        return {
            name: product.productId.name, 
            amount:  product.productId.price* 100, 
            quantity: product.quantity , 
            currency: "sek"
        }
    }
    ) , 
  mode: 'payment',
  
})
session.total_details.amount_shipping = cart.deliveryFee;


res.render("payment.ejs", {sessionId:session.id})
}; 

const shoppingSuccessGET =  async (req, res) => {
  let user = await User.findOne({email:req.email})
  let cart = await Cart.findOne({userId:user.id})
  console.log(cart)
 try {if (req.params.token != user.token || user == null) return res.redirect("/")
  user.token = "placeholder"
  user = await user.save()
  console.log(user)

}
catch(err){
    res.redirect("/")
}
  res.render("shopSuccess.ejs")

};

module.exports = { checkoutGET, checkoutPOST, paymentGET ,shoppingSuccessGET};
