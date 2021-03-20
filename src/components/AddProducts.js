import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../config/config";

import { Navibar } from "./Navbar";
import { Alert } from "react-bootstrap";
import "../css/Login.css";

export const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [error, setError] = useState("");
  //allowed image type
  const types = ["image/png", "image/jpeg"];
  //image handler
  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImage(selectedFile);
      setError("");
    } else {
      setProductImage(null);
      setError("File type image should be png ot jpeg");
    }
  };
  //add product form
  const addProduct = (e) => {
    e.preventDefault();
    console.log(productName, productPrice, productImage, productDescription);

    //image storing
    const uploadProduct = storage
      .ref(`productImage/${productImage.name}`)
      .put(productImage);
    uploadProduct.on(
      "state_change",
      (snapshot) => {
        const progress = (snapshot.byteTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => setError(err.message),
      () => {
        storage
          .ref("productImage")
          .child(productImage.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("Products")
              .add({
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImage: url,
                ProductDescription: productDescription,
              })
              .then(() => {
                setProductName("");
                setProductPrice(0);
                setProductImage("");
                setProductDescription("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  return (
    <div>
      <Navibar />
      <div className="">
        <div className="container">
          <h4 className="title pt-5">Add product</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <Form className="z-depth-1-half login pt-5" onSubmit={addProduct}>
          <Form.Group className="from-group">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="productName"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Produc Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Product Price"
              name="productPrice"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Product Image"
              name="productImage"
              onChange={productImgHandler}
              id="file"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="productDescription"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="z-depth-1-half">
            Submit
          </Button>
          {error &
          (
            <div>
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
