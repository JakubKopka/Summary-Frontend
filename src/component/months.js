import {Box} from "./element/box";
import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import React, {useContext} from "react";
import ModalContext from "./context/modal-context";
import styled from "styled-components";
import moment from "moment";
import AlertContext from "./context/alert-context";
import {useForm} from "react-hook-form";
import axios from "axios";
import Cookie from "js-cookie";

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

const Months = (props) => {
    const {loadedMonths, months, setMonths} = props;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const {handleShow, handleClose, content, setContent, setHeading, setButtonTitle, setButtonFunction} = useContext(ModalContext);
    const {register, handleSubmit} = useForm();

    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY')
    }
    const createAuthHeaders = (token) => {
        return ({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    const getFirstDayOfMonth = (year, month) => {
        const date = new Date(`${year}-${month}-01`)
        let day = date.getDay()-1
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return year + '-' + month + '-' + day
    }
    const getLastDayOfMonth = (year, month) => {
        const date = new Date(year, month+1, 0)
        let day = date.getDay()-1
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return year + '-' + month + '-' + day
    }

    const setMinMaxDate = (year, month) => {
        const element = document.getElementById("date");
        element.setAttribute("min", getFirstDayOfMonth(year, month))
        element.setAttribute("max", getLastDayOfMonth(year, month))

    }

    const onSubmit = (data) => {
        const API_URL = "http://localhost:8080"
        console.log(data)
        // axios.post(`${API_URL}/month/add`, data, createAuthHeaders(token))
        //     .then(response => {
        //         console.log(response.data)
        //         setMonths(response.data)
        //     })
        //     .catch(function (error) {
        //         if (error.response) {
        //             setOpen(true)
        //             setMessage(error.response.data.message)
        //             setStatusCode(error.response.status)
        //             setVariant("danger")
        //         }
        //     });
        handleClose()
    }

    const openModal = () => {
        // setMinMaxDate(year, number)
        handleShow()
        setButtonTitle("")
        setHeading("Add new operation")
        setContent(() => {
            return (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Amount:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="Amount"
                            aria-label="Amount"
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
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            ref={register({required: true})}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Date:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            id="date"
                            name="date"
                            type="date"
                            placeholder="Date"
                            aria-label="Date"
                            aria-describedby="basic-addon1"
                            ref={register({required: true})}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Category:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="categoryId"
                            as="select"
                            custom
                            // onChange={}
                            ref={register({required: true})}
                        >
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="black">Black</option>
                            <option value="orange">Orange</option>
                        </FormControl>
                    </InputGroup>

                    <Button type="submit" variant="success">Add new amount</Button>
                </form>
            )
        })
    }

    return (
        (loadedMonths === false ? "Loading" : (
            (months.length > 0 ? (
                (months.map((month) => (
                            <Box id={month.monthId}>
                                <BoxHeader>
                                    <h2>{month.year}</h2>
                                    <h2>{monthNames[month.number - 1]}</h2>
                                </BoxHeader>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {month.operationList.map((operation) => (
                                        <tr>
                                            <td>{formatDate(operation.date)}</td>
                                            <td>{operation.description}</td>
                                            <td>{operation.category.name}</td>
                                            <td>
                                                {operation.amount >= 0 ? (
                                                    <PositiveValue>{operation.amount}</PositiveValue>) : (
                                                    <NegativeValue>{operation.amount}</NegativeValue>)}
                                            </td>
                                            {/*<td>*/}
                                            {/*    <Button variant={"warning"} size="sm">Edit</Button>*/}
                                            {/*    <Button variant={"danger"} size="sm">Delete</Button>*/}
                                            {/*</td>*/}
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3"> Total:</td>
                                        <td>{month.total >= 0 ? (
                                            <PositiveValue>{Number(month.total).toFixed(2)}</PositiveValue>) : (
                                            <NegativeValue>{Number(month.total).toFixed(2)}</NegativeValue>)}
                                        </td>
                                        {/*<td></td>*/}
                                    </tr>
                                    </tbody>
                                </Table>
                                <Button variant="success" onClick={openModal}>Add new operation</Button>
                            </Box>
                        )
                    )
                )
            ) : (
                <Box>
                    <h3>No data in db!</h3>
                    Please add new month!
                    <Button variant="success" onClick={handleShow}> Add new month! </Button>
                </Box>
            ))

        ))
    )

}

export default Months
