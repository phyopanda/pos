import { ACCOUNT_VALUE } from "../actionTypes";

export const setAccountAction = (account) => async (dispatch) => {

    localStorage.setItem(ACCOUNT_VALUE, JSON.stringify(account));

    return dispatch({
        type: ACCOUNT_VALUE,
        payload: account
    });
}