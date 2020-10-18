import React from "react";

import "./WithSpinner-style.scss";
//Higher order component with loading animation before getting data from firestore
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
