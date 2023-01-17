import { ACCOUNT_VALUE, SET_ACCOUNT } from "../actionTypes";

const initialState = localStorage.getItem(ACCOUNT_VALUE) ? JSON.parse(localStorage.getItem(ACCOUNT_VALUE)) : null;

export const accountReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_ACCOUNT: {
            return {
                ...state,
                ...payload
            }
        }

        default:
            return state;
    }
}