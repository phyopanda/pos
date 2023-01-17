import { NUMBER_FORMAT_VALUE, SET_NUMBER_FORMAT } from "../actionTypes";

const initialState = localStorage.getItem(NUMBER_FORMAT_VALUE) ? localStorage.getItem(NUMBER_FORMAT_VALUE) : 'number';

export const numberFormatReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_NUMBER_FORMAT: {
            return payload
        }

        default:
            return state;
    }
}