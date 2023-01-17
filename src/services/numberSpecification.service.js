import { getRequest, putRequest } from "./api.service";

const url = 'number-specification';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getNumberSpecList = async () => {
    const response = await getRequest(`${url}`);
    return handlerException(response);
}

export const updateChar = async (id, requestBody) => {
    const response = await putRequest(`${url}/${id}`, requestBody);
    return handlerException(response);
}
