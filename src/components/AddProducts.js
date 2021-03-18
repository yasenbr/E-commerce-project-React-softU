import React from "react";
import { Form, Button } from "react-bootstrap";

import { Navibar } from "./Navbar";
// import { Alert } from "react-bootstrap";
import "../css/Login.css";

export const AddProducts = () => {
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
        <Form className="z-depth-1-half login pt-5">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Produc Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Produc Price</Form.Label>
            <Form.Control type="number" placeholder="Product Price" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Product Image</Form.Label>
            <Form.Control type="number" placeholder="Product Image" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="primary" type="submit" className="z-depth-1-half">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
