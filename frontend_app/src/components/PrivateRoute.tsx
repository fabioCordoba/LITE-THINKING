import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;