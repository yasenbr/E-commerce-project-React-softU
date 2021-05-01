export const orderRegistration = (id) => {
  db.collection("BuyerInfo")
    .doc(id + "_" + time)
    .set({
      BuyerId: user.uid,
      BuyerName: name,
      BuyerEmail: email,
      BuyerPhone: phone,
      BuyerAddress: address,
      BuyerPayment: totalPrice,
      BuyerQuantity: totalQty,
    })
    .then(() => {
      setPhone("");
      setAddress("");
      dispatch({ type: "EMPTY" });
      setSuccesMsg("Your order was registred successfully");

      window.location.reload(true);
      setTimeout(() => {
        history.push("/");
      }, 3000);
    })
    .catch((err) => setError(err.message));
};
