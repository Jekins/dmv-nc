import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { sections } from '../data';
import { useAtom } from 'jotai';
import { attemptsAtom, type QuestionAttempt } from '../state/attempts';
import { useT } from '../utils/i18n';
import { shuffle } from '../utils/shuffle';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const answerSchema = z.object({ answer: z.string() });

export default function SectionPage() {
  const { id } = useParams();
  const form = useForm<{ answer: string }>({
    resolver: zodResolver(answerSchema),
  });
  const section = id ? sections[id] : undefined;
  const [attempts, setAttempts] = useAtom(attemptsAtom);
  const attempt = id ? attempts[id] : undefined;
  const t = useT();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!section || !id) return <div className="p-4">Not found</div>;

  if (!attempt) {
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
    return null;
  }

  const firstUnanswered = attempt.shuffledQuestionIds.findIndex(
    (qid) => !attempt.questions[qid],
  );

  if (attempt.status === 'finished') {
    navigate(`/section/${id}/results`);
    return null;
  }

  const defaultIndex =
    firstUnanswered === -1
      ? attempt.shuffledQuestionIds.length - 1
      : firstUnanswered;
  const qParam = Number(searchParams.get('q'));
  let currentIndex = Number.isNaN(qParam) ? defaultIndex : qParam;
  if (currentIndex > defaultIndex) {
    currentIndex = defaultIndex;
    setSearchParams({ q: String(currentIndex) }, { replace: true });
  } else if (Number.isNaN(qParam)) {
    setSearchParams({ q: String(currentIndex) }, { replace: true });
  }
  const currentId = attempt.shuffledQuestionIds[currentIndex];
  const question = section.questions.find((q) => q.id === currentId)!;
  const optionKeys = shuffle(
    Object.keys(question.options),
    `${attempt.seed}-${question.id}`,
  );

  const submit = form.handleSubmit(({ answer }) => {
    const isCorrect = answer === question.answer.key;
    const qa: QuestionAttempt = {
      selectedIndices: [optionKeys.indexOf(answer)],
      isCorrect,
      answeredAt: new Date().toISOString(),
    };
    setAttempts((prev) => {
      const a = prev[id];
      const questions = { ...a.questions, [currentId]: qa };
      const correctCount = Object.values(questions).filter(
        (q) => q.isCorrect,
      ).length;
      const wrongCount = Object.values(questions).filter(
        (q) => !q.isCorrect,
      ).length;
      const done = correctCount + wrongCount === a.shuffledQuestionIds.length;
      const percent = Math.floor(
        (correctCount / a.shuffledQuestionIds.length) * 100,
      );
      return {
        ...prev,
        [id]: {
          ...a,
          questions,
          correctCount,
          wrongCount,
          percent,
          status: done ? 'finished' : 'in-progress',
        },
      };
    });
    form.reset();
  });

  const answered = attempt.questions[currentId];

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm">
        {currentIndex + 1} / {attempt.shuffledQuestionIds.length}
      </div>
      <h2 className="font-semibold">{t(question.question)}</h2>
      <form onSubmit={submit} className="space-y-2">
        {optionKeys.map((key) => {
          const value = t(question.options[key]);
          const isSelected =
            answered?.selectedIndices[0] === optionKeys.indexOf(key);
          const isCorrect = key === question.answer.key;
          let classes = 'border rounded px-4 py-2 cursor-pointer';
          if (answered) {
            if (isSelected && !isCorrect) classes += ' border-red-500';
            if (isCorrect) classes += ' border-green-500';
          }
          return (
            <label key={key} className={classes}>
              <input
                type="radio"
                value={key}
                {...form.register('answer')}
                disabled={!!answered}
                className="hidden"
              />
              {value}
            </label>
          );
        })}
        {!answered && (
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            OK
          </button>
        )}
      </form>
      {answered && (
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {t(question.answer.description)}
          <div className="mt-4 flex justify-between">
            {currentIndex > 0 && (
              <button
                onClick={() => setSearchParams({ q: String(currentIndex - 1) })}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Prev
              </button>
            )}
            <button
              onClick={() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex < attempt.shuffledQuestionIds.length) {
                  setSearchParams({ q: String(nextIndex) });
                } else {
                  navigate(`/section/${id}/results`);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
