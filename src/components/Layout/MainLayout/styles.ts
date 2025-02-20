import styled from 'styled-components';
import { Layout } from 'antd';

export const StyledLayout = styled(Layout)`
    min-height: 100vh;
`;

export const StyledHeader = styled(Layout.Header)`
    padding: 0;
    line-height: 64px;
`;

export const StyledContent = styled(Layout.Content)`
    padding: 24px;
    margin-top: 16px;
    background: ${({ theme }) => theme.token.colorBgLayout};
    display: flex;
    justify-content: center;
    align-items: flex-start;

    > * {
        max-width: 800px;
        width: 100%;
    }
`;
