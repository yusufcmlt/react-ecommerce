import React from "react";
import { updateItemToCollection } from "../../../firebase/firebase-utils";

const AdminItem = ({ imageUrl, name, price, category, id, fetchFunc }) => {
  const removeItem = async (categoryId, item) => {
    try {
      await updateItemToCollection(categoryId, item, "remove");
      alert(`${item.name} removed`);
      fetchFunc();
    } catch (error) {
      alert("Error Removing Item Check Console");
      console.log(error);
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
