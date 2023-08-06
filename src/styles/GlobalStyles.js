import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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
`;

export default GlobalStyles;