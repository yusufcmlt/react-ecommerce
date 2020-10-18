import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import Collection from "../collection/Collection";
import ItemDetail from "../item-detail/ItemDetail";
import WithSpinner from "../../components/spinner/WithSpinner";

import {
  firestore,
  collectionsSnapshotToMap,
} from "../../firebase/firebase-utils";
import { updateCollections } from "../../redux/shop/shop-actions";

//Loading component while getting data from firestore
const CollectionsOverviewSpinner = WithSpinner(CollectionsOverview);
const CollectionSpinner = WithSpinner(Collection);
const ItemDetailSpinner = WithSpinner(ItemDetail);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    //Getting shop data from firebase to the redux.
    const collectionRef = firestore.collection("collections");
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        updateCollections(collectionsSnapshotToMap(snapshot));
        this.setState({ loading: false });
      }
    );
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId/:itemId`}
          render={(props) => (
            <ItemDetailSpinner isLoading={loading} {...props} />
          )}
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
