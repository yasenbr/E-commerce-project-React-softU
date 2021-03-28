import React, { useContext, useEffect, useState } from "react";
import { Navibar } from "./Navbar";
import { auth, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { CartContext } from "../global/CartContext";
import { Container } from "react-bootstrap";

export const Cashout = (props) => {
  const history = useHistory();

  const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(
    CartContext
  );

  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccesMsg] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUserList")
          .doc(user.uid)
          .onSnapshot((snapshot) => {
            setName(snapshot.data().Name);
            setEamil(snapshot.data().Email);
          });
      } else {
        history.push("/login");
      }
    });
  });

  return (
    <>
      <Navibar user={props.user} />
      <>
        <Container className="mb-5">
          <div className="container">
            <br />
            <h2 className="text-center">Cashout Details</h2>
            <br />
            {successMsg && <div className="success-msg">{successMsg}</div>}
            <form
              autoComplete="off"
              className="form-group z-depth-1-half"
              onSubmit="{cashoutSubmit}
              "
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                required
                value={name}
                disabled
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                disabled
              />
              <br />
              <label htmlFor="Cell No">Cell No</label>
              <input
                type="number"
                className="form-control"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="eg 03123456789"
              />
              <br />
              <label htmlFor="Delivery Address">Delivery Address</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <br />
              <label htmlFor="Price To Pay">Price To Pay</label>
              <input
                type="number"
                className="form-control"
                required
                value={totalPrice}
                disabled
              />
              <br />
              <label htmlFor="Total No of Products">Total No of Products</label>
              <input
                type="number"
                className="form-control"
                required
                value={totalQty}
                disabled
              />
              <br />
              <button type="submit" className="btn btn-success btn-md mybtn">
                SUBMIT
              </button>
            </form>
            {error && <span className="error-msg">{error}</span>}
          </div>
        </Container>
      </>
    </>
  );
};
