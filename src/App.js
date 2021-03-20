import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AddProducts } from "./components/AddProducts";
import { Login } from "./components/Login";
import { ProductsContextProvider } from "./global/ProductContext";

export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add-product" component={AddProducts} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
