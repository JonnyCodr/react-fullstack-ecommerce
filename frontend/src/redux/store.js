import { createStore, combineReducers, applyMiddleware } from "redux";
import { counterReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const reducer = combineReducers({
  cart: counterReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  { cart: { value: 0 } },
  applyMiddleware(...middleware)
);

export default store;
