import React, {useContext, useEffect} from "react";
import {Route} from "react-router-dom";
import {validToken} from "../../api/auth";

const PublicRoute = ({component: Component, ...rest}) => {
    validToken()
    return (
        <Route {...rest} render={Component}/>
    )
}

export default PublicRoute;