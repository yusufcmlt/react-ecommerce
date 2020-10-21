const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const nodeEnv = process.env.NODE_ENV || "production";

if (nodeEnv === "production") {
  require("dotenv").config();
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (nodeEnv === "production") {
  app.get("*", function (req, res) {
    res.redirect("https://pdouu.github.io/react-ecommerce");
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port: " + port);
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
