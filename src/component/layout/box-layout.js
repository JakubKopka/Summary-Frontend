import React from "react";
import styled from 'styled-components'
import AlertComponent from "../element/alert-component";
import {Box} from "../element/box";

const Wrapper = styled.div`
  background: rgb(246, 247, 248);
  width: 100vw;
  height: 100vh;
  text-align: center;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Box} {
    width: 500px;
  }
`

const LoginText = styled.h2`
  margin-bottom: 30px;
`


const BoxLayout = (props) => {
    return (
        <Wrapper>
            <Box>
                <LoginText>{props.textHeader}</LoginText>
                {props.children}
            </Box>
            <AlertComponent/>
        </Wrapper>
    );
}

export default BoxLayout;