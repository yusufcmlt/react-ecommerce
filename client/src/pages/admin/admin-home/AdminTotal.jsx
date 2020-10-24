import React from "react";

export default function AdminTotal({ itemCount, name }) {
  return (
    <div className="dashboard-total">
      <span className="name">{name}</span>
      <span className="count">{itemCount}</span>
    </div>
  );
}
