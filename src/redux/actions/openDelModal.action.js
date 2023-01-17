import { SET_OPEN_DEL_MODAL } from "../actionTypes";

export const setOpenDelModal = (delData) => async (dispatch) => {

    return dispatch({
        type: SET_OPEN_DEL_MODAL,
        payload: delData
    });
}

export const setOpenRepaymentModal = (repayAmount) => async (dispatch) => {
    return dispatch({
        type: SET_OPEN_REPAY,
        payload: repayAmount
    });
}