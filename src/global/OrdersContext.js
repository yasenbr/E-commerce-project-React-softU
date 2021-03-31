import React, { createContext } from "react";
import { db } from "../config/config";

export const OrdersContext = createContext();

export class OrdersContextProvider extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(this.props.children._owner);
  }
  //set initail state with empty array
  state = {
    orders: [],
  };

  componentDidMount() {
    const prevOrders = this.state.orders;
    //retrive the product
    db.collection("BuyerInfo").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      console.log(changes);
      changes.forEach((change) => {
        if (change.type === "added") {
          prevOrders.push({
            OrderID: change.doc.id,
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
