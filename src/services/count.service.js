import { getRequest } from "./api.service";

const url = "invoice";

const handlerException = (response) => {
    if(response && response.status === 0) {
        return null;
    }
    return response;
}

export const getCustomerAmount = async () => {
    const response = await getRequest (`${url}`);
    return handlerException(response);
}
