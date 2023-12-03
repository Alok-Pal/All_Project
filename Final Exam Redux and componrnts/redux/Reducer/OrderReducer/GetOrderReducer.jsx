import { GET_ORDER } from "../../ActionType/ActionConst";

const GetOrderReducer = (state = {}, actions )=>{
    switch (actions.type) {
        case GET_ORDER.REQ_GET_ORDER:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDER.SUCCESS_GET_ORDER:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      };
    case GET_ORDER.FAILURE_GET_ORDER:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
    }
}

export default GetOrderReducer