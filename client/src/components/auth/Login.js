import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/flower");
    }
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h1>
            Account <span className="text-primary">Login</span>
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Id</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Id"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default Login;
