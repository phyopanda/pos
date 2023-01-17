import { ADD_CART } from "../actionTypes";

const initialState = [];

export const saleReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
        case ADD_CART : {
            return payload
        }

        default: 
            return state;
    } 
}