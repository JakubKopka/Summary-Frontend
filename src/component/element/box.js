import styled from "styled-components";


export const Box = styled.div`
  width: 100%;
  padding: 30px;
  margin-bottom: 20px;
  background-color: rgb(255, 255, 255);
  color: rgb(21, 23, 26);
  border-radius: 13px;
  box-shadow: rgba(21, 23, 26, 0.05) 0px 0.05rem 0.14rem 0px, rgba(21, 23, 26, 0.05) 0px 0.2rem 0.4rem 0px, rgba(21, 23, 26, 0.04) 0px -1px 0px 0px;
  transition: box-shadow 200ms cubic-bezier(0.4, 0.3, 0.8, 0.6) 0s;
`

export const BottomElements = styled.div`
  //margin-top: 15px;
  display: flex;
  justify-content: space-between;
`

export const CenterElement = styled(BottomElements)`
  //margin-top: 30px;      
  justify-content: center;
  align-items: center;
  flex-direction: column;
`