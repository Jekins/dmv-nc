import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type QuestionAttempt = {
  selectedIndices: number[];
  isCorrect: boolean;
  answeredAt: string;
};

export type SectionAttempt = {
  status: 'not-started' | 'in-progress' | 'finished';
  seed: number;
  shuffledQuestionIds: string[];
  questions: Record<string, QuestionAttempt>;
  correctCount: number;
  wrongCount: number;
  percent: number;
};

export type StorageShape = {
  version: 1;
  attempts: Record<string, SectionAttempt>;
};

const storageKey = 'dmv-storage';
const initial: StorageShape = { version: 1, attempts: {} };

function migrate(value: unknown): StorageShape {
  if (typeof value === 'object' && value) {
    const v = value as Partial<StorageShape>;
    if (v.version === 1 && v.attempts) {
      return v as StorageShape;
    }
  }
  return initial;
}

export const storageAtom = atomWithStorage<StorageShape>(
  storageKey,
  initial,
  {
    getItem: (key, initialValue) => {
      const raw = localStorage.getItem(key);
      if (!raw) return initialValue;
      try {
        return migrate(JSON.parse(raw));
      } catch {
        return initialValue;
      }
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  },
  { getOnInit: true },
);

export const attemptsAtom = atom(
  (get) => get(storageAtom).attempts,
  (
    get,
    set,
    updater: (
      prev: Record<string, SectionAttempt>,
    ) => Record<string, SectionAttempt>,
  ) => {
    const curr = get(storageAtom);
    set(storageAtom, { ...curr, attempts: updater(curr.attempts) });
  },
);
