import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectItemCategory } from "../../redux/shop/shop-selectors";

import "./CollectionItem-style.scss";

const CollectionItem = ({ item, history, itemCategory }) => {
  const { name, price, imageUrl } = item;

  return (
    <div
      className="collection-item"
      onClick={() =>
        history.push(
          `${process.env.PUBLIC_URL}/shop/${itemCategory}/${item.id}`
        )
      }
    >
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="item-details">
        <div className="name">{name}</div>
        <div className="price">${price}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  itemCategory: selectItemCategory(ownProps.item.name)(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   addItem: (item) => dispatch(addItem(item)),
// });

export default withRouter(connect(mapStateToProps)(CollectionItem));
