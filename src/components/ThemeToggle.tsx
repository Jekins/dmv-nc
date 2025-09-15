import { useAtom } from 'jotai';
import { themeAtom } from '../state/theme';

export function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="px-2"
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  );
}
