import React from "react";
import Layout from "./layout/layout";
import {Box, CenterElement} from "./element/box";
import {Button, Col, Figure, Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";
import styled from "styled-components";

const JumbotronButtons = styled.div`
  display: flex;
  justify-content: space-between;
`
const Home = () => {
    return (
        <Layout>
                <Jumbotron>
                    <h1>Welcome at Summary!</h1>
                    <p>
                        You cane save your money with our application!
                        Create free account or login.
                    </p>
                    <JumbotronButtons>
                        <Link to="/register">
                            <Button variant="primary">Create new account</Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="info">I have account</Button>
                        </Link>
                    </JumbotronButtons>
                </Jumbotron>
        </Layout>
    )
}

export default Home;