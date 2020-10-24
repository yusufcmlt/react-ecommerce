import React, { useState } from "react";
import CustomButton from "../../../components/custom-button/CustomButton";

import "./AdminAdd-style.scss";

const AdminAdd = () => {
  const [itemSpecs, setItemSpecs] = useState({
    category: "",
    name: "",
    imageUrl: "",
    price: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setItemSpecs({ ...itemSpecs, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="dashboard-add-item-container">
      <h1 className="title">ADD NEW ITEM</h1>
      <form className="dashboard-add-item-form" onSubmit={handleSubmit}>
        <label>Item Category</label>
        <select
          className="item-add-input"
          name="category"
          onChange={handleChange}
        >
          <option>Hats</option>
          <option>Jackets</option>
          <option>Sneakers</option>
          <option>Womens</option>
          <option>Mens</option>
        </select>
        <label>Item Name</label>
        <input
          className="item-add-input"
          name="name"
          type="text"
          onChange={handleChange}
        />
        <label>Item Price</label>
        <input
          className="item-add-input"
          name="price"
          type="text"
          onChange={handleChange}
        />
        <label>Item Image Url</label>
        <input
          className="item-add-input"
          name="imageUrl"
          type="text"
          onChange={handleChange}
        />
        <CustomButton>ADD NEW ITEM</CustomButton>
      </form>
    </div>
  );
};
export default AdminAdd;
