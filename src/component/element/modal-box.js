import React, {useContext} from "react";
import styled from 'styled-components'
import {Button, Modal} from "react-bootstrap";
import ModalContext from "../context/modal-context";

const ModalBox = () => {
    const {handleShow, handleClose, show} = useContext(ModalContext);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalBox;