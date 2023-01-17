import { SET_SELL_PRICE } from "../actionTypes";

export const setSellPriceAction = (type) => async (dispatch) => {
    localStorage.setItem(SET_SELL_PRICE, type);

    return dispatch({
        type: SET_SELL_PRICE,
        payload: type
    });
}