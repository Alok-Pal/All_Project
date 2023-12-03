import React from 'react'
import { CREATE_STOCK, GET_STOCK } from './../../ActionType/ActionConst';
import axios from 'axios'

const StockOrderAction = (data) => {
  return async function (dispatch) {

    dispatch({
      type : CREATE_STOCK.REQ_CREATE_STOCK, loading: true,
    })
    
    const response = await axios.post('http://localhost:8000/api/createStock',data)
    
    console.log("HHHHHHHHHHHHHHHHHHHHHH: " ,response)
    console.log("🚀 ~ file: StockOrderAction.jsx:13 ~ response:", response)
    if (response.status === 200) {
      dispatch({
        type: GET_STOCK.CREATE_STOCK,
        loading: false,
        payload: response.data.data
      });
    }

    if (response.status === 400) {
      dispatch({
        type: CREATE_STOCK.FAILURE_CREATE_STOCK,
        loading: false,
        payload: response.data,
      });
    }

  }
}

export default StockOrderAction