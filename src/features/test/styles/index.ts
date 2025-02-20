import styled from 'styled-components';
import { Card, Button, Space } from 'antd';

export const StyledCard = styled(Card)`
    background: ${({ theme }) =>
        `linear-gradient(${theme.token.colorBgContainer}, ${theme.token.colorBgElevated})`};
    border-radius: ${({ theme }) => theme.token.borderRadiusLG}px;
    box-shadow: ${({ theme }) => theme.token.boxShadowSecondary};
`;

export const AnswerButton = styled(Button)`
    width: 100%;
    text-align: left;
    padding: ${({ theme }) => `${theme.token.paddingXS}px ${theme.token.paddingLG}px`};
    height: auto;
    min-height: 40px;
    border-radius: ${({ theme }) => theme.token.borderRadiusLG}px;
    margin-bottom: ${({ theme }) => theme.token.marginXXS}px;
    transition: all ${({ theme }) => theme.token.motionDurationMid};
    display: flex;
    align-items: center;
    font-size: 14px;

    &:hover {
        border-color: ${({ theme }) => theme.token.colorPrimary};
    }

    &[disabled] {
        background: ${({ theme }) => theme.token.colorBgContainerDisabled};
    }

    .anticon {
        margin-right: ${({ theme }) => theme.token.marginXS}px;
    }

    &[type='primary'] {
        justify-content: center;
        text-align: center;
        margin-top: ${({ theme }) => theme.token.marginSM}px;
    }
`;

export const FullWidthSpace = styled(Space)`
    width: 100%;
`;
