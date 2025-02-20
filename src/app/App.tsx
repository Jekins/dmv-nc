import { MainLayout } from '@/components/Layout/MainLayout';
import { Test } from '@/features/test';
import { AppProvider } from './AppProvider';
import { BrowserRouter } from 'react-router-dom';

export function App() {
    return (
        <BrowserRouter basename='/dmv-nc'>
            <AppProvider>
                <MainLayout>
                    <Test testNumber={1} />
                </MainLayout>
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;
