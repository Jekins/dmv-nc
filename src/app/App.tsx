import { MainLayout } from '@/components/Layout/MainLayout';
import { Test } from '@/features/test';
import { AppProvider } from './AppProvider';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

export function App() {
    return (
        <BrowserRouter basename='/dmv-nc'>
            <ConfigProvider>
                <AppProvider>
                    <MainLayout>
                        <Test testNumber={1} />
                    </MainLayout>
                </AppProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;
