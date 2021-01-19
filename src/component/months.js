import {Box, CenterElement} from "./element/box";
import {Button, FormControl, InputGroup, Spinner, Table} from "react-bootstrap";
import React, {useContext} from "react";
import ModalContext from "./context/modal-context";
import styled from "styled-components";
import moment from "moment";
import AlertContext from "./context/alert-context";
import {useForm} from "react-hook-form";
import NewMonth from "./new-month";
import Loader from "./element/loader";
import {TrashIcon} from "./element/icons";
import {addOperation, deleteOperation} from "../api/operation";

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

export const  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const Months = (props) => {
    const {loadedData, months, setMonths, categories} = props;
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const {
        handleShow,
        handleClose,
        setContent,
        setHeading,
        setButtonTitle,
    } = useContext(ModalContext);
    const {register, handleSubmit} = useForm();

    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY')
    }

    const getFirstDayOfMonth = (year, month) => {
        if (month < 10) {
            month = '0' + month
        }
        return year + '-' + month + '-01'
    }
    const getLastDayOfMonth = (year, month) => {
        const date = new Date(`${year}-${month}-01`)
        let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let day = lastDayOfMonth.getDate();
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return year + '-' + month + '-' + day
    }

    const onSubmit = (data, monthId) => {
            addOperation(data, monthId).then(response => {
                setMonths(response.data)
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

    const openModal = ({year, number, monthId}) => {
        handleShow()
        setButtonTitle("")
        setHeading("Add new operation to " + (number < 10 ? ("0" + number) : (number)) + "." + year)
        setContent(() => {
            return (
                <form onSubmit={handleSubmit((data) => onSubmit(data, monthId))}>
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
                            min={getFirstDayOfMonth(year, number)}
                            max={getLastDayOfMonth(year, number)}
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
                            ref={register({required: true})}
                        >
                            {categories.map((category) => (
                                <option value={category.categoryId}>{category.name}</option>
                            ))}
                        </FormControl>
                    </InputGroup>
                    <CenterElement>
                        <Button type="submit" variant="success">Add new operation</Button>
                    </CenterElement>
                </form>
            )
        })
    }

    const deleteOperationByOperationId = (operationId) => {
        deleteOperation(operationId).then(response => {
                setMonths(response.data)
            }).catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setStatusCode(error.response.status)
                    setVariant("danger")
                }
            });
    }

    return (
        (loadedData === false ? (<Loader/>) : (
            (months.length > 0 ? (
                <>
                    {months.map((month) => (
                        <Box id={month.monthId}>
                            <BoxHeader>
                                <h2>{monthNames[month.number - 1]}</h2>
                                <h2>{month.year}</h2>
                            </BoxHeader>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th></th>
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
                                        <td>
                                            <Button variant={"danger"} size="sm" onClick={()=>deleteOperationByOperationId(operation.operationId)}><TrashIcon/></Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3"> Total:</td>
                                    <td>{month.total >= 0 ? (
                                        <PositiveValue>{Number(month.total).toFixed(2)}</PositiveValue>) : (
                                        <NegativeValue>{Number(month.total).toFixed(2)}</NegativeValue>)}
                                    </td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </Table>
                            <CenterElement>
                                <Button variant="success" onClick={() => openModal(month)}>Add new operation</Button>
                            </CenterElement>
                        </Box>
                    ))
                    }
                    <NewMonth setMonths={setMonths}/>
                </>
            ) : (
                <NewMonth setMonths={setMonths}/>
            ))

        ))
    )
}

export default Months
