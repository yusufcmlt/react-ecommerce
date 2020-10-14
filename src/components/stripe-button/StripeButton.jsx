import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;

  const publishableKey =
    "pk_test_51Hc6tIJ8KN2gJsBHWOfHDD3A83fjat1uYb9e6oe7GeRBqHB4RGLQPP8DS3k8O2tOHbckE3WsX0mU1LtZzIbkYWqE00JZNZfEYq";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="WEARSOMTN Clothing"
      billingAddress
      shippingAddress
      image="https://i.ibb.co/fSVkD7T/sport-wear1.png"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
