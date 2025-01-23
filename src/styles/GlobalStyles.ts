'use client'

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #ededed;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  h1 {
    font-weight: 500;
  }

  h2 {
    font-size: 20px;
    color: white;
    letter-spacing: 0.5px;
    font-weight: 600px;
  }

  p {
    fot-size: 16px;
  }
`;
