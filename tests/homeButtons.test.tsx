import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider, getDefaultStore } from 'jotai';
import { MemoryRouter } from 'react-router-dom';
import Home from '../src/pages/Home';
import { attemptsAtom } from '../src/state/attempts';
import { sections } from '../src/data';
import { langAtom } from '../src/state/lang';

describe('home buttons', () => {
  const id = Object.keys(sections)[0];
  const section = sections[id];

  it('shows Start when not started', () => {
    const store = getDefaultStore();
    store.set(langAtom, 'en');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
    cleanup();
  });

  it('shows Continue when in progress', () => {
    const store = getDefaultStore();
    store.set(langAtom, 'en');
    store.set(attemptsAtom, (prev) => ({
      ...prev,
      [id]: {
        status: 'in-progress',
        seed: 0,
        shuffledQuestionIds: section.questions.map((q) => q.id),
        questions: {},
        correctCount: 0,
        wrongCount: 0,
        percent: 0,
      },
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Continue')).toBeInTheDocument();
    cleanup();
  });

  it('shows Results and Reset when finished', () => {
    const store = getDefaultStore();
    store.set(langAtom, 'en');
    store.set(attemptsAtom, (prev) => ({
      ...prev,
      [id]: {
        status: 'finished',
        seed: 0,
        shuffledQuestionIds: section.questions.map((q) => q.id),
        questions: {},
        correctCount: 0,
        wrongCount: 0,
        percent: 0,
      },
    }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    cleanup();
  });
});
