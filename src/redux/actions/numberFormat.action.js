import { NUMBER_FORMAT_VALUE, SET_NUMBER_FORMAT } from "../actionTypes";

export const setNumberFormatAction = (format) => async (dispatch) => {
    localStorage.setItem(NUMBER_FORMAT_VALUE, format);

    return dispatch({
        type: SET_NUMBER_FORMAT,
        payload: format
    });
}