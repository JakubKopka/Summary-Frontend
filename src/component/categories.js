import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import {Box} from "./element/box";
import React, {useContext} from "react";
import ModalContext from "./context/modal-context";
import styled from "styled-components";
import axios from "axios";
import Cookie from "js-cookie";
import {useForm} from "react-hook-form";
import AlertContext from "./context/alert-context";
import {PasswordIcon, UserIcon} from "./element/icons";

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const Value = styled.span`
`
const PositiveValue = styled(Value)`
  color: green;
`
const NegativeValue = styled(Value)`
  color: red;
`

const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Categories = (props) => {
    const {categories, setCategories, loadedCategories} = props;
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const { handleShow, handleClose, content, setContent, setHeading, setButtonTitle, setButtonFunction} = useContext(ModalContext);
    const {register, handleSubmit} = useForm();

    const createAuthHeaders = (token) => {
        return ({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    const onSubmit = (data) => {
        const API_URL = "http://localhost:8080"
        console.log(data)
        axios.post(`${API_URL}/category/add`, data, createAuthHeaders(token))
            .then(response => {
                console.log(response.data)
                setCategories(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setStatusCode(error.response.status)
                    setVariant("danger")
                }
            });
        handleClose()
    }

    const openModal = () => {
        handleShow()
        setButtonTitle("")
        setHeading("Add new category")
        setContent(()=>{
            return(
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="name"
                            placeholder="Your new category name"
                            aria-label="Your new category name"
                            aria-describedby="basic-addon1"
                            ref={register({required: true})}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Description:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="description"
                            type="text"
                            placeholder="Your new category description"
                            aria-label="Your new category description"
                            aria-describedby="basic-addon1"
                            ref={register({required: true})}
                        />
                    </InputGroup>
                    <Button type="submit" variant="success">Add new category</Button>
                </form>
            )
        })
        // setButtonFunction(()=>{
        //     axios.post(`${API_URL}/category/add`, data, createAuthHeaders(token))
        //         .then(response => {
        //             console.log(response.data)
        //
        //         })
        //         .catch(function (error) {
        //             if (error.response) {
        //                 setOpen(true)
        //                 setMessage(error.response.data.message)
        //                 setStatusCode(error.response.status)
        //                 setVariant("danger")
        //             }
        //         });
        // })
    }
    return (
        <Box>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Category name</th>
                    <th>Description</th>
                    <th>Total amount</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {loadedCategories === false ? "Loading" : (
                    (categories.length > 0 ? (categories.map((category) => (
                            <tr>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.total >= 0 ? (
                                    <PositiveValue>{Number(category.total).toFixed(2)}</PositiveValue>) : (
                                    <NegativeValue>{Number(category.total).toFixed(2)}</NegativeValue>)}
                                </td>
                                <td>
                                    <Button variant={"warning"} size="sm">Edit</Button>
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="4"> No data!</td>
                            </tr>
                        )
                    ))
                }
                </tbody>
            </Table>
            <Button variant="success" onClick={openModal}> Add new category </Button>
        </Box>
    )
}

export default Categories
