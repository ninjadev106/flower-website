import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import UserState from "./context/user/UserState";
import FlowerState from "./context/flower/FlowerState";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import FlowerList from "./components/flower/FlowerList";
import UserList from "./components/user/UserList";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <AuthState>
        <FlowerState>
          <AlertState>
            <UserState>
              <Navbar />
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/flower" component={FlowerList} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />

                <AdminRoute path="/user" component={UserList} />
              </Switch>
              <Footer />
            </UserState>
          </AlertState>
        </FlowerState>
      </AuthState>
    </>
  );
}

export default App;
