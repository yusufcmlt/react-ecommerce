import React from "react";

import "./CustomButton-style.scss";

export default function CustomButton({
  children,
  isGoogleSignIn,
  inverted,
  addedCart,
  searchButton,
  adminButton,
  selectedAdmin,
  pageButton,
  ...otherProps
}) {
  return (
    <button
      className={`
      ${inverted ? "inverted" : ""} 
      ${isGoogleSignIn ? "google-sign-in" : ""}
      ${addedCart ? "cart-added" : ""}
      ${searchButton ? "search-button" : ""}
      ${adminButton ? "admin-button" : ""}  
      ${selectedAdmin ? "selected-admin-button" : ""}
      ${pageButton ? "page-number_button" : ""}
      custom-button
      `}
      {...otherProps}
    >
      {children}
    </button>
  );
}
