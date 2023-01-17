import { OPEN_DIALOG, CLOSE_DIALOG } from "../actionTypes";

const initialState = {
    title: null,
    message: null,
    open: false,
    status: 'info'
};

export const setOpenToastAction = (title, message, status) => async (dispatch) => {
    const data = {
        title: title,
        message: message,
        open: true,
        status: status
    }

    return dispatch({
        type: OPEN_TOAST,
        payload: data
    });
}

export const setCloseToastAction = () => async (dispatch) => {
    return dispatch({
        type: CLOSE_TOAST,
        payload: initialState
    })
}