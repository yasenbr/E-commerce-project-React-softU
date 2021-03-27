import React, { useContext, useEffect } from "react";
import { CartContext } from "../global/CartContext";
import { Navibar } from "./Navbar";
import { Icon } from "react-icons-kit";
import { ic_add_circle } from "react-icons-kit/md/ic_add_circle";
import { ic_remove_circle } from "react-icons-kit/md/ic_remove_circle";
import { ic_delete_forever } from "react-icons-kit/md/ic_delete_forever";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { auth } from "../config/config";
import "../css/Cart.css";

export const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(
    CartContext
  );

  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  });
  return (
    <>
      <Navibar user={user} />
      <>
        {shoppingCart.length !== 0 && (
          <h1 className="text-center mt-5 mb-5">Cart</h1>
        )}
        <Container className="mb-5">
          <div className="cart-container">
            {shoppingCart.length === 0 && (
              <>
                <div>
                  no items in your cart or slow internet causing trouble
                  (Refresh the page) or you are not logged in
                </div>
                <div>
                  <Link to="/">Return to Home page</Link>
                </div>
              </>
            )}
            {shoppingCart &&
              shoppingCart.map((cart) => (
                <>
                  <div className="cart-card " key={cart.ProductID}>
                    <div className="cart-img">
                      <img src={cart.ProductImage} alt="not found" />
                    </div>

                    <div className="cart-name">{cart.ProductName}</div>

                    <div className="cart-price-orignal">
                      € {cart.ProductPrice}.00
                    </div>

                    <div
                      className="inc"
                      onClick={() =>
                        dispatch({ type: "INC", id: cart.ProductID, cart })
                      }
                    >
                      <Icon icon={ic_add_circle} size={24} />
                    </div>

                    <div className="quantity">{cart.qty}</div>

                    <div
                      className="dec"
                      onClick={() =>
                        dispatch({ type: "DEC", id: cart.ProductID, cart })
                      }
                    >
                      <Icon icon={ic_remove_circle} size={24} />
                    </div>

                    <div className="cart-price">
                      € {cart.TotalProductPrice}.00
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        dispatch({ type: "DELETE", id: cart.ProductID, cart })
                      }
                    >
                      <Icon icon={ic_delete_forever} size={24} />
                    </button>
                  </div>

                  <hr />
                </>
              ))}
            {shoppingCart.length > 0 && (
              <div className="cart-summary z-depth-1-half">
                <div className="cart-summary-heading">Cart-Summary</div>
                <div className="cart-summary-price">
                  <span>Total Price</span>
                  <span>{totalPrice}</span>
                </div>
                <div className="cart-summary-price">
                  <span>Total Qty</span>
                  <span>{totalQty}</span>
                </div>
                <Link to="cashout" className="cashout-link">
                  <button
                    className="btn btn-success btn-md z-depth-1-half"
                    style={{ marginTop: 5 + "px" }}
                  >
                    Cash on delivery
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </>
    </>
  );
};
