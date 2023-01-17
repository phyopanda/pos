import { CLOSE_TOAST, OPEN_TOAST } from "../actionTypes";

const initialState = {
    title: null,
    message: null,
    open: false,
    status: 'info'
}

export const toastReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case OPEN_TOAST: {
            return {
                state,
                ...payload
            }
        }

        case CLOSE_TOAST: {
            return {
                state,
                ...payload
            }
        }

        default:
            return state;
    }
}