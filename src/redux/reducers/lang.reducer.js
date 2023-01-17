/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import { LANG_GET, LANG_SET, LANG_VALUE } from "../actionTypes";

const initialState = localStorage.getItem(LANG_VALUE) ? localStorage.getItem(LANG_VALUE) : 'unicode';

export const langReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case LANG_SET: {
            return payload;
        }

        default:
            return state;
    }
}