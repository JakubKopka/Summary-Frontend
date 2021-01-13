import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 70%;
  word-break: break-word;
`

const Content = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Content;