import UserQueries from "../queries/user.queries";
import EventBus from "../common/EventBus";
import {SET_CONTENT} from "./types";

export const getAdminBoard = (dispatch) => {
    UserQueries.getAdminBoard().then(
        response =>  dispatch({
            type: SET_CONTENT,
            payload: response.data,
        }),
        error => {
            dispatch({
                type: SET_CONTENT,
                payload: (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString(),
            })
            if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
            }
        }
    );
}
