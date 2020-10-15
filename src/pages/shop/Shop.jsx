import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import Collection from "../collection/Collection";

import ItemDetail from "../item-detail/ItemDetail";

const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={Collection}
      />
      <Route
        path={`${match.path}/:collectionId/:itemId`}
        component={ItemDetail}
      />
    </div>
  );
};

export default ShopPage;
