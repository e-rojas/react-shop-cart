import React from "react";

export default function Card({ name, price, img, addItem }) {
  //Random id generator
  const ID = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  return (
    <>
      <div style={{ width: "17em", margin: "10px" }} className="card">
        <img
          style={{ height: "200px", width: "200px", margin: "0 auto" }}
          className="card-img-top"
          src={img}
          alt="food"
        />
        <div className="card-body">
          <h4 className="card-title lead small font-weight-bold"> {name}</h4>
          <span> ${price} </span>
          <div className="text-right">
            <button
              onClick={() => addItem({ name, id: ID(), price, img })}
              type="button"
              className="btn btn-primary btn-sm "
            >
              <i className="far fa-plus-square"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
