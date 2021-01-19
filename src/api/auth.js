import axios from "axios";
import {useContext, useEffect} from "react";
import Cookie from "js-cookie";
import UserContext from "../component/context/user-context";
import {API_URL, createAuthHeaders} from "./base";

export const login = ({username, password}) => {
    return axios.post(`${API_URL}/user/login`, {username, password})
}

export const userInfo = () => {
    return axios.get(`${API_URL}/user/verify-token`, createAuthHeaders())
}

export const registerUser = (data) => {
    return axios.post(`${API_URL}/user/register`, data)
}

export const resetPassword = (data) => {
    return axios.post(`${API_URL}/user/reset-password`, data);
}

export const updateUser = (data) => {
    return axios.post(`${API_URL}/user/update`, data, createAuthHeaders())
}


export const validToken = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {setLoggedIn, setUserInfo} = useContext(UserContext);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        let token = Cookie.get("token") ? Cookie.get("token") : null
        if (token !== null) {
            userInfo(token).then(response => {
                setLoggedIn(true)
                setUserInfo(response.data)
            })
                .catch(function (error) {
                    if (error.response) {
                        Cookie.remove('token')
                        setUserInfo(null)
                        setLoggedIn(false)
                    }
                });
        } else {
            setUserInfo(null)
            setLoggedIn(false)
        }

    }, [])
}
