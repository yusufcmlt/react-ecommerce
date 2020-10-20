import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import Collection from "../collection/Collection";
import ItemDetail from "../item-detail/ItemDetail";
import WithSpinner from "../../components/spinner/WithSpinner";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions";
import { selectIsCollectionLoaded } from "../../redux/shop/shop-selectors";

//Loading component while getting data from firestore
const CollectionsOverviewSpinner = WithSpinner(CollectionsOverview);
const CollectionSpinner = WithSpinner(Collection);
const ItemDetailSpinner = WithSpinner(ItemDetail);

const ShopPage = ({
  fetchCollectionsStartAsync,
  match,
  isCollectionLoaded,
}) => {
  useEffect(() => {
    fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewSpinner
            isLoading={!isCollectionLoaded}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionSpinner isLoading={!isCollectionLoaded} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId/:itemId`}
        render={(props) => (
          <ItemDetailSpinner isLoading={!isCollectionLoaded} {...props} />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: selectIsCollectionLoaded,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
