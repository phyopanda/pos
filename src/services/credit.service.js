import { getRequest, postRequest, putRequest } from "./api.service";

const url = '/credit';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getCreditList = async () => {
    const response = await getRequest(url);
    return handlerException(response);
}

export const updateCredit = async (id, requestBody) => {
    const response = await putRequest(`${url}/${id}`, requestBody);
    return handlerException(response);
}

