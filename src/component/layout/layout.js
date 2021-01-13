import React, {useContext} from "react";
import styled from "styled-components";
import Header from "../element/header";
import Content from "../element/content";
import AlertComponent from "../element/alert-component";
import {Modal} from "react-bootstrap";
import ModalBox from "../element/modal-box";

const Wrapper = styled.div`
  background-color: rgb(246 247 248);
  //background-repeat: no-repeat;
  //background-attachment: fixed;
  //background-position: center;
  //background-size: cover;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Layout = (props) => {
    return (
        <Wrapper>
            <Header/>
            <AlertComponent/>
            <Content>
                {props.children}
            </Content>
            <ModalBox/>
        </Wrapper>
    )
}

export default Layout;