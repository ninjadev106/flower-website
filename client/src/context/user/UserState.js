import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { USER_LIST } from "../types";

const UserState = props => {
  const initialState = {
    users: []
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loadUserList = async (pageNo, userLimit) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${pageNo}/${userLimit}`
      );
      dispatch({
        type: USER_LIST,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeUserRole = async (id, page, limit) => {
    try {
      await axios.put(`http://localhost:5000/api/users/role/${id}`);
      loadUserList(page, limit);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id, page, limit) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      loadUserList(page, limit);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loadUserList,
        changeUserRole,
        deleteUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
