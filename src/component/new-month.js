import {Box, CenterElement} from "./element/box";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import AlertContext from "./context/alert-context";
import ModalContext from "./context/modal-context";
import {addMonth} from "../api/month";
import {monthNames} from "./months";


const NewMonth = ({setMonths}) => {
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const { handleShow, handleClose, setContent, setHeading, setButtonTitle} = useContext(ModalContext);
    const {register, handleSubmit} = useForm();

    function onSubmit(data) {
        addMonth(data).then(response => {
                setMonths(response.data)
            }).catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setStatusCode(error.response.status)
                    setVariant("danger")
                }
            });
        handleClose()
    }

    function getCurrentYear() {
        return new Date().getFullYear();
    }

    const openModal = () => {
        handleShow()
        setButtonTitle("")
        setHeading("Add new month")
        setContent(()=>{
            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Month:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="number"
                            as="select"
                            ref={register({required: true})}
                        >
                            {monthNames.map((month, index) => (
                                <option value={index+1}>{month}</option>
                            ))}
                        </FormControl>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Year:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="year"
                            type="number"
                            placeholder="Year"
                            aria-label="Year"
                            value={getCurrentYear()}
                            aria-describedby="basic-addon1"
                            ref={register({required: true})}
                            readOnly
                        />
                    </InputGroup>
                    <Button type="submit" variant="success">Add new month</Button>
                </form>
            )
        })
    }

    return(
        <Box>
            <CenterElement>
                <Button variant="info" onClick={openModal}>Add new month</Button>
            </CenterElement>
        </Box>
    )
}

export default NewMonth;