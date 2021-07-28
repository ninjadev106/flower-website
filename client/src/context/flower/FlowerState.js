import React, { useReducer } from "react";
import axios from "axios";
import FlowerContext from "./FlowerContext";
import FlowerReducer from "./FlowerReducer";
import {
  FLOWER_LIST,
  FLOWER_ADD,
  FLOWER_EDIT,
  FLOWER_DELETE,
  FLOWER_ERROR
} from "../types";

const FlowerState = props => {
  const initialState = {
    flowers: [],
    error: null
  };
  const [state, dispatch] = useReducer(FlowerReducer, initialState);

  const getFlowers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/flowers`);
      dispatch({
        type: FLOWER_LIST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FLOWER_ERROR,
        payload: err.response.data
      });
    }
  };

  const addFlower = async flower => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/flowers",
        flower,
        config
      );
      dispatch({
        type: FLOWER_ADD,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FLOWER_ERROR,
        payload: err.response.data
      });
    }
  };

  const editFlower = async flower => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/api/flowers/${flower._id}`,
        flower,
        config
      );
      dispatch({
        type: FLOWER_EDIT,
        payload: res.data.flower
      });
    } catch (err) {
      dispatch({
        type: FLOWER_ERROR,
        payload: err.response.data
      });
    }
  };

  const deleteFlower = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/flowers/${id}`);
      dispatch({
        type: FLOWER_DELETE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: FLOWER_ERROR,
        payload: err.response.data
      });
    }
  };

  return (
    <FlowerContext.Provider
      value={{
        flowers: state.flowers,
        error: state.error,
        getFlowers,
        addFlower,
        editFlower,
        deleteFlower
      }}
    >
      {props.children}
    </FlowerContext.Provider>
  );
};

export default FlowerState;
