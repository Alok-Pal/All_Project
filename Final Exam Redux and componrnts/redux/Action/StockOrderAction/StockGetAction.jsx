import React from 'react'
import { GET_STOCK } from '../../ActionType/ActionConst'
import axios from 'axios'

const StockGetAction = () => {
  return async function (dispatch){
    dispatch({type :GET_STOCK.REQ_GET_STOCK, loading : true })

    const response = await axios.get('http://localhost:8000/api/getStock')
    
    console.log("🚀 ~ file: StockGetAction.jsx:10 ~ response:", response)

    if (response.status === 200) {
        dispatch({
          type: GET_STOCK.SUCCESS_GET_STOCK,
          loading: false,
          payload: response.data,
        });
      }
  
      if (response.status === 400) {
        dispatch({
          type: GET_STOCK.FAILURE_GET_STOCK,
          loading: false,
          payload: response.data,
        });
      }
  
  }
}

export default StockGetAction