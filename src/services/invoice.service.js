import { getRequest, postRequest, putRequest } from "./api.service";

const url = 'invoice';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const createInvoice = async (requestBody) => {
    const response = await postRequest(url, requestBody);
    return handlerException(response);
}

export const getLastInvoice = async () => {
    const response = await getRequest(`${url}/lastInvoice`);
    return handlerException(response);
}

// export const updateCategory = async (id, requestBody) => {
//     const response = await putRequest(`${url}/${id}`, requestBody);
//     return handlerException(response);
// }

export const getInvoice = async () => {
    const response = await getRequest(`${url}`);
    return handlerException(response);
}