import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import Collection from "../collection/Collection";
import ItemDetail from "../item-detail/ItemDetail";

import {
  firestore,
  collectionsSnapshotToMap,
} from "../../firebase/firebase-utils";
import { updateCollections } from "../../redux/shop/shop-actions";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    //Getting shop data from firebase to the redux.
    const collectionRef = firestore.collection("collections");
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) =>
      updateCollections(collectionsSnapshotToMap(snapshot))
    );
  }
  render() {
    const { match } = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionsMap) =>
      dispatch(updateCollections(collectionsMap)),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
