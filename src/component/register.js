import {Redirect} from "react-router-dom";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {MailIcon, PasswordIcon, User1Icon, User2Icon, UserIcon} from "./element/icons";
import BoxLayout from "./layout/box-layout";
import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {registerUser} from "../api/auth";
import AlertContext from "./context/alert-context";

const Register = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const {register, handleSubmit, watch, errors} = useForm()

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            console.log("Cos z hasłem" + data.password + " " + data.confirmPassword)
            setOpen(true)
            setMessage("Passwords don't match!")
            setVariant("danger")
        } else {
            registerUser(data).then(response => {
                console.log(response)
                setOpen(false)
                setMessage("")
                setRegisterSuccess(true)
            })
                .catch(function (error) {
                    if (error.response) {
                        setOpen(true)
                        setMessage(error.response.data.message)
                        setStatusCode(error.response.status)
                        setVariant("warning")
                    }
                });
        }
    }

    return (
        <BoxLayout textHeader="Create new account" alert={alert}>
            {registerSuccess ? (<Redirect to="/login"/>)
                : (
                    <span>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><MailIcon/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                aria-label="E-mail"
                                aria-describedby="basic-addon1"
                                ref={register({required: true})}
                            />
                        </InputGroup>

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

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><PasswordIcon/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                aria-label="Confirm password"
                                aria-describedby="basic-addon1"
                                ref={register({required: true})}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><User1Icon/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                aria-label="First name"
                                aria-describedby="basic-addon1"
                                ref={register({required: true})}
                            />
                        </InputGroup>

                        <Button type="submit" variant="success">Sign up!</Button>
                    </form>

                    </span>
                )}
        </BoxLayout>
    )
}

export default Register;