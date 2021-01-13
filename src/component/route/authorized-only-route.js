import React, {useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../context/user-context";
import {validToken} from "../../api/auth";

const AuthorizedOnlyRoute = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(UserContext);
    validToken()
    return (
        <Route {...rest}
               render={(props) => {
                   return isLoggedIn ? <Redirect to="/"/> : <Component {...props} />
               }}/>
    )
}

export default AuthorizedOnlyRoute;