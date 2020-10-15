import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/CollectionItem";
import { selectSearchResultItems } from "../../redux/shop/shop-selectors";

import "./Search-style.scss";
const Search = ({ resultItems, match }) => {
  //console.log(resultItems);
  return (
    <div className="search-results-page">
      <h2 className="title">
        {resultItems.length ? (
          `SEARCH RESULTS FOR:"${match.params.searchQuery}"`
        ) : (
          <p>CAN'T FIND ANY ITEMS</p>
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
};

const mapStateToProps = (state, ownProps) => {
  const { searchQuery } = ownProps.match.params;
  return {
    resultItems: selectSearchResultItems(searchQuery)(state),
  };
};

export default connect(mapStateToProps)(Search);
