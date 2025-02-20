import { Question } from '../types';
import { parseCSV } from '@/shared/utils/csvParser';

export const fetchTestQuestions = async (testNumber: number): Promise<Question[]> => {
    try {
        const response = await fetch(`/dmv-nc/data/${testNumber}.csv`);
        if (!response.ok) {
            throw new Error('Failed to fetch test questions');
        }
        const csvData = await response.text();
        return parseCSV(csvData);
    } catch (error) {
        console.error('Error fetching test questions:', error);
        return [];
    }
};

export const fetchTestData = async (testId: string): Promise<Question[]> => {
    try {
        const response = await fetch(`/dmv-nc/data/${testId}.csv`);
        if (!response.ok) {
            throw new Error('Failed to fetch test data');
        }
        const csvData = await response.text();
        return parseCSV(csvData);
    } catch (error) {
        console.error('Error fetching test data:', error);
        throw new Error('Failed to fetch test data');
    }
};
