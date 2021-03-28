import React, { useContext } from "react";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
import { useHistory } from "react-router-dom";
import { auth } from "../config/config";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CartContext } from "../global/CartContext";
import logo from "../images/shopping-cart.svg";
import "../css/Navbar.css";

export const Navibar = ({ user, type }) => {
  const history = useHistory();
  const { totalQty } = useContext(CartContext);
  // handle logout
  const Logout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <span>
          <Link to="/" className="navbar-brand">
            <img src={logo} className="logo" alt="" />
          </Link>
        </span>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Products
            </Link>
            {type === "admin" && (
              <Nav>
                <Link to="/add-product" className="nav-link">
                  Add Product
                </Link>
              </Nav>
            )}
          </Nav>
          {!user && (
            <Nav>
              <Nav.Link href="/signup">SIGN UP</Nav.Link>
              <Nav.Link eventKey={2} href="/login">
                LOGIN
              </Nav.Link>
            </Nav>
          )}
          {user && (
            <Nav>
              <Nav.Link>{user}</Nav.Link>
              <span>
                <Link to="cartlist" className="mr-1 nav-link">
                  <Icon icon={cart} />
                  <span className="no-of-products">{totalQty}</span>
                </Link>
              </span>

              <Nav.Link
                className="btn btn-danger"
                eventKey={2}
                onClick={Logout}
              >
                LOGOUT
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
