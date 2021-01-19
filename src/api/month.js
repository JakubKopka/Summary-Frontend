import axios from "axios";
import {API_URL, createAuthHeaders} from "./base";


export const addMonth = (data) => {
    return axios.post(`${API_URL}/month/add`, data, createAuthHeaders())
}