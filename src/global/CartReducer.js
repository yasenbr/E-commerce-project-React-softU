// import React from "react";

export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQ } = state;

  let product;
  // let index;
  let updatedPrice;
  let updatedQ;

  switch (action.type) {
    case "ADD_TO_CART":

      const check = shoppingCart.find(
        (product) => product.ProductId === action.id
      );
      if (check) {
        console.log("Product is already in the Cart");
        return state;
      } else {
        product = action.product;
        product["qty"] = 1;
        product["totalProductPrice"] = product.ProductPrice * product.qty;
        updatedQ = totalQ + 1;
        updatedPrice = totalPrice + product.ProductPrice;

        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatedPrice,
          totalQ: updatedQ,
        };
      }
      break;
    default
  }
};
