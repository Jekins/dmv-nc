import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider, getDefaultStore } from 'jotai';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Section from '../src/pages/Section';
import { attemptsAtom } from '../src/state/attempts';
import { sections } from '../src/data';
import { langAtom } from '../src/state/lang';

describe('navigation guard', () => {
  it('prevents skipping unanswered questions', () => {
    const store = getDefaultStore();
    store.set(langAtom, 'en');
    const id = Object.keys(sections)[0];
    const section = sections[id];
    const order = section.questions.map((q) => q.id);
    store.set(attemptsAtom, (prev) => ({
      ...prev,
      [id]: {
        status: 'in-progress',
        seed: 0,
        shuffledQuestionIds: order,
        questions: {},
        correctCount: 0,
        wrongCount: 0,
        percent: 0,
      },
    }));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/section/${id}?q=1`]}>
          <Routes>
            <Route path="/section/:id" element={<Section />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByText(section.questions[0].question.en),
    ).toBeInTheDocument();
  });
});
