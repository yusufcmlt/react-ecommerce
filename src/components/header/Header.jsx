import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-utils";
import { connect } from "react-redux";

import "./Header-style.scss";
//import sportwear from "../../assets/sport-wear.png";
//import { ReactComponent as Logo } from "../../assets/sport-wear.svg";

const Header = ({ currentUser }) => {
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
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
