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
  console.log(req.body);
});

app.listen(4000, () => {
  console.log("Sever runniing on port:4000");
});
