import { GET_STOCK } from "../../ActionType/ActionConst";

const initialState = {
  loading: true,
  data: {
    data: [],
  },
  error: null,
};
const GetReducer = (state = initialState, actions) => {
 
  switch (actions.type) {
    case GET_STOCK.REQ_GET_STOCK:
      return {
        ...state,
        loading: true,
      };
    case GET_STOCK.SUCCESS_GET_STOCK:
      return {
        ...state,
        loading: false,
        data: {data:[...actions.payload.data]},
      };
      case GET_STOCK.CREATE_STOCK:
        return {
          ...state,
          loading: false,
          data:{data:[...state.data.data,actions.payload]}
        };
    case GET_STOCK.FAILURE_GET_STOCK:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    default:
      return state;
  }
};

export default GetReducer;
