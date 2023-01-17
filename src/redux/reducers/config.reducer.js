import { SET_DEVICE_TYPE, SET_NETWORK_TYPE, SET_NETWORK_ADDRESS, SET_NETWORK_MAC, SET_DATABASE_URL } from "../actionTypes";

const initialState = {
    device_type : localStorage.getItem(SET_DEVICE_TYPE) ? localStorage.getItem(SET_DEVICE_TYPE) : null,
    netwok_type : localStorage.getItem(SET_NETWORK_TYPE) ? localStorage.getItem(SET_NETWORK_TYPE) : null,
    network_address : localStorage.getItem(SET_NETWORK_ADDRESS) ? localStorage.getItem(SET_NETWORK_ADDRESS) : null,
    network_mac : localStorage.getItem(SET_NETWORK_MAC) ? localStorage.getItem(SET_NETWORK_MAC) : null,
    api_url : localStorage.getItem(SET_DATABASE_URL) ? localStorage.getItem(SET_DATABASE_URL) : null
}

export const configReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case SET_DEVICE_TYPE: {
            state.device_type = payload;
            return state;
        }

        case SET_NETWORK_TYPE: {
            state.netwok_type = payload;
            return state;
        }

        case SET_NETWORK_ADDRESS: {
            state.network_address = payload;
            return state;
        }

        case SET_NETWORK_MAC: {
            state.network_mac = payload;
            return state;
        }

        case SET_DATABASE_URL: {
            state.api_url = payload;
            return state;
        }

        default:
            return state;
    }
}