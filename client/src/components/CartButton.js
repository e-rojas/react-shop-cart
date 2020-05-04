import React from "react";

export default function CartButton({items}) {
  return (
    <>
      <button type="button" className="btn btn-primary">
        <i className="fas fa-shopping-cart"></i>{" "}
        <span className="badge badge-light"> {items} </span>
      </button>
    </>
  );
}
