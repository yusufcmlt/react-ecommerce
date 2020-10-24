import React from "react";
import AdminTotal from "./AdminTotal";

import "./AdminHome-style.scss";

export const AdminHome = () => {
  return (
    <div className="dashboard-home-container">
      <h1 className="title">DASHBOARD HOME</h1>
      <div className="dashboard-home-content">
        <AdminTotal itemCount="25" name="Items" />
        <AdminTotal itemCount="5" name="Categories" />
      </div>
    </div>
  );
};
