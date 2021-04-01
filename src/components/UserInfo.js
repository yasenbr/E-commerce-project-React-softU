import React from "react";
import { Orders } from "./Orders";

import { Navibar } from "./Navbar";
import { Card } from "react-bootstrap";

import "../css/UserInfo.css";

export const UserInfo = ({ user, type, userId }) => {
  return (
    <div>
      <Navibar user={user} type={type} userId={userId} />
      <div className="pt-5 mt-5 mb-5">
        <div className="container">
          <h1 className="text-center">User information</h1>
        </div>
      </div>
      <br />
      <br />
      <div className="container">
        <Card style={{ width: "50%" }} className="z-depth-1-half pt-5 userInfo">
          <Card.Body>
            <div className="row">
              <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                User name:{" "}
              </div>
              <div className="col-sm-6 col-lg-8 mb-2  h6">{user}</div>
            </div>
            <div className="row">
              <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                User id:{" "}
              </div>
              <div className="col-sm-6 col-lg-8 mb-2  h6">{userId}</div>
            </div>
            <div className="row">
              <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                User type:{" "}
              </div>
              <div className="col-sm-6 col-lg-8 mb-2  h6">{type}</div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="pt-5 mt-5 mb-5">
        <div className="container">
          <h1 className="text-center">Orders list</h1>
        </div>
      </div>
      <br />
      <br />
      <Orders userId={userId} />
    </div>
  );
};
