import React, {useContext, useEffect} from "react";
import {Alert} from "react-bootstrap";
import styled from 'styled-components'
import AlertContext from "../context/alert-context";

const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  align-items: center;
  //margin: 20px 0;
`

const AlertComponent = (props) => {
    const {
        isOpen,
        setOpen,
        message,
        setMessage,
        statusCode,
        setStatusCode,
        variant,
        setVariant
    } = useContext(AlertContext);

    useEffect(()=>{
        setTimeout(() => {
            setOpen(false)
        }, 3_000)
    }, [isOpen])

    return (
        <>
            {isOpen ? (
                <Wrapper>
                    <Alert key={statusCode} variant={variant}>
                        <strong>{message}</strong>
                    </Alert>
                </Wrapper>
            ) : ("")}
        </>
    )
}

export default AlertComponent;