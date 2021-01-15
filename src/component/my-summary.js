import React, {useContext, useEffect, useState} from "react";
import Layout from "./layout/layout";
import Cookie from "js-cookie";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AlertContext from "./context/alert-context";
import Months from "./months";
import Categories from "./categories";


const MySummary = () => {
    const [months, setMonths] = useState({});
    const [categories, setCategories] = useState({});

    const [loadedMonths, setLoadedMonths] = useState(false);
    const [loadedCategories, setLoadedCategories] = useState(false);
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


    return (
        <Layout>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="months" title="Months">
                    <Months months={months} loadedMonths={loadedMonths} setMonths={setMonths}/>
                </Tab>
                <Tab eventKey="categories" title="Categories">
                    <Categories categories={categories} loadedCategories={loadedCategories} setCategories={setCategories}/>
                </Tab>
            </Tabs>
        </Layout>
    )
}

export default MySummary
