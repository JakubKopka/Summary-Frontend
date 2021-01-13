import axios from "axios";
import {useContext, useEffect} from "react";
import Cookie from "js-cookie";
import UserContext from "../component/context/user-context";

const API_URL = "http://localhost:8080"

export const login = ({username, password}) => {
    return axios.post(`${API_URL}/user/login`, {username, password})
}

export const userInfo = (token) => {
    return axios.get(`${API_URL}/user/verify-token`, createAuthHeaders(token))
}

export const registerUser = (data) => {
    return axios.post(`${API_URL}/user/register`, data)
}

export const resetPassword = (data) => {
    return axios.post(`${API_URL}/user/reset-password`, data);
}

export const updateUser = (data, token) => {
    return axios.post('http://localhost:8080/user/update', data, createAuthHeaders(token))
}

const createAuthHeaders = (token) => {
    return ({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
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
                        console.log(error)
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