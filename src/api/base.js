import Cookie from "js-cookie";

export const API_URL = "https://summaryapp.herokuapp.com"

export const createAuthHeaders = () => {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    return ({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}