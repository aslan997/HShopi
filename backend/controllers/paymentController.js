const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const stripe = require("stripe")(
  "sk_test_51N4p6CGsrruqbYJKA2bqZ5IPO1f3H4muGaZVa35FdPrpemiguK8xLWmRb1j1R4hMi8CUQ4acDMvmqsimSm1Phmgh00whlNeKoL"
);

// Handle stripe payment => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret, // Needed for payment processing on frontend
  });
});

// Send strip api key => /api/v1/stripeapi
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:
      "pk_test_51N4p6CGsrruqbYJKl71pvEi10fNmu83bBpbRQa5uDaLVstWCplfyqLss4wCPtux1LXGfWpk49ldpjLjaB2SRkSN200v9brw65B",
  });
});
