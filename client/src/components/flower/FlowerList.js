import React, { useState, useEffect, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import FlowerContext from "../../context/flower/FlowerContext";
import useModal from "react-hooks-use-modal";
import Flower from "./Flower";

export default function FlowerList() {
  const flowerContext = useContext(FlowerContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { user } = authContext;
  const { getFlowers, addFlower, flowers, error } = flowerContext;

  const [Modal, open, close] = useModal("root", {
    preventScroll: true
  });

  const [flower, setFlower] = useState({
    name: "",
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
    total: 0,
    sale: 0
  });

  const { name, mon, tue, wed, thu, fri, sat, sun, total, sale } = flower;

  useEffect(() => {
    if (error) {
      setAlert("Flower Name is alreay exist.", "danger");
    }
    getFlowers();
  }, [error]);

  const onChange = e =>
    setFlower({ ...flower, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addFlower(flower);
    clearAll();
    close();
  };

  const clearAll = () => {
    setFlower({
      name: "",
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
      total: 0,
      sale: 0
    });
  };

  return (
    <div className="container-fluid mt-5">
      <h1>
        Flowers List
        {user && user.role === "user" ? null : (
          <button
            style={{ float: "right", display: "flex" }}
            className="btn btn-success"
            onClick={open}
          >
            <i className="material-icons">add_circle</i>
            <span> Create</span>
          </button>
        )}
      </h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>No</th>
              <th>Flower Variety</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
              <th>SUN</th>
              <th>TOTAL</th>
              <th>SALES</th>
              {user && user.role === "user" ? null : <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {flowers.length > 0 ? (
              flowers.map((flower, index) => (
                <Flower flower={flower} no={index} key={index} />
              ))
            ) : (
              <tr>
                <td colSpan="12" style={{ textAlign: "center", color: "red" }}>
                  <h2>There is no flower.</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal>
        <div
          className="card pl-5 pr-5"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <h2 className="mt-3">Flower Create</h2>
          <form onSubmit={onSubmit}>
            <table className="table">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Name</th>
                  <th>MON</th>
                  <th>TUE</th>
                  <th>WED</th>
                  <th>THU</th>
                  <th>FRI</th>
                  <th>SAT</th>
                  <th>SUN</th>
                  <th>TOTAL</th>
                  <th>SALES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="mon"
                      value={mon}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="tue"
                      value={tue}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="wed"
                      value={wed}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="thu"
                      value={thu}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="fri"
                      value={fri}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sat"
                      value={sat}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sun"
                      value={sun}
                      onChange={onChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="total"
                      value={total}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="sale"
                      value={sale}
                      onChange={onChange}
                      className="form-control"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20
              }}
            >
              <button
                type="submit"
                style={{ marginRight: 10 }}
                className="btn btn-primary"
              >
                &nbsp;ADD&nbsp;
              </button>
              <button
                style={{ marginLeft: 10 }}
                className="btn btn-danger"
                onClick={close}
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
