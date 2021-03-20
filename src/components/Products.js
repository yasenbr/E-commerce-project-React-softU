import React, { useContext } from "react";
import { ProductsContext } from "../global/ProductContext";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import "../css/Products.css";

export const Products = () => {
  const { products } = useContext(ProductsContext);
  console.log(products);
  return (
    <>
      {products.length !== 0 && <h1 className="text-center mt-5">Products</h1>}
      <Container>
        <Row>
          {products.length === 0 && (
            <div>connection problem...no products to display</div>
          )}
          {products.map((product) => (
            <Col>
              <Card
                style={{ width: "18rem" }}
                className="z-depth-1-half mt-5"
                key={product.ProductId}
              >
                <Card.Img variant="top" src={product.ProductImage} />
                <Card.Body>
                  <Card.Title>{product.ProductName}</Card.Title>
                  <Card.Text>{product.ProductDescription}</Card.Text>
                  <Button variant="primary" className="z-depth-1-half">
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
