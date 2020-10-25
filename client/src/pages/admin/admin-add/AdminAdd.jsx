import React, { useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../../../components/custom-button/CustomButton";
import { selectCollectionKeys } from "../../../redux/shop/shop-selectors";
import { Admin } from "../Admin";

import "./AdminAdd-style.scss";

const AdminAdd = ({ itemCategories }) => {
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
          {itemCategories.map((category) => (
            <option>{category.toUpperCase()}</option>
          ))}
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

const mapStateToProps = (state) => ({
  itemCategories: selectCollectionKeys(state),
});
export default connect(mapStateToProps)(AdminAdd);
