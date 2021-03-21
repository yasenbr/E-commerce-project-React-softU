import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { AddProducts } from "./components/AddProducts";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ProductsContextProvider } from "./global/ProductContext";

import { auth, db } from "./config/config";

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
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home user={this.state.user} />}
            />
            <Route exact path="/add-product" component={AddProducts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
