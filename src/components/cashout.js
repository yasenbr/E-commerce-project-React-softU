import React, { useContext, useEffect, useState } from "react";
import { Navibar } from "./Navbar";
import { auth, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { CartContext } from "../global/CartContext";
import { Form, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { RelativeFooter } from "./RelativeFooter";

export const Cashout = (props) => {
  const history = useHistory();

  const { totalPrice, totalQty, dispatch } = useContext(
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

  const cashoutSubmit = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const date = new Date();
        const time = date.getTime();
        db.collection("BuyerInfo")
          .doc(user.uid + "_" + time)
          .set({
            BuyerId: user.uid,
            BuyerName: name,
            BuyerEmail: email,
            BuyerPhone: phone,
            BuyerAddress: address,
            BuyerPayment: totalPrice,
            BuyerQuantity: totalQty,
          })
          .then(() => {
            setPhone("");
            setAddress("");
            dispatch({ type: "EMPTY" });
            setSuccesMsg("Your order was registred successfully");

            window.location.reload(true);
            setTimeout(() => {
              history.push("/");
            }, 3000);
          })
          .catch((err) => setError(err.message));
      }
    });
  };

  return (
    <div>
      <Navibar user={props.user} type={props.type} userId={props.userId} />
      <div className="">
        <div className="container">
          <h1 className="text-center pt-5 mt-5 mb-5">Cash out</h1>
        </div>
      </div>
      <br />
      <br />
      <div className="container mb-5">
        <Form
          autoComplete="off"
          className="z-depth-1-half pt-5 login"
          onSubmit={cashoutSubmit}
        >
          {successMsg && (
            <div>
              <Alert variant="success mt-3 z-depth-1-half">{successMsg}</Alert>
            </div>
          )}
          <Form.Group className="from-group">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} required disabled />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required value={email} disabled />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="eg 03123456789"
            />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Price To Pay</Form.Label>
            <Form.Control type="number" required value={totalPrice} disabled />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Total Number of Products</Form.Label>
            <Form.Control type="number" required value={totalQty} disabled />
          </Form.Group>
          <Button variant="primary" type="submit" className="z-depth-1-half">
            Submit
          </Button>
          {error && (
            <div>
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
        </Form>
      </div>
      <RelativeFooter />
    </div>
  );
};
