import {SET_CONTENT, CLEAR_CONTENT} from "../actions/types";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CONTENT:
      return { content: payload };

    case CLEAR_CONTENT:
      return { content: "" };

    default:
      return state;
  }
}
