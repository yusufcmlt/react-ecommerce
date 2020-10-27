import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import {
  selectCurrentUser,
  selectIsUserAdmin,
} from "../../redux/user/user-selectors";

import "./Header-style.scss";

const Header = ({ currentUser, hidden, isAdmin }) => {
  return (
    <div className="header">
      <Link className="logo-container" to={process.env.PUBLIC_URL + "/"}>
        <div className="logo" alt="company-logo" />
        WEARSOMTN
      </Link>
      <div className="options">
        {isAdmin ? (
          <Link
            className="option is-admin"
            to={process.env.PUBLIC_URL + "/admin"}
          >
            ADMIN
          </Link>
        ) : null}

        <Link className="option" to={process.env.PUBLIC_URL + "/shop"}>
          SHOP
        </Link>

        <a
          className="option"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/pdouu/react-ecommerce"
        >
          CONTACT
        </a>

        {currentUser ? (
          <Link
            className="option"
            onClick={() => auth.signOut()}
            to={process.env.PUBLIC_URL + "/"}
          >
            SIGN OUT
          </Link>
        ) : (
          <Link className="option" to={process.env.PUBLIC_URL + "/signin"}>
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  isAdmin: selectIsUserAdmin,
});

export default connect(mapStateToProps)(Header);
