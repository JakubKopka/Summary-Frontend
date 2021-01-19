import axios from "axios";
import {API_URL, createAuthHeaders} from "./base";

export const updateCategory = (data, categoryId) => {
    return axios.put(`${API_URL}/category/${categoryId}`, data, createAuthHeaders());
}

export const addCategory = (data) =>{
    return axios.post(`${API_URL}/category/add`, data, createAuthHeaders())
}
