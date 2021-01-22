import './App.css';
import Login from "./component/login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ResetPassword from "./component/reset-password.js";
import UserContext from "./component/context/user-context";
import React, {useState} from "react";
import UserProfile from "./component/user-profile";
import Register from "./component/register";
import Home from "./component/home";
import PrivateRoute from "./component/route/private-route";
import Summary from "./component/summary";
import AuthorizedOnlyRoute from "./component/route/authorized-only-route";
import PublicRoute from "./component/route/public-route";
import AlertContext from "./component/context/alert-context";
import ModalContext from "./component/context/modal-context";
import {Button, Modal} from "react-bootstrap";

const route = {
    login: "/login"
}

function App() {
    const [userInfo, setUserInfo] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false)

    const defaultUserContext = {
        userInfo,
        setUserInfo,
        setLoggedIn,
        isLoggedIn
    }

    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [statusCode, setStatusCode] = useState(0)
    const [variant, setVariant] = useState("primary")

    const defaultAlertContext = {
        isOpen,
        setOpen,
        message,
        setMessage,
        statusCode,
        setStatusCode,
        variant,
        setVariant
    }

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        // setButtonFunction(()=>{alert("elo")});
        // setHeading("")
        // setContent("")
        // setButtonTitle("")
    }
    const handleShow = () => setShow(true);
    const [heading, setHeading] = useState("Modal heading")
    const [content, setContent] = useState("Modal Content")
    const [buttonTitle, setButtonTitle] = useState("Title")
    const [buttonFunction, setButtonFunction] = useState(handleClose)


    const defaultModalContext = {
        show, setShow, handleClose, handleShow, content, setContent, heading, setHeading, buttonTitle, setButtonTitle,
        buttonFunction, setButtonFunction
    }

    return (
        <UserContext.Provider value={defaultUserContext}>
            <AlertContext.Provider value={defaultAlertContext}>
                <ModalContext.Provider value={defaultModalContext}>
                    <Router>
                        <Switch>
                            <Route path="/login" render={() => <AuthorizedOnlyRoute component={Login}/>}/>
                            <Route path="/register" render={() => <AuthorizedOnlyRoute component={Register}/>}/>
                            <Route path="/reset-password"
                                   render={() => <AuthorizedOnlyRoute component={ResetPassword}/>}/>

                            <Route path="/user" render={() => <PrivateRoute component={UserProfile}/>}/>
                            <Route path="/summary" render={() => <PrivateRoute component={Summary}/>}/>

                            <Route path="/" render={() => <PublicRoute component={Home}/>}/>
                        </Switch>
                    </Router>
                </ModalContext.Provider>
            </AlertContext.Provider>
        </UserContext.Provider>
    );

}

export default App;
