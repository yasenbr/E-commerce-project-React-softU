import React, { useContext } from "react";
import { CartContext } from "../global/CartContext";

export const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQ } = useContext(
    CartContext
  );
  return <div></div>;
};
