import React, {useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import UserContext from "../context/user-context";
import {validToken} from "../../api/auth";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(UserContext);
    validToken()
    return (
        <Route {...rest}
               render={(props) => {
                   return isLoggedIn ? <Component {...props}/> : <Redirect to="/login"/>
               }}/>
    )

}

export default PrivateRoute;