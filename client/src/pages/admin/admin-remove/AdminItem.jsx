import React from "react";
import { updateItemToCollection } from "../../../firebase/firebase-utils";

const AdminItem = ({ imageUrl, name, price, category, id, fetchFunc }) => {
  const removeItem = async (categoryId, { id, imageUrl, name, price }) => {
    if (window.confirm(`Do you really want to remove item: ${name}`)) {
      try {
        await updateItemToCollection(
          categoryId,
          { id, imageUrl, name, price: price.toString() },
          "remove"
        );
        alert(`${name} removed`);
        fetchFunc();
      } catch (error) {
        alert("Error Removing Item Error,Check Console ");
        console.log(error);
      }
    }
  };

  return (
    <div className="admin-item">
      <div className="item-spec">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="item-spec">{name}</span>
      <span className="item-spec">{category.name}</span>
      <span className="item-spec">${price}</span>
      <div
        className="item-spec remove"
        onClick={() => removeItem(category.dbid, { id, imageUrl, name, price })}
      >
        &#10006;
      </div>
    </div>
  );
};

export default AdminItem;
