// import React, { useEffect } from "react";
import { Navibar } from "./Navbar";
import { Products } from "./Products";
// import { useHistory } from "react-router-dom";
// import { auth } from "../config/config";

export const Home = ({ user, type }) => {
  // const history = useHistory();
  // //force user to login
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (!user) {
  //       history.push("/login");
  //     }
  //   });
  // });
  return (
    <div>
      <Navibar user={user} type={type} />
      <Products />
    </div>
  );
};
