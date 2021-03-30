import React, { useContext } from "react";
import { ProductsContext } from "../global/ProductContext";
import { CartContext } from "../global/CartContext";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import "../css/Products.css";

export const Products = ({ user }) => {
  const { products } = useContext(ProductsContext);

  const { dispatch } = useContext(CartContext);
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
            <Col xs lg="4">
              <Card
                style={{ width: "18rem" }}
                className="z-depth-1-half mt-5"
                key={product.ProductID}
                id={product.ProductID}
              >
                <Card.Img variant="top" src={product.ProductImage} />
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
