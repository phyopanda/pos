import { SET_TAX_CHANGE, TAX_CHANGE } from '../actionTypes'

const initialState = localStorage.getItem(TAX_CHANGE) ? JSON.parse(localStorage.getItem(TAX_CHANGE)) : null;

export const taxReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_TAX_CHANGE: {
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}
