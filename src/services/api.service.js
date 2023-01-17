import axios from "axios";
import { ACCESS_TOKEN, LICENSE, SET_DATABASE_URL, SET_NETWORK_ADDRESS, SET_NETWORK_MAC } from "../redux/actionTypes";
import history from "../utilities/histroy";

axios.defaults.baseURL = localStorage.getItem(SET_DATABASE_URL) ? `${ localStorage.getItem(SET_DATABASE_URL)}/api` : null;
// axios.defaults.headers.common['ip'] = localStorage.getItem(SET_NETWORK_ADDRESS) ? localStorage.getItem(SET_NETWORK_ADDRESS) : null;
// axios.defaults.headers.common['mac'] = localStorage.getItem(SET_NETWORK_MAC) ? localStorage.getItem(SET_NETWORK_MAC) : null;
axios.defaults.headers.common['license'] = localStorage.getItem(LICENSE) ? localStorage.getItem(LICENSE) : null;
axios.defaults.headers.common['Authorization'] = localStorage.getItem(ACCESS_TOKEN) ? `Bearer ${localStorage.getItem(ACCESS_TOKEN) }` : null;

const httpHandler = (response) => {
    if(response.status === 401) {
        history.push('/logout');
        window.location.reload();
        return {
            ...response.data,
            status: response.status
        }
    }

    if(response.status === 404 || response.status === 422 || response.status === 400 || response.status === 500) {
        return {
            ...response.data,
            status: response.status
        };
    }

    if(response.success === false) {
        return response.response;
    }

    if(response.status === 0) {
        history.push('/error/0');
        return response;
    }

    return response.data.data;
}

export const getRequest = async (url) => {
    const response = await axios.get(url).then((result) => {
        return result;
    }, (error) => {
        if(error && error.response) {
            return error.response;
        }

        return {
            message: "Network Error",
            status: 0
        }
    });

    return httpHandler(response);
}

export const postRequest = async (url, body) => {
    const response = await axios.post(url, body).then((result) => {
        return result;
    }, (error) => {

        if(error && error.response) {
            return error.response;
        }

        return {
            message: "Network Error",
            status: 0
        }
    });
    return httpHandler(response);
}

export const putRequest = async (url, body) => {
    const response = await axios.put(url, body).then((result) => {
        return result;
    }, (error) => {

        if(error && error.response) {
            return error.response;
        }

        return {
            message: "Network Error",
            status: 0
        }
    });
    return httpHandler(response);
}

export const delRequest = async (url) => {
    const response = await axios.delete(url).then((result) => {
        return result;
    }, (error) => {

        if(error && error.response) {
            return error.response;
        }

        return {
            message: "Network Error",
            status: 0
        }
    });
    return httpHandler(response);
}