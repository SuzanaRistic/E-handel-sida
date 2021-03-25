const Cart = require("../models/cartSchema");
const stripe = require("stripe")("sk_test_51ILqTtBE1mfx14b2FNCEVEBkNVi3bGoj2lHcF1SIk71VB0AbZWvBLVcedSCeO18gpfvuOx7J5MHq1wzG16EvqnZn0030wbwYCJ")
const checkoutGET = async (req, res) => {
  res.render("checkout.ejs", { error: "", shoppingCart: req.shoppingCart });
};

const checkoutPOST = async (req, res) => {
  try {
    const {
      deliveryOption,
      email,
      firstName,
      lastName,
      addressLine1,
      adressLine2,
    } = req.body;

    if (!deliveryOption || !email || !firstName || !lastName || !addressLine1)
      return res.render("checkout.ejs", {
        shoppingCart: req.shoppingCart,
        error: "Please enter all fields",
      });
    let cart = await Cart.findOne({ userId: req.shoppingCart.userId });

    if (cart.total < 500) {
      cart.deliveryFee = deliveryOption;
      cart = await cart.save();
    }
    res.redirect("/payment");
  } catch (err) {
    console.log(err);
    res.render("checkout.ejs", { error: err, shoppingCart: req.shoppingCart });
  }
};

const paymentGET = async (req, res) => {

   let cart = req.shoppingCart.populate("products.productId");
    //console.log(cart.products)
    let paymentArr = []
    console.log(typeof cart.products)
    for (let i = 0; i < cart.products.length; i++){
    
  
      paymentArr.push(cart.products[i].productId)
      }
    
    console.log(paymentArr)

const session=    await stripe.checkout.sessions.create({
    success_url: 'http://localhost:8002/shoppingSuccess',
    cancel_url: 'https://example.com/cancel',
    payment_method_types: ['card'],
    line_items: paymentArr.map( productId => {

        return {
            name: productId.name, 
            amount:  productId.price* 100, 
            quantity: 1 , 
            currency: "sek"
        }
    }), 
  mode: 'payment',
  
}) 
console.log(session.Id)
res.render("payment.ejs", {sessionId:session.id})
}; 

const paymentPOST = async(req,res)=>{
    
}


module.exports = { checkoutGET, checkoutPOST, paymentGET,paymentPOST };
