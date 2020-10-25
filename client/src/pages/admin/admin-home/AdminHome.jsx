import React, { useEffect } from "react";
import AdminTotal from "./AdminTotal";
import { connect } from "react-redux";

import "./AdminHome-style.scss";
import {
  selectCollectionCategoryCount,
  selectIsCollectionLoaded,
  selectCollectionItemsCount,
} from "../../../redux/shop/shop-selectors";
import { fetchCollectionsStartAsync } from "../../../redux/shop/shop-actions";

const AdminHome = ({
  categoryCount,
  fetchCollectionsStartAsync,
  isCollectionLoaded,
  itemsCount,
}) => {
  useEffect(() => {
    fetchCollectionsStartAsync();
    if (isCollectionLoaded) console.log(itemsCount);
  });
  return (
    <div className="dashboard-home-container">
      <h1 className="title">DASHBOARD HOME</h1>
      <div className="dashboard-home-content">
        <AdminTotal count={itemsCount} name="Items" />
        <AdminTotal count={categoryCount} name="Categories" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categoryCount: selectCollectionCategoryCount(state),
    isCollectionLoaded: selectIsCollectionLoaded(state),
    itemsCount: selectCollectionItemsCount(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
