import React, {useContext, useEffect, useState} from "react";
import Layout from "./layout/layout";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AlertContext from "./context/alert-context";
import Months from "./months";
import Categories from "./categories";
import {getAllBilling} from "../api/billing";


const Summary = () => {
    const [months, setMonths] = useState({});
    const [categories, setCategories] = useState({});
    const [loadedData, setLoadedData] = useState(false);
    const {setOpen, setMessage, setStatusCode, setVariant} = useContext(AlertContext);
    const [key, setKey] = useState('months');

    useEffect(() => {
        getAllBilling().then(response => {
                setMonths(response.data.months)
                setCategories(response.data.categories)
                setLoadedData(true);
            })
            .catch(function (error) {
                if (error.response) {
                    setOpen(true)
                    setMessage(error.response.data.message)
                    setStatusCode(error.response.status)
                    setVariant("danger")
                }
            });
    }, [key])

    return (
        <Layout>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="months" title="Months">
                    <Months months={months} categories={categories} loadedData={loadedData} setMonths={setMonths}/>
                </Tab>
                <Tab eventKey="categories" title="Categories">
                    <Categories categories={categories} loadedData={loadedData}
                                setCategories={setCategories}/>
                </Tab>
            </Tabs>
        </Layout>
    )
}

export default Summary
