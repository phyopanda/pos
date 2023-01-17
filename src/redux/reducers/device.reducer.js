import { DEVICE_VALUE } from "../actionTypes";

const initialState = localStorage.getItem(DEVICE_VALUE) ? JSON.parse(localStorage.getItem(DEVICE_VALUE)) : null;

export const devcieReducer = (state = initialState, action) => {
    return state;
}