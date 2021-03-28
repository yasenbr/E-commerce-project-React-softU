import React, { useState } from "react";
import { auth, db } from "../config/config";

import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { Navibar } from "./Navbar";
import { Alert } from "react-bootstrap";
import "../css/Login.css";

export const Signup = (props) => {
  //Define state to use
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        db.collection("SignedUpUserList")
          .doc(userCredential.user.uid)
          .set({
            Name: name,
            Email: email,
            Password: password,
            Type: "client",
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };
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
        <Form className="z-depth-1-half login pt-5" onSubmit={Signup}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="z-depth-1-half">
            Register
          </Button>

          {error && (
            <div>
              <Alert variant="danger mt-3">{error}</Alert>
            </div>
          )}
          <div className="mt-3">
            Already have an account? Login
            <Link to="login">&nbsp;Here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
