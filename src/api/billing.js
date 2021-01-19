import axios from "axios";
import {API_URL, createAuthHeaders} from "./base";

export const getAllBilling = () => {
    return axios.get(`${API_URL}/billing/all`, createAuthHeaders());
}