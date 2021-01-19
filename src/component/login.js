import BoxLayout from "./layout/box-layout";
import {Link} from "react-router-dom";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {PasswordIcon, UserIcon} from "./element/icons";
import UserContext from "./context/user-context";
import {BottomElements} from "./element/box";
import Cookie from "js-cookie"
import {login} from "../api/auth";
import AlertContext from "./context/alert-context";

const Login = () => {
    const {isLoggedIn, setLoggedIn, setUserInfo} = useContext(UserContext);
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        login(data)
            .then(response => {
                setUserInfo(response.data.user)
                Cookie.set("token", response.data.token);
                setOpen(false)
                setMessage("")
                setLoggedIn(true)
            })
            .catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setStatusCode(error.response.status)
                    setVariant("danger")
                }
            });
    }

    return (
        <BoxLayout textHeader="Login to your account" alert={alert}>
            {isLoggedIn ? ""
                : (
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><UserIcon/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="username"
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={register({required: true})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1"><PasswordIcon/></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    ref={register({required: true})}
                                />
                            </InputGroup>
                            <Button type="submit" variant="success">Sign in!</Button>
                        </form>
                        <BottomElements>
                            <Link to="/reset-password">Forgot password?</Link>
                            <Link to="/register">Creat new account</Link>
                        </BottomElements>
                    </div>
                )}
        </BoxLayout>
    )
}

export default Login;