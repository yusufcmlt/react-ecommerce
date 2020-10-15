import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySection } from "../../redux/directory/directory-selectors";
import Billboard from "../homepage-billboard/Billboard";

import MenuItem from "../menu-item/MenuItem";
import "./Directory-style.scss";

const Directory = ({ sections }) => {
  return (
    <div className="directory-page">
      <Billboard />
      <h1>COLLECTIONS</h1>
      <div className="directory-menu">
        {sections.map(({ id, ...otherSectionProps }) => {
          return <MenuItem key={id} {...otherSectionProps} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection,
});

export default connect(mapStateToProps)(Directory);
