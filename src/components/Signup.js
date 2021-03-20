import React from "react";

import { Form, Button } from "react-bootstrap";
import { Navibar } from "./Navbar";
// import { Alert } from "react-bootstrap";
import "../css/Login.css";

export const Signup = () => {
  return (
    <div>
      <Navibar />
      <div className="">
        <div className="container">
          <h4 className="title pt-5">Sign up</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <Form className="z-depth-1-half login pt-5">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password verification</Form.Label>
            <Form.Control type="password" placeholder="rePassword" />
          </Form.Group>
          <Button variant="primary" type="submit" className="z-depth-1-half">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
