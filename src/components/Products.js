import React, { useContext } from "react";
import { ProductsContext } from "../global/ProductContext";
import { CartContext } from "../global/CartContext";
import { cart } from "react-icons-kit/entypo/cart";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { db } from "../config/config";

import { Icon } from "react-icons-kit";

import { ic_delete_forever } from "react-icons-kit/md/ic_delete_forever";
import { ic_info } from "react-icons-kit/md/ic_info";
import "../css/Products.css";

export const Products = ({ user, type }) => {
  const { products } = useContext(ProductsContext);
  // let message = "you can only consult to add to cart you need to be logged in";
  const { dispatch } = useContext(CartContext);

  function handleRemove(id) {
    console.log(id);
    db.collection("Products")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <>
      {products.length !== 0 && (
        <h1 className="text-center pt-5 mt-5 mb-5">Products</h1>
      )}

      <Container className="mb-5">
        <Row>
          {products.length === 0 && (
            <div>connection problem...no products to display</div>
          )}
          {products.map((product) => (
            <Col xs lg="3">
              <Card
                style={{ width: "15 rem" }}
                className="z-depth-1-half  custom-ml-mt"
                key={product.ProductID}
                id={product.ProductID}
              >
                <div className=" el-card-overlay">
                  <Card.Img variant="top" src={product.ProductImage} />
                </div>
                {type === "admin" && (
                  <Link
                    className=" btn-warning btn-warning-gradient btn-round btn-floating  btn-action el-margin-left  card-2"
                    onClick={() => handleRemove(product.ProductID)}
                  >
                    <Icon icon={ic_delete_forever} size={24} />
                  </Link>
                )}
                {type === "client" && (
                  <Link
                    to={`/product-detail/${product.ProductID}`}
                    className=" btn-warning btn-warning-gradient btn-round btn-floating  btn-action el-margin-left  card-2"
                  >
                    <Icon icon={ic_info} size={24} />
                  </Link>
                )}
                <Card.Body>
                  <Card.Title className="h6">{product.ProductName}</Card.Title>
                  <hr />
                  <Card.Text>
                    <h6>Description:</h6>
                  </Card.Text>
                  <Card.Text>{product.ProductDescription}</Card.Text>
                  <hr />
                  <Button
                    variant="primary"
                    className="z-depth-1-half"
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
                  <div variant="primary" className="price">
                    {product.ProductPrice} €
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
