import React from "react";

import CustomButton from "../custom-button/CustomButton";
import "./Billboard-style.scss";
export default function Billboard() {
  return (
    <div className="billboard-container">
      <div className="search-container">
        <p className="name wear">WEAR.</p>
        <p className="name somtn">SOMTN.</p>
        <form className="search-form">
          <label>Search for clothes.</label>
          <div className="search-bar">
            <input
              type="search"
              className="billboard-search"
              required
              placeholder="Sneakers,jackets,hats..."
            />
            <CustomButton>Search</CustomButton>
          </div>
        </form>
        <p className="suggestion">or check out collections below.</p>
      </div>
      <div className="image-container" />
    </div>
  );
}
