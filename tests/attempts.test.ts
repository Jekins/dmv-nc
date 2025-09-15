import { describe, it, expect, beforeEach } from 'vitest';
import { getDefaultStore } from 'jotai';
import { attemptsAtom, type SectionAttempt } from '../src/state/attempts';

const sampleAttempt: SectionAttempt = {
  status: 'in-progress',
  seed: 1,
  shuffledQuestionIds: ['q1'],
  questions: {},
  correctCount: 0,
  wrongCount: 0,
  percent: 0,
};

describe('attempts storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists attempts to localStorage', () => {
    const store = getDefaultStore();
    store.set(attemptsAtom, (prev) => ({ ...prev, section: sampleAttempt }));
    const raw = localStorage.getItem('dmv-storage');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw || '{}');
    expect(parsed.attempts.section.status).toBe('in-progress');
  });
});
