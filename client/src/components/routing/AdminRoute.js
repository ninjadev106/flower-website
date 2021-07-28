import React, { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        user && user.role === "admin" ? (
          <Component {...props} />
        ) : user && user.role !== "admin" ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/user" />
        )
      }
    />
  );
};

export default PrivateRoute;
