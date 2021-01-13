import React from "react";
import styled from "styled-components";
import Menu from "./menu";

const Wrapper = styled.div`
  width: 70%;
  margin: 50px 100px;
  display: flex;
  justify-content: space-between;
`

const Logo = styled.h1`

`

const Header = (props) => {

    return (
        <Wrapper>
            <Logo>Summary</Logo>
            <Menu/>
        </Wrapper>
    )
}

export default Header;