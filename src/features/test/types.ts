export interface Question {
    id: string;
    question: string;
    answers: string[];
    correctAnswer: string;
    explanation?: string;
}

export interface TestState {
    questions: Question[];
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    answers: Record<string, string>;
    isComplete: boolean;
    results: TestResult[];
}

export interface TestResult {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation?: string;
}

export interface TestData {
    questions: Question[];
    id: string;
    title: string;
}
