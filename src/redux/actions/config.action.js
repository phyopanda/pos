import axios from "axios";
import { DEVICE_TYPE, SET_DEVICE_TYPE, SET_NETWORK_TYPE, SET_NETWORK_ADDRESS, SET_NETWORK_MAC, SET_DATABASE_URL } from "../actionTypes";

export const setDeviceTypeAction = (type) => async (dispatch) => {
    localStorage.setItem(SET_DEVICE_TYPE, type);

    return dispatch({
        type: SET_DEVICE_TYPE,
        payload: type
    });
}

export const setNetworkTypeAction = (type) => async (dispatch) => {
    localStorage.setItem(SET_NETWORK_TYPE, type);

    return dispatch({
        type: SET_NETWORK_TYPE,
        payload: type
    });
}

export const setNetworkAddress = (ip) => async (dispatch) => {
    localStorage.setItem(SET_NETWORK_ADDRESS, ip);
    axios.defaults.headers.common['ip'] = ip;

    return dispatch({
        type: SET_NETWORK_ADDRESS,
        payload: ip
    });
}

export const setNetworkMAC = (mac) => async (dispatch) => {
    localStorage.setItem(SET_NETWORK_MAC, mac);
    axios.defaults.headers.common['mac'] = mac;

    return dispatch({
        type: SET_NETWORK_MAC,
        payload: mac
    });
}

export const setDatabaseUrl = (url) => async (dispatch) => {
    localStorage.setItem(SET_DATABASE_URL, url);

    return dispatch({
        type: SET_DATABASE_URL,
        payload: url
    });
}