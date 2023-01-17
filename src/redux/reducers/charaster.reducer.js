import { CHAR_VALUE, SET_CHAR } from "../actionTypes";

const initialState = localStorage.getItem(CHAR_VALUE) ? JSON.parse(localStorage.getItem(CHAR_VALUE)) : [];

export const charasterReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_CHAR: {
            return payload
        }

        default:
            return state;
    }
}