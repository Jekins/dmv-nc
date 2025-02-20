import { createGlobalStyle } from 'styled-components';

export const TestStyles = createGlobalStyle`
    .loading-icon {
        font-size: 48px;
        color: ${({ theme }) => theme.token.colorPrimary};
    }

    .question-title.ant-typography {
        font-size: 18px;
        margin-bottom: 16px;
    }

    .ant-space-middle {
        gap: 16px !important;
    }

    .error-icon {
        color: ${({ theme }) => theme.token.colorError};
    }

    .error-card {
        border-left: 4px solid ${({ theme }) => theme.token.colorError};
    }
`;
