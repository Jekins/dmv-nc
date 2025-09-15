import { sections } from '../data';
import { attemptsAtom } from '../state/attempts';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { shuffle } from '../utils/shuffle';
import { useT } from '../utils/i18n';
import { isPassed } from '../utils/score';
import Celebration from '../components/Celebration';
import { useEffect, useState } from 'react';

const LABELS = {
  start: { en: 'Start', ru: 'Начать' },
  continue: { en: 'Continue', ru: 'Продолжить' },
  results: { en: 'Results', ru: 'Результаты' },
  reset: { en: 'Reset', ru: 'Заново' },
};

export default function Home() {
  const t = useT();
  const [attempts, setAttempts] = useAtom(attemptsAtom);
  const navigate = useNavigate();
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const allPassed =
      Object.keys(sections).length > 0 &&
      Object.entries(sections).every(([id, s]) => {
        const a = attempts[id];
        return (
          a &&
          a.status === 'finished' &&
          isPassed(a.correctCount, s.questions.length)
        );
      });
    if (allPassed) setShowCongrats(true);
  }, [attempts]);

  const start = (id: string) => {
    const section = sections[id];
    const seed = Date.now();
    const order = shuffle(
      section.questions.map((q) => q.id),
      seed,
    );
    setAttempts((prev) => ({
      ...prev,
      [id]: {
        status: 'in-progress',
        seed,
        shuffledQuestionIds: order,
        questions: {},
        correctCount: 0,
        wrongCount: 0,
        percent: 0,
      },
    }));
    navigate(`/section/${id}`);
  };

  const cont = (id: string) => navigate(`/section/${id}`);
  const results = (id: string) => navigate(`/section/${id}/results`);
  const reset = (id: string) => {
    if (confirm('Reset attempt?'))
      setAttempts((prev) => {
        const cp = { ...prev };
        delete cp[id];
        return cp;
      });
  };

  return (
    <div className="p-4 space-y-4">
      {Object.entries(sections).map(([id, s]) => {
        const attempt = attempts[id];
        const total = s.questions.length;
        let info = t({ en: `0/${total}`, ru: `0/${total}` });
        let action: 'start' | 'continue' | 'results' = 'start';
        let highlight = '';
        if (attempt) {
          const answered = Object.keys(attempt.questions).length;
          if (attempt.status === 'in-progress') {
            info = t({
              en: `In progress ${answered}/${total}`,
              ru: `В процессе ${answered}/${total}`,
            });
            action = 'continue';
          } else {
            info = `${attempt.percent}%`;
            action = 'results';
            const pass = isPassed(attempt.correctCount, total);
            highlight = pass
              ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
              : 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
          }
        }
        return (
          <div
            key={id}
            className={`border rounded p-4 shadow-sm flex justify-between items-center ${highlight}`}
          >
            <div>
              <h2 className="font-semibold">{t(s.chapter)}</h2>
              <p>{info}</p>
            </div>
            {action === 'start' && (
              <button
                onClick={() => start(id)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {t(LABELS.start)}
              </button>
            )}
            {action === 'continue' && (
              <button
                onClick={() => cont(id)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {t(LABELS.continue)}
              </button>
            )}
            {action === 'results' && (
              <div className="space-x-2">
                <button
                  onClick={() => results(id)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {t(LABELS.results)}
                </button>
                <button
                  onClick={() => reset(id)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  {t(LABELS.reset)}
                </button>
              </div>
            )}
          </div>
        );
      })}
      {showCongrats && <Celebration onClose={() => setShowCongrats(false)} />}
    </div>
  );
}
