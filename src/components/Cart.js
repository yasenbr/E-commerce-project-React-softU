import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";
import { Navibar } from "./Navbar";
import { Icon } from "react-icons-kit";
import { Link } from "react-router-dom";
import "../css/Cart.css";

export const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(
    CartContext
  );

  return (
    <>
      <Navibar user={user} />
      <>
        {shoppingCart.length !== 0 && <h1>Cart</h1>}
        <div className="cart-container">
          {shoppingCart.length === 0 && (
            <>
              <div>
                no items in your cart or slow internet causing trouble (Refresh
                the page) or you are not logged in
              </div>
              <div>
                <Link to="/">Return to Home page</Link>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div className="cart-card" key={cart.ProductID}>
                <div className="cart-img">
                  <img src={cart.ProductImg} alt="not found" />
                </div>

                <div className="cart-name">{cart.ProductName}</div>

                <div className="cart-price-orignal">
                  Rs {cart.ProductPrice}.00
                </div>

                <div
                  className="inc"
                  onClick={() =>
                    dispatch({ type: "INC", id: cart.ProductID, cart })
                  }
                >
                  <Icon icon={"ic_add"} size={24} />
                </div>

                <div className="quantity">{cart.qty}</div>

                <div
                  className="dec"
                  onClick={() =>
                    dispatch({ type: "DEC", id: cart.ProductID, cart })
                  }
                >
                  <Icon icon={"ic_remove"} size={24} />
                </div>

                <div className="cart-price">Rs {cart.TotalProductPrice}.00</div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch({ type: "DELETE", id: cart.ProductID, cart })
                  }
                >
                  <Icon icon={"iosTrashOutline"} size={24} />
                </button>
              </div>
            ))}
          {shoppingCart.length > 0 && (
            <div className="cart-summary">
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
                  className="btn btn-success btn-md"
                  style={{ marginTop: 5 + "px" }}
                >
                  Cash on delivery
                </button>
              </Link>
            </div>
          )}
        </div>
      </>
    </>
  );
};