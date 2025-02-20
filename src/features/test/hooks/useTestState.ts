import { useState, useCallback, useEffect } from 'react';
import { TestState, Question } from '../types';
import { fetchTestData } from '../api/testApi';

export const useTestState = (testId: string) => {
    const [state, setState] = useState<TestState>({
        questions: [],
        currentQuestionIndex: 0,
        selectedAnswer: null,
        isAnswered: false,
        results: [],
    });

    const [testData, setTestData] = useState<TestData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadTestData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTestData(testId);
                setTestData(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setIsLoading(false);
            }
        };

        loadTestData();
    }, [testId]);

    const setQuestions = useCallback((questions: Question[]) => {
        setState((prev) => ({ ...prev, questions }));
    }, []);

    const handleAnswerSelect = useCallback(
        (answer: string) => {
            if (state.isAnswered) return;

            const currentQuestion = state.questions[state.currentQuestionIndex];
            const isCorrect = answer === currentQuestion.correctAnswer;

            setState((prev) => ({
                ...prev,
                selectedAnswer: answer,
                isAnswered: true,
                results: [
                    ...prev.results,
                    {
                        question: currentQuestion,
                        userAnswer: answer,
                        isCorrect,
                    },
                ],
            }));
        },
        [state.isAnswered, state.questions, state.currentQuestionIndex]
    );

    const handleNextQuestion = useCallback(() => {
        setState((prev) => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            selectedAnswer: null,
            isAnswered: false,
        }));
    }, []);

    return {
        state,
        setQuestions,
        handleAnswerSelect,
        handleNextQuestion,
        testData,
        isLoading,
        error,
    };
};
