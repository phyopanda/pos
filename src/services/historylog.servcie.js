
import { getRequest, postRequest } from "./api.service";

const url = 'history-log';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getHistoryLog = async (type, page) => {
    const response = await getRequest(`${url}/${type}?page=${page}`);
    return handlerException(response);
}

export const logout = async() => {
    const response = await postRequest(`${url}/logout`, null);
    return handlerException(response);
}
