import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import type { GlobalToken } from 'antd/es/theme';
import { themeConfig } from '@/theme';
import { GlobalStyle } from '@/shared/styles/global';
import { TestStyles } from '@/features/test/styles/theme';
import { ReactNode } from 'react';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const token = themeConfig.token as GlobalToken;

    return (
        <ConfigProvider theme={themeConfig}>
            <ThemeProvider theme={{ token }}>
                <GlobalStyle />
                <TestStyles />
                {children}
            </ThemeProvider>
        </ConfigProvider>
    );
};
