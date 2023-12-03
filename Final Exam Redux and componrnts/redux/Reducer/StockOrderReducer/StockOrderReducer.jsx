import { CREATE_STOCK } from "../../ActionType/ActionConst";

const StockOrderReducer = (state = {}, actions) => {
    switch (actions.type) {
        case CREATE_STOCK.REQ_CREATE_STOCK:
      return {
        ...state,
        loading: true,
      };
    case CREATE_STOCK.SUCCESS_CREATE_STOCK:
      return {
        ...state,
        loading: false,
        data: actions.payload,
      };
    case CREATE_STOCK.FAILURE_CREATE_STOCK:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
    }
};

export default StockOrderReducer
