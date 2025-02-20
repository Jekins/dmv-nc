import React, { useState } from 'react';
import { Layout } from 'antd';
import { Menu } from '../Menu';
import { StyledLayout, StyledHeader, StyledContent } from './styles';
import { Test } from '@/features/test';

interface MainLayoutProps {
    children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [selectedTest, setSelectedTest] = useState<string | null>(null);

    const handleTestSelect = (testId: string) => {
        setSelectedTest(testId);
    };

    return (
        <StyledLayout>
            <StyledHeader>
                <Menu onTestSelect={handleTestSelect} />
            </StyledHeader>
            <StyledContent>
                {selectedTest ? <Test testNumber={Number(selectedTest)} /> : children}
            </StyledContent>
        </StyledLayout>
    );
};
