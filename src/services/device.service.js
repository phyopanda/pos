import { getRequest, postRequest, putRequest } from "./api.service";

const url = 'device';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getDevices = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const getFirstDevice = async () => {
    const response = await getRequest(`${url}/first`);
    return handlerException(response);
}

export const createFirstDevice = async (requestBody) => {
    const response = await postRequest(`${url}/first`, requestBody);
    return handlerException(response);
}

export const createDevice = async (requestBody) => {
    const response = await postRequest(url, requestBody);
    return handlerException(response); 
}

export const updateDevice = async (id, requestBody) => {
    const response = await putRequest(`${url}/${id}`, requestBody);
    return handlerException(response);
}