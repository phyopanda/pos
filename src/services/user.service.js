import { delRequest, getRequest, postRequest, putRequest } from "./api.service";

const url = 'auth';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const checkFirstUser = async () => {
    const response = await getRequest(`${url}/check`);
    return handlerException(response);
}

export const createAccount = async (requestBody) => {
    const response = await postRequest(`${url}/register`, requestBody);
    return handlerException(response);
}

export const getProfile = async () => {
    const response = await getRequest(`${url}/profile`);
    return handlerException(response);
}

export const getUsers = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const editUser = async (id, requestBody) => {
    const response = await putRequest(`${url}/${id}`, requestBody);
    return handlerException(response);
}

export const delUser = async (id) => {
    const response = await delRequest(`${url}/${id}`);
    return handlerException(response);
}

export const changePassword = async (id, requestBody) => {
    const response = await putRequest(`${url}/psw/${id}`, requestBody);
    return handlerException(response);
}