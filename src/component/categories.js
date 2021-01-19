import {Button, FormControl, InputGroup, Spinner, Table} from "react-bootstrap";
import {Box, CenterElement} from "./element/box";
import React, {useContext} from "react";
import ModalContext from "./context/modal-context";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import AlertContext from "./context/alert-context";
import Loader from "./element/loader";
import {addCategory, updateCategory} from "../api/category";
import {EditIcon} from "./element/icons";

const Value = styled.span`
`
const PositiveValue = styled(Value)`
  color: green;
`
const NegativeValue = styled(Value)`
  color: red;
`

const Categories = (props) => {
    const {categories, setCategories, loadedData} = props;
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const {
        handleShow,
        handleClose,
        setContent,
        setHeading,
        setButtonTitle,
    } = useContext(ModalContext);
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        addCategory(data).then(response => {
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
        setContent(() => {
            return (
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
                    <CenterElement>
                        <Button type="submit" variant="success">Add new category</Button>
                    </CenterElement>
                </form>
            )
        })
    }

    const onSubmitEditCategory = (data, categoryId) => {
        updateCategory(data, categoryId).then(response => {
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

    const editCategory = (categoryId) => {
        const category = categories.filter(obj => obj.categoryId === categoryId)[0]
        handleShow()
        setHeading("Edit category (" + category.name +")")
        setContent(() => {
            return (
                <form onSubmit={handleSubmit((data)=>onSubmitEditCategory(data, categoryId))}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="name"
                            placeholder="Your category name"
                            aria-label="Your category name"
                            aria-describedby="basic-addon1"
                            defaultValue={category.name}
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
                            placeholder="Your category description"
                            aria-label="Your category description"
                            aria-describedby="basic-addon1"
                            defaultValue={category.description}
                            ref={register({required: true})}
                        />
                    </InputGroup>
                    <CenterElement>
                        <Button type="submit" variant="success">Save category</Button>
                    </CenterElement>
                </form>
            )
        })
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
                {loadedData === false ? (<Loader/>) : (
                    (categories.length > 0 ? (categories.map((category) => (
                            <tr>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.total >= 0 ? (
                                    <PositiveValue>{Number(category.total).toFixed(2)}</PositiveValue>) : (
                                    <NegativeValue>{Number(category.total).toFixed(2)}</NegativeValue>)}
                                </td>
                                <td>
                                    <Button variant={"warning"} size="sm" onClick={()=> editCategory(category.categoryId)}>
                                        <EditIcon/>
                                    </Button>
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
            <CenterElement>
                <Button variant="success" onClick={openModal}> Add new category </Button>
            </CenterElement>
        </Box>
    )
}

export default Categories
