import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop-selectors";

import CollectionItem from "../../components/collection-item/CollectionItem";

import "./Collection-style.scss";

const Collection = ({ collection }) => {
  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title.toUpperCase()}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    collection: selectCollection(ownProps.match.params.collectionId)(state),
  };
};

export default connect(mapStateToProps)(Collection);
