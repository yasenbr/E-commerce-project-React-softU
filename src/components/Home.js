// import React, { useEffect } from "react";
import { Navibar } from "./Navbar";
import { Products } from "./Products";
// import { useHistory } from "react-router-dom";
// import { auth } from "../config/config";

export const Home = ({ user, type, userId }) => {
  return (
    <div>
      <Navibar user={user} type={type} userId={userId} />
      <Products user={user} type={type} />
    </div>
  );
};
