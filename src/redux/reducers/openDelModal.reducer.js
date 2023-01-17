import { SET_OPEN_DEL_MODAL } from "../actionTypes";
import { SET_OPEN_REPAY } from "../actionTypes";

const initialState = null;

export const openDelReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_OPEN_DEL_MODAL: {
            return {
                ...state,
                ...payload
            }
        }
        case SET_OPEN_REPAY: {
            return {
                ...state,
                ...payload
            }
        }

        default:
            return state;
    }
}