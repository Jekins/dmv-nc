import { useState, useCallback, useEffect } from 'react';
import { TestState, Question, TestData, TestResult } from '../types';
import { fetchTestData } from '../api/testApi';

const initialState: TestState = {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    answers: {},
    isComplete: false,
    results: [],
};

export const useTestState = (testId: string) => {
    const [state, setState] = useState<TestState>(initialState);
    const [testData, setTestData] = useState<TestData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadTestData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchTestData(testId);
                setState((prev) => ({
                    ...prev,
                    questions: data.questions,
                }));
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
            if (state.isComplete) return;

            const currentQuestion = state.questions[state.currentQuestionIndex];
            const isCorrect = answer === currentQuestion.correctAnswer;

            setState((prev) => ({
                ...prev,
                selectedAnswer: answer,
                answers: {
                    ...prev.answers,
                    [currentQuestion.id]: answer,
                },
                results: [
                    ...(prev.results || []),
                    {
                        questionId: currentQuestion.id,
                        question: currentQuestion.question,
                        userAnswer: answer,
                        correctAnswer: currentQuestion.correctAnswer,
                        isCorrect,
                        explanation: currentQuestion.explanation,
                    } as TestResult,
                ],
            }));
        },
        [state.isComplete, state.questions, state.currentQuestionIndex]
    );

    const handleNextQuestion = useCallback(() => {
        setState((prev) => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            selectedAnswer: null,
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
