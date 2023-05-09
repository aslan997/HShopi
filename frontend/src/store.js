import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducers,
  productDetailReducers,
  newProductReviewReducers,
} from "./reducers/productReducers";
import {
  authReducers,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  newOrderReducer,
  myOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

// const reducer = combineReducers({});
const reducer = {
  product: productReducers,
  productDetails: productDetailReducers,
  auth: authReducers,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newProductReviewReducers,
};

let initialState = {};
const middleware = [thunk];

const store = configureStore(
  {
    reducer: reducer,
  },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
