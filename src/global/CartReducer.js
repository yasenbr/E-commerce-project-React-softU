// import React from "react";

export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state;
  console.log(state);

  let product;
  // let index;
  let updatedPrice;
  let updatedQty;

  switch (action.type) {
    case "ADD_TO_CART":
      const check = shoppingCart.find(
        (product) => product.ProductID === action.id
      );
      console.log(action.id);
      console.log(check);
      if (check) {
        console.log("Product is already in the Cart");
        return state;
      } else {
        product = action.product;
        product["qty"] = 1;
        product["totalProductPrice"] = product.ProductPrice * product.qty;
        updatedQty = totalQty + 1;
        updatedPrice = totalPrice + product.ProductPrice;

        return {
          shoppingCart: [product, ...shoppingCart],
          totalPrice: updatedPrice,
          totalQ: updatedQty,
        };
      }
      break;
    default:
      return state;
  }
};
