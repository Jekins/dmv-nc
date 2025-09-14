import { sections } from '../data';
import { attemptsAtom } from '../state/attempts';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { shuffle } from '../utils/shuffle';
import { useT } from '../utils/i18n';

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
  const reset = (id: string) =>
    setAttempts((prev) => {
      const cp = { ...prev };
      delete cp[id];
      return cp;
    });

  return (
    <div className="p-4 space-y-4">
      {Object.entries(sections).map(([id, s]) => {
        const attempt = attempts[id];
        const total = s.questions.length;
        let info = `0/${total}`;
        let action = 'start';
        if (attempt) {
          const answered = Object.keys(attempt.questions).length;
          if (attempt.status === 'in-progress') {
            info = `${answered}/${total}`;
            action = 'continue';
          } else {
            info = `${attempt.correctCount}/${total}`;
            action = 'results';
          }
        }
        return (
          <div
            key={id}
            className="border rounded p-4 shadow-sm flex justify-between items-center"
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
    </div>
  );
}
