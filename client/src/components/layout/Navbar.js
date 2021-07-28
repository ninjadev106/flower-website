import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      {user && user.role === "admin" ? (
        <li className="nav-item">
          <Link to="user" className="nav-link">
            <i className="fas fa-user-edit"></i>
            <span className="hide-sm"> User</span>
          </Link>
        </li>
      ) : null}
      {user ? (
        <li className="nav-item">
          <Link to="flower" className="nav-link">
            <i className="fas fa-tree"></i>
            <span> Flower</span>
          </Link>
        </li>
      ) : null}
      <li className="nav-item">
        <Link to="#" className="nav-link">
          <i className="fas fa-user"></i>
          <span> Hello {user && user.name}</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={onLogout}>
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout </span>
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </>
  );

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className="navbar navbar-expand-sm bg-dark navbar-dark">
      <Link to="/" className="navbar-brand">
        <i className={icon} /> {title}
      </Link>
      <ul className="navbar-nav ml-auto">
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};
Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};

export default React.memo(Navbar);
