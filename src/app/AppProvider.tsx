import React from 'react';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import type { GlobalToken } from 'antd/es/theme';
import { themeConfig } from '@/theme';
import { GlobalStyle } from '@/shared/styles/global';
import { TestStyles } from '@/features/test/styles/theme';
import { BrowserRouter } from 'react-router-dom';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = themeConfig.token as GlobalToken;

    return (
        <BrowserRouter>
            <ConfigProvider theme={themeConfig}>
                <ThemeProvider theme={{ token }}>
                    <GlobalStyle />
                    <TestStyles />
                    {children}
                </ThemeProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};
