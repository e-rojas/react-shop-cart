const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Add your stripe key to the require statement.");
});

app.post("/checkout", async (req, res) => {
  let error;
  let status;
  const { items, token, price } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.charges.create({
      amount: parseFloat(price) * 100,
      currency: "cad",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the McDonalds Meal`,

      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    });

    status = "success";
  } catch (error) {
    console.log("Error:", error);
    status = "failure";
  }
  res.json({ error, status });
});

app.listen(4000, () => {
  console.log("Sever runniing on port:4000");
});
