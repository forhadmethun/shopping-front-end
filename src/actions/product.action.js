import ProductService from "../services/product.service";
import {
    CHANGE_FROM_CURRENT_WINDOW,
    CHANGE_PRODUCT_MESSAGE,
    CLEAR_ALL_PRODUCTS,
    CLEAR_ALL_USER_PRODUCT_CART,
    SET_ALL_PRODUCTS,
    SET_CONTENT,
    SET_USER_PRODUCT_CART
} from "./types";
import {history} from '../helpers/history';
import EventBus from "../common/EventBus";

export const addProduct = (product) => (dispatch) => {
    ProductService.create(product)
        .then(response => {
                history.push("/");
            },
            error => {
                dispatch({
                    type: SET_CONTENT,
                    payload: (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString(),
                })
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
}

export const findAllProducts = () => (dispatch) => {
    ProductService.findAllProducts()
        .then(response => {
            dispatch({
                type: SET_ALL_PRODUCTS,
                payload: response.data
            })
        }, error => {
            dispatch({
                type: CLEAR_ALL_PRODUCTS
            })
        })
}

export const addProductToCart = (productCart) => (dispatch) => {
    return ProductService.addProductToCart(productCart)
        .then(response => {
                dispatch(findAllProducts())
            },
            error => {
                console.log(error);
            });
}

export const removeProductFromCart = (productCart) => (dispatch) => {
    return ProductService.removeProductFromCart(productCart)
        .then(response => {
                dispatch(findAllProducts())
            },
            error => {
                console.log(error);
            });
}

export const getUserProductCartItems = (userId) => (dispatch) => {
    ProductService.getUserProductCartItems(userId)
        .then(response => {
            dispatch({
                type: SET_USER_PRODUCT_CART,
                payload: response.data
            })
        }, error => {
            dispatch({
                type: CLEAR_ALL_USER_PRODUCT_CART
            })
        })
}

export const changeProductMessage = (msg) => (dispatch) => {
    return dispatch({
        type: CHANGE_PRODUCT_MESSAGE,
        payload: msg
    });
}

export const changeFromCurrentWindow = (isChangeFromCurrentWindow) => (dispatch) => {
    return dispatch({
        type: CHANGE_FROM_CURRENT_WINDOW,
        payload: isChangeFromCurrentWindow
    });
}

