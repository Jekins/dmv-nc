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

    .error-icon {
        color: ${({ theme }) => theme.token.colorError};
    }

    .error-card {
        border-left: 4px solid ${({ theme }) => theme.token.colorError};
    }

    .ant-typography.ant-typography-h2 {
        margin-bottom: 24px;
        font-size: 24px;
        font-weight: 500;
    }

    .ant-progress-text {
        font-size: 14px;
        font-weight: 500;
    }

    .question-title.ant-typography {
        font-size: 18px;
        margin-bottom: 16px;
    }

    .ant-space-middle {
        gap: 16px !important;
    }
`;
