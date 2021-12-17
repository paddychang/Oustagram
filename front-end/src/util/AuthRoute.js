import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Navigate replace to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

AuthRoute.propTypes = {
  user: PropTypes.object,
};

export default AuthRoute;
