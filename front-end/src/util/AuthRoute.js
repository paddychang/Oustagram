import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children, authenticated }) => {
  return authenticated ? <Navigate replace to="/" /> : children;
};

export default AuthRoute;
