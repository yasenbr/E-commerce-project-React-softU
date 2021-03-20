import React, { createContext } from "react";
import { db } from "../config/config";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
  //set initail state with empty array
  state = {
    products: [],
  };

  componentDidMount() {
    const prevProducts = this.state.products;
    //retrive the product
    db.collection("Products").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          prevProducts.push({
            ProductID: change.doc.id,
            ProductName: change.doc.data().ProductName,
            ProductPrice: change.doc.data().ProductPrice,
            ProductImage: change.doc.data().ProductImage,
            ProductDescription: change.doc.data().ProductDescription,
          });
        }
        this.setState({
          products: prevProducts,
        });
      });
    });
  }
  render() {
    return (
      <ProductsContext.Provider value={{ products: [...this.state.products] }}>
        {this.props.children}
      </ProductsContext.Provider>
    );
  }
}
