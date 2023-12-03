import React from "react";
import { GET_ORDER } from "../../ActionType/ActionConst";
import axios from "axios";

const GetOrderAction = () => {
  return async function (dispatch) {
    dispatch({ type: GET_ORDER.REQ_GET_ORDER, loading: true });
    const response = await axios.get("http://localhost:8000/api/getOrder");
    if (response.status === 200) {
      dispatch({
        type: GET_ORDER.SUCCESS_GET_ORDER,
        loading: false,
        payload: response.data,
      });
    }

    if (response.status === 400) {
      dispatch({
        type: GET_ORDER.FAILURE_GET_ORDER,
        loading: false,
        payload: response.data,
      });
    }
  };
};

export default GetOrderAction;
