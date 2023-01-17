import { SET_INVOICE } from "../actionTypes";

const initialState = null;

export const invoiceReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case SET_INVOICE : {
            return payload
        }
        default : {
            return state;
        }
    }

}