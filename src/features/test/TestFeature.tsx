import { useEffect } from 'react';
import { useTestState } from './hooks/useTestState';
import { fetchTestQuestions } from './api/testApi';
import { LoadingState, TestQuestion, TestResults } from './components';

interface TestFeatureProps {
    testNumber: number;
}

export const TestFeature = ({ testNumber }: TestFeatureProps) => {
    const { state, setQuestions, handleAnswerSelect, handleNextQuestion } = useTestState();

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
        return <TestResults results={state.results} totalQuestions={state.questions.length} />;
    }

    return (
        <TestQuestion
            question={state.questions[state.currentQuestionIndex]}
            questionNumber={state.currentQuestionIndex + 1}
            totalQuestions={state.questions.length}
            isAnswered={state.isAnswered}
            selectedAnswer={state.selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
        />
    );
};
