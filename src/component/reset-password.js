import BoxLayout from "./layout/box-layout";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {MailIcon} from "./element/icons";
import {resetPassword} from "../api/auth";
import AlertContext from "./context/alert-context";

const ResetPassword = () => {
    const {register, handleSubmit} = useForm();
    const [success, setSuccess] = useState(false)
    const {setOpen, setMessage, statusCode, setStatusCode, setVariant} = useContext(AlertContext);
    const history = useHistory();

    const onSubmit = data => {
        resetPassword(data).then(response => {
            setOpen(true)
            setMessage("A new password was sent to your e-mail!")
            setVariant("success")
            setStatusCode(200)
            setSuccess(true)
        })
            .catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setVariant("danger")
                    setStatusCode(error.response.status)
                }
            });
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                history.push('/login')
            }, 3_000)
        }

    }, [success])

    return (
        <BoxLayout textHeader="Reset your password" alert={alert}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><MailIcon/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name="email"
                        placeholder="e-mail"
                        aria-label="e-mail"
                        aria-describedby="basic-addon1"
                        ref={register({required: true})}
                    />
                </InputGroup>
                <Button type="submit" variant="secondary">Reset password!</Button>
            </form>

        </BoxLayout>
    )
}

export default ResetPassword;