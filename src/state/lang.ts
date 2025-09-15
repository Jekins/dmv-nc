import { atom } from 'jotai';

export type Lang = 'ru' | 'en';

export const langAtom = atom<Lang>('ru');
