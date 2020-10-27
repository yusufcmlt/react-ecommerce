import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import CustomButton from "../../../components/custom-button/CustomButton";
import { updateItemToCollection } from "../../../firebase/firebase-utils";
import { selectCollectionKeys } from "../../../redux/shop/shop-selectors";

import "./AdminAdd-style.scss";

const AdminAdd = ({ itemCategories, fetchFunc }) => {
  const [itemSpecs, setItemSpecs] = useState({
    category: "",
    name: "",
    imageUrl: "",
    price: "",
    id: "",
  });

  //Setting first select option as state for initial state
  useEffect(() => {
    if (itemCategories)
      setItemSpecs({
        ...itemSpecs,
        id: uuidv4(),
        category: itemCategories[0] ? itemCategories[0].collectionKey : [],
      });
  }, [itemCategories]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setItemSpecs({ ...itemSpecs, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { category, name, imageUrl, price, id } = itemSpecs;
    try {
      await updateItemToCollection(
        category,
        { name, imageUrl, price, id },
        "add"
      );
      alert("Item Added");
      fetchFunc();
      setItemSpecs({
        ...itemSpecs,
        name: "",
        imageUrl: "",
        price: "",
        id: "",
      });
    } catch (error) {
      console.log(error);
    }
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
          {itemCategories.map((category, index) => (
            <option
              key={category.collectionKey}
              name="category"
              value={category.collectionKey}
            >
              {category.collectionName.toUpperCase()}
            </option>
          ))}
        </select>
        <label>Item Name</label>
        <input
          className="item-add-input"
          name="name"
          type="text"
          value={itemSpecs.name}
          onChange={handleChange}
          required
        />
        <label>Item Price</label>
        <input
          className="item-add-input"
          name="price"
          type="number"
          min="0"
          value={itemSpecs.price}
          onChange={handleChange}
          required
        />
        <label>Item Image Url</label>
        <input
          className="item-add-input"
          name="imageUrl"
          type="url"
          value={itemSpecs.imageUrl}
          onChange={handleChange}
          required
        />
        <CustomButton>ADD NEW ITEM</CustomButton>
      </form>
      <div
        className="dashboard-image-container"
        style={{ backgroundImage: `url(${itemSpecs.imageUrl})` }}
      >
        <span className="dashboard-image-preview">IMAGE PREVIEW</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemCategories: selectCollectionKeys(state),
});

export default connect(mapStateToProps)(AdminAdd);
