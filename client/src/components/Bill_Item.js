import React from "react";

export default function Bill_Item({ name, price, id, removeItem }) {
  return (
    <>
      <li>
        <span> {name} </span>
        <div className="d-flex align-items-baseline justify-content-between">
          <span>$ {price} </span>
          <button
            onClick={() => removeItem(id)}
            className="btn btn-outline-info btn-sm"
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
        <p className="text-center">- - - - - - - - - </p>
      </li>
    </>
  );
}
