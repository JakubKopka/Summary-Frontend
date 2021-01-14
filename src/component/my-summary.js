import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "./layout/layout";
import {Box} from "./element/box";
import {Button, Table} from "react-bootstrap";
import {login} from "../api/auth";
import Cookie from "js-cookie";
import axios from "axios";
import moment from "moment";
import ModalBox from "./element/modal-box";
import ModalContext from "./context/modal-context";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AlertContext from "./context/alert-context";


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

const MySummary = () => {
    const [months, setMonths] = useState({});
    const [categories, setCategories] = useState({});

    const [loadedMonths, setLoadedMonths] = useState(false);
    const [loadedCategories, setLoadedCategories] = useState(false);
    const {handleShow, handleClose, show} = useContext(ModalContext);
    const API_URL = "http://localhost:8080"
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const [key, setKey] = useState('months');

    const createAuthHeaders = (token) => {
        return ({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    useEffect(() => {

        if (key === "months") {
            axios.get(`${API_URL}/month/all`, createAuthHeaders(token))
                .then(response => {
                    console.log(response.data)
                    setMonths(response.data)
                    setLoadedMonths(true);
                })
                .catch(function (error) {
                    if (error.response) {
                        setOpen(true)
                        setMessage(error.response.data.message)
                        setStatusCode(error.response.status)
                        setVariant("danger")
                    }
                });
        }
        if (key === "categories") {
            axios.get(`${API_URL}/category/all`, createAuthHeaders(token))
                .then(response => {
                    console.log(response.data)
                    setCategories(response.data)
                    setLoadedCategories(true);
                })
                .catch(function (error) {
                    if (error.response) {
                        setOpen(true)
                        setMessage(error.response.data.message)
                        setStatusCode(error.response.status)
                        setVariant("danger")
                    }
                });
        }

    }, [key])

    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY')
    }

    return (
        <Layout>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="months" title="Months">
                    {loadedMonths === false ? "Loading" : (
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

                    )}

                </Tab>
                <Tab eventKey="categories" title="Categories">
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
                    </Box>
                </Tab>
            </Tabs>
        </Layout>
    )
}

export default MySummary
