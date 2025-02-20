import { Question } from '@/features/test/types';
import { v4 as uuidv4 } from 'uuid';

const parseCSVLine = (line: string): string[] => {
    const values: string[] = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            insideQuotes = !insideQuotes;
            continue;
        }

        if (char === ',' && !insideQuotes) {
            values.push(currentValue.trim());
            currentValue = '';
            continue;
        }

        currentValue += char;
    }

    values.push(currentValue.trim());
    return values;
};

export const parseCSV = (csv: string): Question[] => {
    const lines = csv.split('\n');

    return lines
        .slice(1)
        .map((line) => {
            const [question, optionA, optionB, optionC, optionD, correctAnswer] =
                parseCSVLine(line);

            if (!question || !correctAnswer) return null;

            return {
                id: uuidv4(),
                question,
                answers: [optionA, optionB, optionC, optionD],
                correctAnswer,
            };
        })
        .filter((q): q is Question => q !== null);
};
