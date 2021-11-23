import {
  SET_USER_PRODUCT_CART,
  CLEAR_ALL_USER_PRODUCT_CART
} from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_PRODUCT_CART:
      return {
        userProductCart: payload,
        numberOfProductInCart: payload?.length
      }

    case CLEAR_ALL_USER_PRODUCT_CART:
      return {userProductCart: [], numberOfProductInCart:  0}
    default:
      return state;
  }
}
