import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/CollectionItem";
import {
  selectIsCollectionLoaded,
  selectSearchResultItems,
} from "../../redux/shop/shop-selectors";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions";

import "./Search-style.scss";

class Search extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, resultItems, isCollectionFetching } = this.props;
    console.log(isCollectionFetching);

    return (
      <div className="search-results-page">
        <h2 className="title">
          {resultItems.length ? (
            `SEARCH RESULTS FOR:"${match.params.searchQuery}"`
          ) : !isCollectionFetching ? (
            <p>Searching...</p>
          ) : (
            <p>CAN'T FIND ANY ITEMS WITH "{match.params.searchQuery}"</p>
          )}
        </h2>
        <div className="items">
          {resultItems.length
            ? resultItems.map((item) => (
                <CollectionItem key={item.id} item={item} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { searchQuery } = ownProps.match.params;
  return {
    resultItems: selectSearchResultItems(searchQuery)(state),
    isCollectionLoaded: selectIsCollectionLoaded(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
