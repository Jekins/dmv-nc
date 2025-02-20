export interface Question {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    [key: string]: string;
}

export interface TestResult {
    question: Question;
    userAnswer: string;
    isCorrect: boolean;
}

export interface TestData {
    questions: Question[];
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    isAnswered: boolean;
    results: TestResult[];
}
