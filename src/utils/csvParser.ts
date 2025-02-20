import { Question } from '../types';

export const parseCSV = (csvContent: string): Question[] => {
    const lines = csvContent.split('\n');
    const questions: Question[] = [];

    // Пропускаем заголовок
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Регулярное выражение для разбора CSV с учетом кавычек
        const regex = /"([^"]*)"/g;
        const matches = [...line.matchAll(regex)];

        if (matches.length >= 6) {
            const [
                [, question],
                [, optionA],
                [, optionB],
                [, optionC],
                [, optionD],
                [, correctAnswer],
            ] = matches;

            questions.push({
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
            });
        }
    }

    return questions;
};
