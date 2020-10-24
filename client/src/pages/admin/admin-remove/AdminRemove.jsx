import React from "react";
import "./AdminRemove-style.scss";

export default function AdminRemove() {
  return (
    <div className="dashboard-item-remove-container">
      <h1 className="title">REMOVE AN ITEM</h1>
      <label>Filter Items</label>
      <input className="remove-item-filter-input" />
      <div className="item-remove-header">
        <div className="header-block">
          <span>Image</span>
        </div>
        <div className="header-block">
          <span>Name</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
    </div>
  );
}
