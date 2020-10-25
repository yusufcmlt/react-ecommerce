import React from "react";

export default function AdminTotal({ count, name }) {
  return (
    <div className="dashboard-total">
      <span className="name">{name}</span>
      <span className="count">{count}</span>
    </div>
  );
}
