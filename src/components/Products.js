import React, { useContext, useState } from "react";
import { ProductsContext } from "../global/ProductContext";
import { CartContext } from "../global/CartContext";
import { cart } from "react-icons-kit/entypo/cart";
import "../css/Products.css";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { db } from "../config/config";
import  {deleteElement} from "../services/productServices";

import { Icon } from "react-icons-kit";

import { ic_delete_forever } from "react-icons-kit/md/ic_delete_forever";
import { ic_info } from "react-icons-kit/md/ic_info";

export const Products = ({ user, type }) => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const [category, setCategory] = useState("All");
  const categories = ["All", "Shoes", "TV", "Toys"];
  const productsList = [];

  
  console.log(category);
  console.log(products);

  function handleRemove(id) {
    deleteElement(id);
  }

  products.forEach((element) => {
    if (category !== "All") {
      if (element.ProductCategories === category) {
        productsList.push(element);
      }
    } else {
      productsList.push(element);
    }
  });

  return (
    <>
      {products.length !== 0 && (
        <h1 className="text-center pt-5 mt-5 mb-5">Products</h1>
      )}

      <Container className="mb-5 mx-auto" style={{ maxWidth: 1220 }}>
        <Row>
          <div className="categoriesList">
            {categories.map((categorie) => (
              <Button
                variant="outline-info"
                className="btn-custom"
                value={categorie}
                onClick={(e) => setCategory(e.target.value)}
              >
                {categorie}
              </Button>
            ))}
          </div>
        </Row>
        <Row>
          {products.length === 0 && (
            <div>connection problem...no products to display</div>
          )}
          {productsList.map((product) => (
            <Col md="2">
              <Card
                style={{ width: "5 rem" }}
                className="z-depth-1-half  custom-ml-mt"
                key={product.ProductID}
                id={product.ProductID}
              >
                <div className="">
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
                <Card.Body className="text-center">
                  <Card.Title className="products__title">
                    {product.ProductName}
                  </Card.Title>
                  {/* <hr /> */}
                  {/* <Card.Text>
                    <h6>Description:</h6>
                  </Card.Text> */}
                  {/* <Card.Text>{product.ProductDescription}</Card.Text> */}
                  <hr />
                  <Card.Text className="text-center">
                    <div variant="primary" className="price">
                      {product.ProductPrice} €
                    </div>
                  </Card.Text>
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
