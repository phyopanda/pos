import { PRINT_DATA } from "../actionTypes";

export const setPrintAction = (printdata) => async (dispatch) => {
    localStorage.setItem(PRINT_DATA , JSON.stringify(printdata));
    const data = printdata

    return dispatch({
        type: PRINT_DATA ,
        payload: data
    });
    
}