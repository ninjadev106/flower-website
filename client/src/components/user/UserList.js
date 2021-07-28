import React, { useEffect, useState, useContext } from "react";
import Pagination from "react-responsive-pagination";
import axios from "axios";
import UserContext from "../../context/user/UserContext";
import User from "./User";

export default function UserList() {
  const windowWidth = useWindowWidth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const userContext = useContext(UserContext);
  const { loadUserList, users } = userContext;
  const [totalPages, setTotalPages] = useState(5);

  const handleSelectChange = event => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/page/${limit}`)
      .then(res => {
        setTotalPages(res.data);
      })
      .catch(err => console.log(err));
    loadUserList(currentPage, limit);
  }, [currentPage, limit, loadUserList]);
  return (
    <div className="container mt-5">
      <h1>Users List</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <User
                  user={user}
                  no={index}
                  key={index}
                  page={currentPage}
                  limit={limit}
                />
              ))
            ) : (
              <tr>
                <td style={{ textAlign: "center", color: "red" }} colSpan={5}>
                  <h2>There is no user!</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {users.length > 0 ? (
        <div style={{ position: "relative" }}>
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
            maxWidth={windowWidth}
          />
          <select
            style={{ position: "absolute", bottom: 5, left: 60 }}
            onClick={handleSelectChange}
          >
            <option>5</option>
            <option>10</option>
          </select>
        </div>
      ) : null}
    </div>
  );
}

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return windowWidth;
}
