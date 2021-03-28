import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AddProducts } from "./components/AddProducts";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Cart } from "./components/Cart";
import { ProductsContextProvider } from "./global/ProductContext";
import { Cashout } from "./components/cashout";

import { auth, db } from "./config/config";
import { CartContextProvider } from "./global/CartContext";

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUserList")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            this.setState({
              user: snapshot.data().Name,
              type: snapshot.data().Type,
            });
          });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }
  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Home user={this.state.user} type={this.state.type} />
                )}
              />
              <Route
                exact
                path="/add-product"
                component={() => (
                  <AddProducts user={this.state.user} type={this.state.type} />
                )}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route
                exact
                path="/cartlist"
                component={() => <Cart user={this.state.user} />}
              />
              <Route
                path="/cashout"
                component={() => <Cashout user={this.state.user} />}
              />
            </Switch>
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
