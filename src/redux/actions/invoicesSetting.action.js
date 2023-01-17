import { INVOICE_SETTING } from "../actionTypes";

export const setInvoiceSettingAction = (invoicedata) => async (dispatch) => {
    localStorage.setItem(INVOICE_SETTING , JSON.stringify(invoicedata));
    const data = invoicedata

    return dispatch({
        type: INVOICE_SETTING ,
        payload: data
    });
    
}