import { useLang } from '../utils/i18n';

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
      className="px-2"
    >
      {lang.toUpperCase()}
    </button>
  );
}
