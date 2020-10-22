import React from "react";
import Directory from "../../components/directory/Directory";
import Billboard from "../../components/homepage-billboard/Billboard";

import "./HomePage-style.scss";
const Homepage = () => {
  return (
    <div className="homepage">
      <Billboard />
      <Directory />
    </div>
  );
};

export default Homepage;
