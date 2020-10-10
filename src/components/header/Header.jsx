import React from "react";
import { Link } from "react-router-dom";

import "./Header-style.scss";
//import sportwear from "../../assets/sport-wear.png";
//import { ReactComponent as Logo } from "../../assets/sport-wear.svg";

export default function Header() {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <div className="logo" alt="company-logo" />
        BUYSOMTN
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      </div>
    </div>
  );
}
