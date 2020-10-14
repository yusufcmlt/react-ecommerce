import React from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart-actions";

import CustomButton from "../custom-button/CustomButton";
import "./CollectionItem-style.scss";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="item-details">
        <div className="name">{name}</div>
        <div className="price">${price}</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
