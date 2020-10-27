import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CustomButton from "../../../components/custom-button/CustomButton";
import { selectAdminItems } from "../../../redux/shop/shop-selectors";
import AdminItem from "./AdminItem";

import "./AdminRemove-style.scss";

const AdminRemove = ({ adminItems, fetchFunc }) => {
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredItems, setFilteredItems] = useState([...adminItems]);
  const [filterQueries, setFilterQueries] = useState({
    nameQuery: "",
    categoryQuery: "",
  });
  const [sortOrders, setSortOrders] = useState({
    name: 1,
    price: 1,
  });

  //getting page numbers
  useEffect(() => {
    setPageCount(Math.ceil(filteredItems.length / 10));
  }, [filteredItems]);

  //Filtering items by category and name.
  //Two filter inputs can be used at the same time.
  useEffect(() => {
    const { nameQuery, categoryQuery } = filterQueries;
    setFilteredItems(
      adminItems.filter(
        (item) =>
          item.name.toLowerCase().includes(nameQuery) &&
          item.category.name.toLowerCase().includes(categoryQuery)
      )
    );
  }, [filterQueries, adminItems]);

  //Setting filter queries for category and name properties
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterQueries({ ...filterQueries, [name]: value.toLowerCase() });
    setPageNumber(1);
  };

  //Dynamic sorting list items
  const handleSort = (sortOrder, sortBy) => {
    let copyFiltered = [...filteredItems];
    copyFiltered.sort((firstItem, secondItem) => {
      if (firstItem[sortBy] < secondItem[sortBy]) {
        return -1 * sortOrder;
      } else if (firstItem[sortBy] > secondItem[sortBy]) {
        return 1 * sortOrder;
      } else return 0 * sortOrder;
    });
    setPageNumber(1);
    setFilteredItems([...copyFiltered]);
    setSortOrders({ ...sortOrders, [sortBy]: sortOrder * -1 });
  };
  return (
    <div className="dashboard-item-remove-container">
      <h1 className="title">REMOVE AN ITEM</h1>
      <div className="filters-container">
        <span className="filter">
          <label>Filter Items by Name</label>
          <input
            className="remove-item-filter-input"
            name="nameQuery"
            onChange={handleChange}
          />
        </span>
        <span>
          <label>Page</label>
          <h2>{pageNumber}</h2>
        </span>
        <span className="filter">
          <label>Filter Items by Category</label>
          <input
            className="remove-item-filter-input"
            name="categoryQuery"
            onChange={handleChange}
          />
        </span>
      </div>

      <div className="item-remove-header">
        <div className="header-block">
          <span>Image</span>
        </div>
        <div className="header-block">
          <span
            onClick={() => {
              handleSort(sortOrders.name, "name");
            }}
          >
            Name
            {sortOrders.name > 0 ? (
              <span className="sort-icon">&#10094;</span>
            ) : (
              <span className="sort-icon">&#10095;</span>
            )}
          </span>
        </div>
        <div className="header-block">
          <span>Category</span>
        </div>
        <div className="header-block">
          <span
            onClick={() => {
              handleSort(sortOrders.price, "price");
            }}
          >
            Price
            {sortOrders.price > 0 ? (
              <span className="sort-icon">&#10094;</span>
            ) : (
              <span className="sort-icon">&#10095;</span>
            )}
          </span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {filteredItems
        .filter(
          (item, index) =>
            index >= (pageNumber - 1) * 10 && index < pageNumber * 10
        )
        .map((item) => (
          <AdminItem
            key={item.category.name + item.id}
            {...item}
            fetchFunc={fetchFunc}
          />
        ))}
      <div className="buttons-container">
        {
          //Creating empty array for creating custom buttons for pages
          [...Array(pageCount)].map((item, index) => (
            <CustomButton
              key={index}
              pageButton
              onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                setPageNumber(index + 1);
              }}
              href="#top"
            >
              {index + 1}
            </CustomButton>
          ))
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  adminItems: selectAdminItems(state),
});

export default connect(mapStateToProps)(AdminRemove);
