import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart-actions";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./CartIcon-style.scss";

function CartIcon({ toggleCartHidden }) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}

const mapDispactToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispactToProps)(CartIcon);
