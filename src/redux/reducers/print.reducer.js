import { PRINT_DATA } from "../actionTypes";

const initialState = localStorage.getItem(PRINT_DATA) ? JSON.parse(localStorage.getItem(PRINT_DATA)) : null;

export const printReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case PRINT_DATA: {
            return {
                ...state,
                ...payload
            };
        };

        default:
            return state;
    }
}