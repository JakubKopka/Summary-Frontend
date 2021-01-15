import React, {useContext} from "react";
import styled from 'styled-components'
import {Button, Modal} from "react-bootstrap";
import ModalContext from "../context/modal-context";

const ModalBox = () => {
    const {handleClose, show, content, heading, buttonTitle, buttonFunction} = useContext(ModalContext);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                {/*<Modal.Footer>*/}
                {/*    <Button variant="primary" onClick={buttonFunction}>*/}
                {/*        {buttonTitle}*/}
                {/*    </Button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
        </>
    )

}

export default ModalBox;
