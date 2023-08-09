import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  body{
    margin: 0;
  }
  a {
    text-decoration: none;
    color: black;
  }
  button{
    background: none;
    border: none;
    cursor: pointer;
  }
  input{
    background: none;
    border: none;
  }
`;

export default GlobalStyles;