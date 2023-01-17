import { postRequest } from "./api.service";

const url = 'auth';

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const login = async (requestBody) => {
    const response = await postRequest(`${url}/login`, requestBody);
    return handlerException(response);
}

export const logout = async() => {
    const response = await postRequest(`${url}/logout`, null);
    return handlerException(response);
}
