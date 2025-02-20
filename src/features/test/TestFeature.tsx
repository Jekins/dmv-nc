import { useEffect } from 'react';
import { useTestState } from './hooks/useTestState';
import { fetchTestQuestions } from './api/testApi';
import { LoadingState, TestQuestion, TestResults } from './components';

export const TestFeature: React.FC<{ testNumber: number }> = ({ testNumber }) => {
    const { state, setQuestions, handleAnswerSelect, handleNextQuestion } = useTestState(
        testNumber.toString()
    );

    useEffect(() => {
        const loadQuestions = async () => {
            const questions = await fetchTestQuestions(testNumber);
            setQuestions(questions);
        };

        loadQuestions();
    }, [testNumber, setQuestions]);

    if (state.questions.length === 0) {
        return <LoadingState />;
    }

    if (state.currentQuestionIndex >= state.questions.length) {
        return (
            <TestResults results={state.results || []} totalQuestions={state.questions.length} />
        );
    }

    return (
        <TestQuestion
            question={state.questions[state.currentQuestionIndex]}
            questionNumber={state.currentQuestionIndex + 1}
            totalQuestions={state.questions.length}
            selectedAnswer={state.selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
        />
    );
};
