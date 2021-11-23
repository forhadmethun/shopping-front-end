import {
    SET_ALL_PRODUCTS, CLEAR_ALL_PRODUCTS, CHANGE_PRODUCT_MESSAGE, CHANGE_FROM_CURRENT_WINDOW,
} from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_ALL_PRODUCTS:
            return {...state, products: payload};

        case CLEAR_ALL_PRODUCTS:
            return {...state, products: []};

        case CHANGE_PRODUCT_MESSAGE:
            return {...state, changeMessage: payload}

        case CHANGE_FROM_CURRENT_WINDOW:
            return {...state, changeFromCurrentWindow: payload}

        default:
            return state;
    }
}
