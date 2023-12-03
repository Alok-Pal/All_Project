import { combineReducers } from "redux";
import StockOrderReducer from "../Reducer/StockOrderReducer/StockOrderReducer";
import GetReducer from "../Reducer/StockOrderReducer/GetStockReducer";
import CreateOrderReducer from "../Reducer/OrderReducer/CreateOrderReducer";
import GetOrderReducer from "../Reducer/OrderReducer/GetOrderReducer";
const rootReducer = combineReducers({
  stockReducer: StockOrderReducer,
  GetStockReducer: GetReducer,
  OrderReducer: CreateOrderReducer,
  GetOrder: GetOrderReducer,
});

export default rootReducer;
