import React, { createContext } from "react";
import { db } from "../config/config";

export const OrdersContext = createContext();

export class OrdersContextProvider extends React.Component {
  //set initail state with empty array
  state = {
    orders: [],
  };

  componentDidMount() {
    const prevOrders = this.state.orders;
    //retrive the product
    db.collection("BuyerInfo").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          prevOrders.push({
            OrderId: change.doc.id,
            OrderBuyer: change.doc.data().BuyerId,
            OrderPrice: change.doc.data().BuyerPayment,
            OrderQuantity: change.doc.data().BuyerQuantity,
            OrderAddress: change.doc.data().BuyerAddress,
          });
        }
        this.setState({
          orders: prevOrders,
        });
      });
    });
  }
  render() {
    return (
      <OrdersContext.Provider value={{ orders: [...this.state.orders] }}>
        {this.props.children}
      </OrdersContext.Provider>
    );
  }
}
