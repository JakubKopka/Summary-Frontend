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


const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const Value = styled.h5`
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
    const [months, setMonths] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const {handleShow, handleClose, show} = useContext(ModalContext);
    const API_URL = "http://localhost:8080"

    const createAuthHeaders = (token) => {
        return ({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    const token = Cookie.get("token") ? Cookie.get("token") : null;

    useEffect(() => {

        axios.get(`${API_URL}/billing/months`, createAuthHeaders(token))
            .then(response => {
                console.log(response.data)
                setMonths(response.data)
                setLoaded(true);
            })
            .catch(function (error) {
                if (error.response) {
                    // setOpen(true)
                    // setMessage(error.response.data.message)
                    // setStatusCode(error.response.status)
                    // setVariant("danger")
                }
            });
    }, [loaded])

    const openModal = () => {

    }

    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY')
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <Layout>
            {loaded === false ? "Loading" : (
                (months.size > 0 ? (
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
                                        <td>{operation.category}</td>
                                        <td>{operation.amount >= 0 ? (
                                            <PositiveValue>{operation.amount}</PositiveValue>) : (
                                            <NegativeValue>{operation.amount}</NegativeValue>)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <TotalBox>
                                <div>
                                    <Button variant="primary">Add</Button>
                                </div>
                                <div>
                                    Total {month.total >= 0 ? (
                                    <PositiveValue>{Number(month.total).toFixed(2)}</PositiveValue>) : (
                                    <NegativeValue>{Number(month.total).toFixed(2)}</NegativeValue>)}
                                </div>
                            </TotalBox>
                        </Box>
                    )))
                ) : (
                    <>
                        <h3>No data in db!</h3>
                        Please add new month!
                        <Button variant="success" onClick={handleShow}> Add new month! </Button>
                    </>
                ))

            )}
            {loaded === false ? "Loading" : (
                (months.map((month) => (
                    <Box id={month.monthId}>
                        <h2>{monthNames[month.number - 1]} {month.year}</h2>
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
                                    <td>{operation.category}</td>
                                    <td>{operation.amount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <div>Total {month.total}</div>
                    </Box>
                )))
            )}
        </Layout>
    )
}

export default MySummary;