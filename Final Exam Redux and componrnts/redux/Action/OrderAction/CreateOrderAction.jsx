import React from 'react'
import { CREATE_ORDER } from '../../ActionType/ActionConst';
import axios from 'axios';

const CreateOrderAction = (data) => {
  return async function(dispatch){

    dispatch({type :CREATE_ORDER.REQ_CREATE_ORDER, loading : true })

    const response = await axios.post('http://localhost:8000/api/createOrder', data )


    if (response.status === 200) {
        dispatch({
          type: CREATE_ORDER.SUCCESS_CREATE_ORDER,
          loading: false,
          payload: response.data,
        });
      }
  
      if (response.status === 400) {
        dispatch({
          type: CREATE_ORDER.FAILURE_CREATE_ORDER,
          loading: false,
          payload: response.data,
        });
      }
  }
}

export default CreateOrderAction