import { hostAPI } from '../configs/index';
import axios from 'axios';
const localHost = 'api/vi';

export const requestStoreApi = async (endpoint, method, data, categoryName) => {
    const header = 'fake user token';
    return axios({
        method: method,
        url: `${hostAPI}/${localHost}/${endpoint}?filter=${categoryName}`,
        herder: header,
        data: data,
    })
        .then(response => { return response.data })
        .catch(er => console.log("er: ", er));
}

export const requestAccountApi = async (endpoint, method, data) => {
    const header = 'fake user token';
    return axios({
        method: method,
        url: `${hostAPI}/${localHost}/${endpoint}`,
        herder: header,
        data: data,
    })
        .then(response => { console.log(response.data); return response.data })
        .catch(er => console.log("er: ", er));
}