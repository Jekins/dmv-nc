import { useParams, useNavigate } from 'react-router-dom';
import { sections } from '../data';
import { useAtom } from 'jotai';
import { attemptsAtom } from '../state/attempts';
import { useT } from '../utils/i18n';
import { isPassed } from '../utils/score';
import Celebration from '../components/Celebration';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const { id } = useParams();
  const section = id ? sections[id] : undefined;
  const [attempts, setAttempts] = useAtom(attemptsAtom);
  const attempt = id ? attempts[id] : undefined;
  const t = useT();
  const navigate = useNavigate();
  const [showCongrats, setShowCongrats] = useState(false);
  const pass = attempt
    ? isPassed(attempt.correctCount, section?.questions.length || 0)
    : false;
  useEffect(() => {
    if (pass) setShowCongrats(true);
  }, [pass]);

  if (!section || !id || !attempt) return <div className="p-4">Not found</div>;
  if (attempt.status !== 'finished') {
    navigate(`/section/${id}`);
    return null;
  }

  const retry = () => {
    if (!id) return;
    setAttempts((prev) => {
      const cp = { ...prev };
      delete cp[id];
      return cp;
    });
    navigate(`/section/${id}`);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="sticky top-0 flex space-x-2 bg-gray-50 dark:bg-gray-900 py-2">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Home
        </button>
        <button
          onClick={retry}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Retry
        </button>
      </div>
      <h1 className="text-2xl font-bold">
        {pass
          ? t({ en: 'Passed', ru: 'Сдано' })
          : t({ en: 'Failed', ru: 'Не сдано' })}{' '}
        {attempt.percent}%
      </h1>
      <p>
        {attempt.correctCount} / {section.questions.length}
      </p>
      <ul className="space-y-2">
        {section.questions.map((q) => {
          const qa = attempt.questions[q.id];
          const userKey = qa
            ? Object.keys(q.options)[qa.selectedIndices[0]]
            : '';
          const userAnswer = t(
            q.options[userKey as keyof typeof q.options] || {
              en: '-',
              ru: '-',
            },
          );
          const correct = t(q.options[q.answer.key]);
          return (
            <li key={q.id} className="border p-2 rounded space-y-1">
              <div className="font-semibold">{t(q.question)}</div>
              <div
                className={qa?.isCorrect ? 'text-green-700' : 'text-red-700'}
              >
                {userAnswer}
              </div>
              {!qa?.isCorrect && (
                <div className="text-sm text-green-700">{correct}</div>
              )}
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {t(q.answer.description)}
              </div>
            </li>
          );
        })}
      </ul>
      {showCongrats && pass && (
        <Celebration onClose={() => setShowCongrats(false)} />
      )}
    </div>
  );
}
