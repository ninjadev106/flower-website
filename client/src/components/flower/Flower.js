import React, { useState, useContext } from "react";
import useModal from "react-hooks-use-modal";
import AuthContext from "../../context/auth/AuthContext";
import FlowerContext from "../../context/flower/FlowerContext";
import AlertContext from "../../context/alert/AlertContext";

export default function Flower({ no, flower }) {
  const [flow, setFlow] = useState(flower);

  const { name, mon, tue, wed, thu, fri, sat, sun, total, sale } = flow;
  const [Modal, open, close] = useModal("root", {
    preventScroll: true
  });

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const flowerContext = useContext(FlowerContext);
  const { editFlower, deleteFlower } = flowerContext;

  const flowerDelete = id => {
    deleteFlower(id);
    setAlert("The flower has been successfully deleted.", "success");
  };

  const onChange = e => setFlow({ ...flow, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editFlower(flow);
    setAlert("The flower has been successfully updated.", "success");
    close();
  };

  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td style={{ paddingTop: "18px" }}>{no + 1}</td>
        <td style={{ paddingTop: "18px" }}>{flower.name}</td>
        <td style={{ paddingTop: "18px" }}>{flower.mon}</td>
        <td style={{ paddingTop: "18px" }}>{flower.tue}</td>
        <td style={{ paddingTop: "18px" }}>{flower.wed}</td>
        <td style={{ paddingTop: "18px" }}>{flower.thu}</td>
        <td style={{ paddingTop: "18px" }}>{flower.fri}</td>
        <td style={{ paddingTop: "18px" }}>{flower.sat}</td>
        <td style={{ paddingTop: "18px" }}>{flower.sun}</td>
        <td style={{ paddingTop: "18px" }}>{flower.total}</td>
        <td style={{ paddingTop: "18px" }}>{flower.sale}</td>
        {user && user.role === "user" ? null : (
          <td style={{ display: "flex" }}>
            <button
              className="btn btn-primary mr-1"
              style={{ display: "flex", margin: "0 auto" }}
              onClick={open}
            >
              <i className="material-icons">edit</i>
              <span> Edit</span>
            </button>
            <br />
            <button
              className="btn btn-danger ml-1"
              style={{ display: "flex", margin: "0 auto" }}
              onClick={() => flowerDelete(flower._id)}
            >
              <i className="material-icons">delete</i>
              <span> Delete</span>
            </button>
          </td>
        )}
      </tr>
      <Modal>
        <div className="card pl-5 pr-5" style={{ width: "100%" }}>
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
                &nbsp;Edit&nbsp;
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
    </>
  );
}
