import React from "react";

import "./CustomButton-style.scss";

export default function CustomButton({
  children,
  isGoogleSignIn,
  inverted,
  addedCart,
  searchButton,
  ...otherProps
}) {
  return (
    <button
      className={`
      ${inverted ? "inverted" : ""} 
      ${isGoogleSignIn ? "google-sign-in" : ""}
      ${addedCart ? "cart-added" : ""}
      ${searchButton ? "search-button" : ""} 
      custom-button
      `}
      {...otherProps}
    >
      {children}
    </button>
  );
}
