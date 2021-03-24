import React, { createContext, useReducer } from "react";
import { CartRemoval } from "./CartRemoval";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(CartRemoval, {
    shoppingCart: [],
    totalPrice: 0,
    totalQ: 0,
  });
  return (
    <CartContext.Provider value={{ ...cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
