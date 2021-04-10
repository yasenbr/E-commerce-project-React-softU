import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";
import { cart } from "react-icons-kit/entypo/cart";
import { Navibar } from "./Navbar";
import { ProductsContext } from "../global/ProductContext";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Icon } from "react-icons-kit";
import "../css/ProductDetail.css";
// import { db } from "../config/config";

export const ProductDetail = ({ user, type, userId }) => {
  const productId = window.location.pathname.slice(16);
  const productList = [];
  const { products } = useContext(ProductsContext);

  const { dispatch } = useContext(CartContext);
  products.forEach((product) => {
    console.log(product);
    if (product.ProductID === productId) {
      productList.push(product);
    }
  });

  return (
    <div>
      <Navibar user={user} type={type} userId={userId} />
      <div className="pt-5 mt-5 mb-5">
        <div className="container">
          <h1 className="text-center">Product Detail</h1>
        </div>
      </div>
      <br />
      <br />
      {products.length === 0 && (
        <div>connection problem...no product to display</div>
      )}
      {productList.map((product) => (
        <div className="container">
          <Card className="mb-5 z-depth-1-half">
            <div className="row">
              <div className="col-md-4">
                <Card.Img src={product.ProductImage} />
              </div>

              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>{product.ProductName}</Card.Title>
                  <hr />
                  <Card.Text>
                    <h6>Description:</h6>
                  </Card.Text>
                  <Card.Text>{product.ProductDescription}</Card.Text>
                  <Button
                    variant="primary"
                    className="z-depth-1-half btn-mt"
                    onClick={() => {
                      if (!user) {
                        toast.error(
                          "You need to login or register to add to cart",
                          {
                            position: "bottom-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                          }
                        );
                      } else {
                        dispatch({
                          type: "ADD_TO_CART",
                          id: product.ProductID,
                          product,
                        });
                      }
                    }}
                  >
                    <Icon icon={cart} className="addCartIcone" />
                    Add to cart
                  </Button>
                </Card.Body>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
