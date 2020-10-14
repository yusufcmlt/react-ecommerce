import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addItem } from "../../redux/cart/cart-actions";

import CustomButton from "../custom-button/CustomButton";
import "./CollectionItem-style.scss";

const CollectionItem = ({ item, addItem, history, match }) => {
  const { name, price, imageUrl } = item;

  return (
    <div
      className="collection-item"
      onClick={() => history.push(`${match.url}/${item.id}`)}
    >
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

export default withRouter(connect(null, mapDispatchToProps)(CollectionItem));
