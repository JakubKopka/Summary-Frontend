import {Spinner} from "react-bootstrap";
import {CenterElement} from "./box";
import React from "react";

const Loader = () => {
    return (
        <CenterElement>
            <Spinner animation="border"/>
        </CenterElement>
    )
}
export default Loader;