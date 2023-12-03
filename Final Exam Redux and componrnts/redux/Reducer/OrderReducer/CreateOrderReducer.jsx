import { CREATE_ORDER } from "../../ActionType/ActionConst";

const CreateOrderReducer = (state={}, actions )=>{
    switch (actions.type) {
        case CREATE_ORDER.REQ_CREATE_ORDER:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER.SUCCESS_CREATE_ORDER:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      };
    case CREATE_ORDER.FAILURE_CREATE_ORDER:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
    }
}

export default CreateOrderReducer