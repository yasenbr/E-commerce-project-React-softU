import React, { useContext } from "react";
import { ProductsContext } from "../global/ProductContext";
import { CartContext } from "../global/CartContext";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../config/config";

import { Icon } from "react-icons-kit";

import { ic_delete_forever } from "react-icons-kit/md/ic_delete_forever";
import "../css/Products.css";

export const Products = ({ user, type }) => {
  const { products } = useContext(ProductsContext);
  let message = "you can only consult to add to cart you need to be logged in";
  const { dispatch } = useContext(CartContext);

  return (
    <>
      {products.length !== 0 && (
        <h1 className="text-center pt-5 mt-5 mb-5">Products</h1>
      )}

      <Container className="mb-5">
        <div className="row">
          {!user && (
            <div>
              <Alert variant="warning mt-3 z-depth-1-half">{message}</Alert>
            </div>
          )}
        </div>
        <Row>
          {products.length === 0 && (
            <div>connection problem...no products to display</div>
          )}
          {products.map((product) => (
            <Col xs lg="4">
              <Card
                style={{ width: "18rem" }}
                className="z-depth-1-half mt-5"
                key={product.ProductID}
                id={product.ProductID}
              >
                <Card.Img variant="top" src={product.ProductImage} />
                {type === "admin" && (
                  <Link
                    to={`/delete/${product.ProductID}`}
                    className=" btn-warning btn-warning-gradient btn-round btn-floating  btn-action el-margin-left  card-2"
                    onClick={db
                      .collection("Products")
                      .doc(product.ProductID)
                      .delete()
                      .then(() => {
                        console.log("Document successfully deleted!");
                      })
                      .catch((error) => {
                        console.error("Error removing document: ", error);
                      })}
                  >
                    <Icon icon={ic_delete_forever} size={24} />
                  </Link>
                )}

                <Card.Body>
                  <Card.Title>{product.ProductName}</Card.Title>
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
                        return;
                      } else {
                        dispatch({
                          type: "ADD_TO_CART",
                          id: product.ProductID,
                          product,
                        });
                      }
                    }}
                  >
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
