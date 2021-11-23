import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import product from "./product";
import cart from "./cart";

export default combineReducers({
  auth,
  message,
  user,
  product,
  cart
});
