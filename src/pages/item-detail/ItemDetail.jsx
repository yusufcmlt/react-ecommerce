import React from "react";
import { connect } from "react-redux";
import { selectItemDetail } from "../../redux/shop/shop-selectors";

import { addItem } from "../../redux/cart/cart-actions";

import CustomButton from "../../components/custom-button/CustomButton";
import "./ItemDetail-style.scss";
import LOREM_TEXT from "./loremtext";

const ItemDetail = ({ item, addItem }) => {
  return (
    <div className="detail-page">
      <div className="item-image-container">
        <div
          className="image"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        />
      </div>
      <div className="item-details-container">
        <h1 className="item-name">{item.name}</h1>
        <p className="item-description">{LOREM_TEXT}</p>
        <p className="item-specs">Size: Med </p>
        <p className="item-specs">Color: Orange </p>
        <p className="item-price">${item.price}</p>
        <CustomButton addedCart onClick={() => addItem(item)}>
          ADD TO CART
        </CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { collectionId, itemId } = ownProps.match.params;
  return {
    item: selectItemDetail(collectionId, itemId)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
