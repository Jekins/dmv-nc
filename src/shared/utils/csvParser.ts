import { Question } from '@/features/test/types';

const removeQuotes = (str: string): string => str.replace(/^["']|["']$/g, '').trim();

export const parseCSV = (csvContent: string): Question[] => {
    const lines = csvContent.split('\n');
    return lines
        .slice(1)
        .map((line) => {
            // Используем регулярное выражение для корректного разделения по запятым,
            // игнорируя запятые внутри кавычек
            const matches = line.match(/(?:^|,)("(?:[^"]*(?:""[^"]*)*)"|\d+|[^,]*)/g);
            if (!matches) return null;

            const values = matches.map(
                (val) => removeQuotes(val.replace(/^,/, '')) // Убираем начальную запятую
            );

            const [question, optionA, optionB, optionC, optionD, correctAnswer] = values;

            return {
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
            };
        })
        .filter(Boolean) as Question[];
};
