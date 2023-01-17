import { INVOICE_SETTING } from "../actionTypes";

const initialState = localStorage.getItem(INVOICE_SETTING) ? JSON.parse(localStorage.getItem(INVOICE_SETTING)) : null;

export const invoiceSettingReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case INVOICE_SETTING: {
            return {
                ...state,
                ...payload
            };
        };

        default:
            return state;
    }
}