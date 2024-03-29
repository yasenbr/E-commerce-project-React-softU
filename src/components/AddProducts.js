import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { storage, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Navibar } from "./Navbar";
import { Footer } from "./Footer";
import { Alert } from "react-bootstrap";
import "../css/Login.css";

export const AddProducts = ({ user, type }) => {
  const history = useHistory();
  console.log(user, type);
  if (user) {
    if (type !== "admin") {
      history.push("/");
    }
  } else if (user === null) {
    history.push("/");
  }
  const [productCategories, setProductCategories] = useState();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
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
    // console.log(productName, productPrice, productImage, productDescription);

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
                productCategories: productCategories,
                ProductName: productName,
                ProductPrice: Number(productPrice),
                ProductImage: url,
                ProductDescription: productDescription,
              })
              .then(() => {
                setProductCategories("");
                setProductName("");
                setProductPrice("");
                setProductImage("");
                setProductDescription("");
                setError("");
                document.getElementById("file").value = "";
              })
              .catch((err) => setError(err.message));
            toast.success("Document successfully Add!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
          });
      }
    );
  };

  return (
    <div>
      <Navibar user={user} type={type} />
      <div className="">
        <div className="container">
          <h1 className="text-center pt-5 mt-5 mb-5">Add product</h1>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <Form className="z-depth-1-half login pt-5" onSubmit={addProduct}>
          <Form.Label>Product Categorie</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="productCategories"
            value={productCategories}
            onChange={(e) => setProductCategories(e.target.value)}
          >
            <option>Select the categorie</option>
            <option value="shoes">shoes</option>
            <option value="TV">TV</option>
            <option value="Toys">Toys</option>
          </Form.Select>
          <Form.Group className="from-group">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="productName"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              required
            />
          </Form.Group>
          <Form.Group className="from-group">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Product Price"
              name="productPrice"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              required
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
              required
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
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="z-depth-1-half mt-5"
          >
            Add Product
          </Button>
          {error && (
            <div>
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
        </Form>
      </div>
      <Footer />
    </div>
  );
};
