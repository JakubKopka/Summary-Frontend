import UserContext from "./context/user-context";
import styled from "styled-components";
import {useContext, useState} from "react";
import Layout from "./layout/layout";
import {Box, CenterBox} from "./element/box";
import {Badge, Button, Form, FormControl} from "react-bootstrap";
import {useForm} from "react-hook-form";
import Cookie from "js-cookie"
import {updateUser} from "../api/auth";
import AlertContext from "./context/alert-context";
import moment from "moment";


const UserForm = styled(Form)`
  padding: 50px;
`

const UserProfile = () => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {register, handleSubmit, watcher, reset} = useForm();
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);

    const onSubmit = data => {
        const {password, newPassword, confirmedPassword} = data
        console.log(data)
        //TODO
        if (password !== "" && newPassword !== confirmedPassword && newPassword === "") {
            setOpen(true)
            setMessage("Passwords don't match!")
            setVariant("danger")
        } else {
            const token = Cookie.get("token") ? Cookie.get("token") : null;
            updateUser(data, token).then(response => {
                console.log(response)
                setUserInfo(response.data)
                setOpen(true)
                setMessage("Profile was updated successfully!")
                setVariant("success")
            }).catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setStatusCode(error.response.status)
                    setVariant("danger")
                }
            });
        }
        reset()
    }

    const getLastLoginDate = () => {
        return moment(userInfo.lastLoginDateDisplay).format('DD-MM-YYYY HH:mm')
    }

    return (
        <Layout>
            <Box alert={alert}>
                {userInfo !== undefined ? (
                        <>
                            <h4>
                                Hey {userInfo.firstName}! How are you?
                            </h4>
                            <h6>
                                Last login date: <Badge variant="secondary">{getLastLoginDate()} </Badge>
                            </h6>
                            <UserForm onSubmit={handleSubmit(onSubmit)}>
                                <h5>Edit your profile</h5>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" ref={register({required: true})} type="email"
                                                  defaultValue={userInfo.email} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" ref={register({required: true})} type="text"
                                                  defaultValue={userInfo.username} readOnly/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" ref={register()} type="password"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>New password</Form.Label>
                                    <Form.Control name="newPassword" ref={register()} type="password"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm new password</Form.Label>
                                    <Form.Control name="confirmedPassword" ref={register()}
                                                  type="password"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control name="firstName" ref={register({required: true})} type="text"
                                                  defaultValue={userInfo.firstName}/>
                                </Form.Group>
                                <CenterBox>
                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                </CenterBox>
                            </UserForm>


                        </>
                    ) :
                    "Loading..."
                }
            </Box>
        </Layout>
    )
}

export default UserProfile;