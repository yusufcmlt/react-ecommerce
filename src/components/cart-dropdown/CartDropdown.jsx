import React from "react";
import "./CartDropdown-style.scss";

import CustomButton from "../custom-button/CustomButton";

export default function CartDropdown() {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}
