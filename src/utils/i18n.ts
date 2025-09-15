import { useAtomValue, useSetAtom } from 'jotai';
import { langAtom } from '../state/lang';
import type { LocalizedString } from '../types';

export function useT() {
  const lang = useAtomValue(langAtom);
  return (s: LocalizedString) => s[lang];
}

export function useLang() {
  const lang = useAtomValue(langAtom);
  const setLang = useSetAtom(langAtom);
  return { lang, setLang };
}
