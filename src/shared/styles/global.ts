import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    #root {
        min-height: 100vh;
    }

    .text-center {
        text-align: center !important;
    }

    .full-width {
        width: 100% !important;
    }
`;
