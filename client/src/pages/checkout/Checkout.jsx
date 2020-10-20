import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import StripeButton from "../../components/stripe-button/StripeButton";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart-selectors";

import "./Checkout-style.scss";

const Checkout = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {total ? (
        cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <p className="cart-empty-message">Your cart is empty</p>
      )}

      <div className="total">
        <div className="test-warning">
          <p>*Use the following test credit card for payment test*</p>
          <p>4242 4242 4242 4242 - Expire: 01/22 - CVV :123</p>
        </div>
        <div className="payment">
          <div className="total-price">Total: ${total}</div>
          {total ? <StripeButton price={total} /> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
