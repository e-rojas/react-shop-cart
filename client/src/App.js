import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./components/Card";
import menuData from "./db/data";
import BillItem from "./components/Bill_Item";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function App() {
  //cart items state
  const [items, setItems] = useState([]);
  //main menu loading data
  const [data, setData] = useState([]);

  const price = items
    .reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
    .toFixed(2);

  useEffect(() => {
    setData(menuData);
  }, []);
  //onclick addItems from cart
  const addItem = (cartItem) => {
    setItems([...items, cartItem]);
  };
  //onclik removeItem from cart
  const removeItem = (id) => {
    console.log("id:", id);
    setItems([...items.filter((item) => item.id !== id)]);
  };

  /* :::::::::      :::::::::::: */
  async function handleToken(token, address) {
    const response = await axios.post(
      "http://localhost:4000/checkout",{  token,
      items,
      price}
    );
    const { status } = response.data;
   
    if (status === "success") {
      setItems([])
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Somethin went wrong!!!", { type: "error" });
    }
  }

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          height: "calc(100vh - 76px)",
        }}
        className="row bg-warning"
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            height: "100%",
            overflowY: "auto",
          }}
          className="col-8 alert-info"
        >
          {data.map((meal) => {
            return <Card addItem={addItem} key={meal.id} {...meal} />;
          })}
        </div>
        <div className="col-4 pt-5">
          <div className="d-flex justify-content-center">
            {items.length > 0 && (
              <StripeCheckout
                token={handleToken}
                className="mb-3 "
                billingAddress
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={price * 100}
                
              />
            )}
          </div>
          <div className="card">
            <div className="card-header d-flex justify-content-end align-items-baseline">
              <i className="fas fa-shopping-cart mr-1"></i>
              <span className="badge badge-dark"> {items.length} </span>
            </div>
            <div className="card-body">
              <p className="card-text font-italic font-weight-bold">
                Your Items:
              </p>
              <hr />
              <ol>
                {items.map((item) => {
                  return (
                    <BillItem key={item.id} {...item} removeItem={removeItem} />
                  );
                })}
              </ol>
            </div>
            <div className="card-footer">
              <span className="font-weight-bolder">
                Total: ${" "}
                {items
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
