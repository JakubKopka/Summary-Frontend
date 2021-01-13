import React, {useContext, useState} from "react";
import styled from "styled-components";
import {Button, DropdownButton, Dropdown} from "react-bootstrap";
import Cookie from "js-cookie";
import UserContext from "../context/user-context";
import {
    Link,
    Redirect,
    useHistory
} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 35%;
`

const Menu = () => {
    const {userInfo, setLoggedIn, isLoggedIn} = useContext(UserContext)
    const token = Cookie.get("token")? Cookie.get("token") : null
    const history = useHistory();

    const deleteToken = () => {
        console.log("Delete token form cookies")
        Cookie.remove("token")
        setLoggedIn(false)
        history.push('/')
    }

    const getFirstName = () => {
        return userInfo ? userInfo.firstName : "Guest"
    }

    return (
        <Wrapper>
            <Link to="/"> <Button variant="light">Home</Button></Link>
            {token !== null ? (
                <>
                    <Link to="/my-stock">
                        <Button variant="primary">MySummary</Button>
                    </Link>
                    <DropdownButton
                        id="dropdown-variants-secondary"
                        variant="outline-primary"
                        title={`Hello ${getFirstName()}!`}>
                        <Dropdown.Item>
                            <Link to="/user">Edit profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={deleteToken}>Logout</Dropdown.Item>
                    </DropdownButton>
                </>
            ) : (
                <>
                    <Link to="/login">
                        <Button variant="outline-primary">Sign in</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="outline-info">Sign up</Button>
                    </Link>
                </>
            )}
        </Wrapper>
    )
}

export default Menu;