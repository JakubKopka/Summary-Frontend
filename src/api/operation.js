import axios from "axios";
import {API_URL, createAuthHeaders} from "./base";

export const addOperation = (data, monthId) => {
    return axios.post(`${API_URL}/operation/add`, {...data, monthId}, createAuthHeaders())
}

export const deleteOperation = (operationId) => {
    return  axios.delete(`${API_URL}/operation/${operationId}`, createAuthHeaders())
}