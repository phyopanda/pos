import { ADD_CART } from "../actionTypes";

export const addToCartAction = (model, price, saleAmount ) => async (dispatch) => {
    const data = {
        itemModel: model,
        itemPrice: price,
        itemSaleAmount: saleAmount,
        totalAmount: price * saleAmount
    }

    return dispatch({
        type: ADD_CART,
        payload: data
    });
}