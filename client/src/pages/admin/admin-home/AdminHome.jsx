import React from "react";
import AdminTotal from "./AdminTotal";
import { connect } from "react-redux";

import "./AdminHome-style.scss";
import {
  selectCollectionCategoryCount,
  selectCollectionItemsCount,
} from "../../../redux/shop/shop-selectors";

const AdminHome = ({ categoryCount, itemsCount }) => {
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
    itemsCount: selectCollectionItemsCount(state),
  };
};

export default connect(mapStateToProps)(AdminHome);
