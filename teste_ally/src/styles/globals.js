import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
}
body{
    
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00FF8B;
}
a {
    text-decoration: none;
}
`;

export default GlobalStyle;

export const Row = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  display: flex;
  align-items: ${(props) => props.items || "center"};
  justify-content: ${(props) => props.justify || "center"};
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export const Column = styled.div`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.items || "center"};
  justify-content: ${(props) => props.justify || "center"};
  gap: ${(props) => props.gap};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;
