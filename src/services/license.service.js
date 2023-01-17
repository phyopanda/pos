import { getRequest, postRequest } from "./api.service";

const url = 'license';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const checkLicense = async () => {
    const response = await getRequest(`${url}/check`);
    return handlerException(response);
}

export const activatedLicense = async (bodyRequest) => {
    const response = await postRequest(`${url}/activate`, bodyRequest);
    return handlerException(response);
}

export const storeLicense = async (bodyRequest) => {
    const response = await postRequest(`${url}/save-token`, bodyRequest);
    return handlerException(response);
}

export const getDevice = async () => {
    const response = await getRequest(`${url}/device`);
    return handlerException(response);
}