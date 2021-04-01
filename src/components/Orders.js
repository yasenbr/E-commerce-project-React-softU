import React, { useContext } from "react";
import { OrdersContext } from "../global/OrdersContext";
import { Card } from "react-bootstrap";
import "../css/Products.css";

export const Orders = ({ userId }) => {
  const userOrders = [];
  const { orders } = useContext(OrdersContext);
  console.log(orders);
  orders.forEach((order) => {
    if (order.OrderId === userId) {
      userOrders.push(order);
    }
    console.log(userOrders);
  });
  return (
    <>
      {orders.length === 0 && (
        <div>connection problem...no orders to display</div>
      )}
      {userOrders.map((order) => (
        <div className="container">
          <Card
            style={{ width: "50%" }}
            className="z-depth-1-half pt-5 userInfo"
          >
            <Card.Body>
              <div className="row">
                <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                  Order ID:{" "}
                </div>
                <div className="col-sm-6 col-lg-8 mb-2  h6">
                  {order.OrderId}
                </div>
              </div>
              <div className="row">
                <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                  Order Price:{" "}
                </div>
                <div className="col-sm-6 col-lg-8 mb-2  h6">
                  {order.OrderPrice}
                </div>
              </div>
              <div className="row">
                <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                  Order Quantity:{" "}
                </div>
                <div className="col-sm-6 col-lg-8 mb-2  h6">
                  {order.OrderQuantity}
                </div>
              </div>
              <div className="row">
                <div className=" col-sm-6 col-lg-4 mb-2 text-muted h6">
                  Order Address:{" "}
                </div>
                <div className="col-sm-6 col-lg-8 mb-2  h6">
                  {order.OrderAddress}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
};
