import React from "react";
import Layout from "./layout/layout";
import {Box, CenterBox} from "./element/box";
import {Col, Image} from "react-bootstrap";

const Home = () => {
    return (
        <Layout>
            <Box>
                <h2>Welcome at Summary.space</h2>
                <Col xs={6} md={6}>
                    <CenterBox>
                        <Image
                            src="https://cdn.icon-icons.com/icons2/1172/PNG/512/1489436625-chartmoneydollarcurrency_81885.png"
                            rounded fluid/>
                    </CenterBox>
                </Col>
            </Box>
        </Layout>
    )
}

export default Home;