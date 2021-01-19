import Cookie from "js-cookie";

export const API_URL = "http://localhost:8080"

export const createAuthHeaders = () => {
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    return ({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}