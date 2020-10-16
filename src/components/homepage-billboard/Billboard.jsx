import React from "react";

import CustomButton from "../custom-button/CustomButton";
import "./Billboard-style.scss";
import { withRouter } from "react-router-dom";

class Billboard extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(
      `${process.env.PUBLIC_URL}/search/${this.state.searchValue}`
    );
  };

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    return (
      <div className="billboard-container">
        <div className="search-container">
          <p className="name wear">WEAR.</p>
          <p className="name somtn">SOMTN.</p>
          <form
            className="search-form"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <label>Search for clothes.</label>
            <div className="search-bar">
              <input
                className="billboard-search"
                type="search"
                name="searchBar"
                value={this.state.searchValue}
                onChange={this.handleChange}
                placeholder="Sneakers,jackets,hats..."
                required
              />
              <CustomButton type="submit">Search</CustomButton>
            </div>
          </form>
          <p className="suggestion">or check out collections below.</p>
        </div>
        <div className="image-container" />
      </div>
    );
  }
}

export default withRouter(Billboard);
