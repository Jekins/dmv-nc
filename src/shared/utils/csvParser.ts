import { Question } from '@/features/test/types';
import { v4 as uuidv4 } from 'uuid';

const removeQuotes = (str: string): string => str.replace(/^["']|["']$/g, '').trim();

export const parseCSV = (csv: string): Question[] => {
    const lines = csv.split('\n');

    return lines
        .slice(1)
        .map((line) => {
            const [question, optionA, optionB, optionC, optionD, correctAnswer] = line
                .split(',')
                .map((s) => s.trim());

            if (!question || !correctAnswer) return null;

            return {
                id: uuidv4(),
                question,
                answers: [optionA, optionB, optionC, optionD].filter(Boolean),
                correctAnswer,
            };
        })
        .filter((q): q is Question => q !== null);
};
