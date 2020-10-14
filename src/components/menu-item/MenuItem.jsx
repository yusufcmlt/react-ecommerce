import React from "react";
import { withRouter } from "react-router-dom";

import "./MenuItem-style.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <div
      className={`menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <h1 className="title">{title.toUpperCase()}</h1>
    </div>
  );
};

export default withRouter(MenuItem);
