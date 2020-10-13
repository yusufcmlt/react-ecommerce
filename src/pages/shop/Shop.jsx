import React from "react";

import CollectionPreview from "../../components/collection-preview/CollectionPreview";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop-selectors.js";

const ShopPage = (props) => {
  return (
    <div className="shop-page">
      {props.collections.map(({ id, ...otherCollectionProps }) => {
        return <CollectionPreview key={id} {...otherCollectionProps} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPage);
