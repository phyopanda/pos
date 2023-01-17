import { CHAR_VALUE, SET_CHAR } from "../actionTypes";

export const setCharAction = (charList) => async (dispatch) => {
    localStorage.setItem(CHAR_VALUE, JSON.stringify(charList));
    
    return dispatch({
        type: SET_CHAR,
        payload: charList
    });
}