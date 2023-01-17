import { getRequest, postRequest, putRequest } from "./api.service";

const url = 'shop';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const createShop = async (requestBody) => {
    const response = await postRequest(`${url}`, requestBody);
    return handlerException(response);
}

export const getShop = async () => {
    const response = await getRequest(`${url}`);
    return handlerException(response);
}

export const updateShop = async (requestBody) => {
    const response = await putRequest(`${url}/1`, requestBody);
    return handlerException(response);
}
