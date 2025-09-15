import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Section from './pages/Section';
import Results from './pages/Results';
import { Provider } from 'jotai';
import { LangToggle } from './components/LangToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { useAtomValue } from 'jotai';
import { themeAtom } from './state/theme';

function Layout({ children }: { children: React.ReactNode }) {
  const theme = useAtomValue(themeAtom);
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <header className="p-4 flex justify-end space-x-2">
          <ThemeToggle />
          <LangToggle />
        </header>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section/:id" element={<Section />} />
            <Route path="/section/:id/results" element={<Results />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
