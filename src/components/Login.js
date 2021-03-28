import React, { useState } from "react";
import { auth } from "../config/config";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { Navibar } from "./Navbar";
import { Alert } from "react-bootstrap";
import "../css/Login.css";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("succesful login");
        props.history.push("/");
      })
      .catch((err) => setError(err.message));
  };
  return (
    <div>
      <Navibar />
      <div className="">
        <div className="container">
          <h4 className="text-center pt-5 mt-5 mb-5">Login</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <Form className="z-depth-1-half login pt-5" onSubmit={login}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="username"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="z-depth-1-half">
            Login
          </Button>
          {error && (
            <div>
              <Alert variant="danger mt-3">{error}</Alert>
            </div>
          )}
          <div className="mt-3">
            Don't have an account? Register
            <Link to="signup">&nbsp;Here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
