import { useParams, useNavigate } from 'react-router-dom';
import { sections } from '../data';
import { useAtom } from 'jotai';
import { attemptsAtom } from '../state/attempts';
import { useT } from '../utils/i18n';
import { isPassed } from '../utils/score';

export default function ResultsPage() {
  const { id } = useParams();
  const section = id ? sections[id] : undefined;
  const [attempts] = useAtom(attemptsAtom);
  const attempt = id ? attempts[id] : undefined;
  const t = useT();
  const navigate = useNavigate();

  if (!section || !id || !attempt) return <div className="p-4">Not found</div>;
  if (attempt.status !== 'finished') {
    navigate(`/section/${id}`);
    return null;
  }

  const pass = isPassed(attempt.correctCount, section.questions.length);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        {pass
          ? t({ en: 'Passed', ru: 'Сдано' })
          : t({ en: 'Failed', ru: 'Не сдано' })}{' '}
        {attempt.percent}%
      </h1>
      <p>
        {attempt.correctCount} / {section.questions.length}
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Home
      </button>
      <ul className="space-y-2">
        {section.questions.map((q) => {
          const qa = attempt.questions[q.id];
          const userKey = qa
            ? Object.keys(q.options)[qa.selectedIndices[0]]
            : '';
          return (
            <li key={q.id} className="border p-2 rounded">
              <div className="font-semibold">{t(q.question)}</div>
              <div>
                {t(
                  q.options[userKey as keyof typeof q.options] || {
                    en: '-',
                    ru: '-',
                  },
                )}
              </div>
              <div className="text-sm text-green-700">
                {t(q.options[q.answer.key])}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
