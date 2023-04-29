import isAuthenticated from "@/middlewares/isAuthenticated";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  isAuthenticated(req, res);
  const payment = await stripe.paymentIntents.create({
    amount: req.body.subtotal * 100,
    currency: "usd",
    payment_method_types: ["card"],
    receipt_email: req.user.email,
    metadata: {
      name: req.user.name,
      receipt_email: req.user.email,
      company: "Fashionista",
    },
    description: "My Fashionista E-commerce payments",
  });
  console.log(payment);
  res.status(200).json({ client_secret: payment.client_secret });
};
