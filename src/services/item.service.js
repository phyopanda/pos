import { getRequest, postRequest, putRequest } from "./api.service";

const url = 'items';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getItems = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const saveItem = async (requestBody) => {
    const response = await postRequest(url, requestBody);
    return handlerException(response);
}

export const itemDetail = async (id) => {
    const response = await getRequest(`${url}/${id}`);
    return handlerException(response);
}

export const updateItem = async (id, requestBody) => {
    const response = await putRequest(`${url}/${id}`, requestBody);
    return handlerException(response);
}

export const updatePercentage = async (requestBody) => {
    const response = await postRequest(`${url}/percentage`, requestBody);
    return handlerException(response);
}