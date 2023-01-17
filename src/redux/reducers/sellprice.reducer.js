import { SET_SELL_PRICE } from "../actionTypes";

const initialState = localStorage.getItem(SET_SELL_PRICE) ? localStorage.getItem(SET_SELL_PRICE) : 'percentage';

export const sellPriceReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
        case SET_SELL_PRICE : {
            return payload
        }

        default: 
            return state;
    } 
}