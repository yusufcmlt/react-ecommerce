import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CustomButton from "../../components/custom-button/CustomButton";
import AdminAdd from "./admin-add/AdminAdd";
import AdminHome from "./admin-home/AdminHome";
import AdminRemove from "./admin-remove/AdminRemove";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions";

import "./Admin-style.scss";

const Admin = ({ fetchCollectionsStartAsync }) => {
  const [adminSection, setAdminSection] = useState("home");

  useEffect(() => {
    fetchCollectionsStartAsync();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-content-container">
        <div className="admin-sidebar">
          <h1 className="title">DASHBOARD</h1>
          <CustomButton
            onClick={() => {
              setAdminSection("home");
            }}
            adminButton
            selectedAdmin={adminSection === "home"}
          >
            HOME
          </CustomButton>
          <CustomButton
            onClick={() => {
              setAdminSection("add");
            }}
            adminButton
            selectedAdmin={adminSection === "add"}
          >
            ADD NEW ITEM
          </CustomButton>
          <CustomButton
            onClick={() => {
              setAdminSection("remove");
            }}
            adminButton
            selectedAdmin={adminSection === "remove"}
          >
            REMOVE ITEM
          </CustomButton>
          <CustomButton
            onClick={() => {
              fetchCollectionsStartAsync();
            }}
            adminButton
          >
            REFRESH ITEMS LIST
          </CustomButton>
        </div>
        <div className="admin-content-detail">
          {adminSection === "home" ? (
            <AdminHome />
          ) : adminSection === "add" ? (
            <AdminAdd fetchFunc={fetchCollectionsStartAsync} />
          ) : (
            <AdminRemove fetchFunc={fetchCollectionsStartAsync} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
