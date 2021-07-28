import React, { useContext } from "react";
import UserContext from "../../context/user/UserContext";
import AlertContext from "../../context/alert/AlertContext";

export default function User({ no, user, page, limit }) {
  const userContext = useContext(UserContext);
  const { changeUserRole, deleteUser } = userContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const roleChange = id => {
    changeUserRole(id, page, limit);
    setAlert("The user's role has been successfully changed.", "success");
  };

  const userDelete = id => {
    deleteUser(id, page, limit);
    setAlert("The user has been successfully deleted.", "success");
  };
  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td style={{ paddingTop: "18px" }}>{no + 1}</td>
        <td style={{ paddingTop: "18px" }}>{user.name}</td>
        <td style={{ paddingTop: "18px" }}>{user.email}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => roleChange(user._id)}
          >
            <i className="fas fa-user-cog"></i>
            <span>&nbsp;{user.role}</span>
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            style={{ display: "flex", margin: "0 auto" }}
            onClick={() => userDelete(user._id)}
          >
            <i className="material-icons">delete</i>
            <span>Delete</span>
          </button>
        </td>
      </tr>
    </>
  );
}
