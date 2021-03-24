import React, { reacteContext, useReducer } from "react";
import { CartRemoval } from "./CartRemoval";

export const cartContext = createContext();

export const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(CartRemoval, {
    shoppingCart: [],
    totalPrice: 0,
    totalQ: 0,
  });
  return (
    <CartContext.createContextProvider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
