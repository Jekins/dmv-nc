import { Question } from '../types';
import { parseCSV } from '@/shared/utils/csvParser';

export const fetchTestQuestions = async (testNumber: number): Promise<Question[]> => {
    try {
        const response = await fetch(`/data/${testNumber}.csv`);
        const csvContent = await response.text();
        return parseCSV(csvContent);
    } catch (error) {
        console.error('Error loading questions:', error);
        return [];
    }
};

export const fetchTestData = async (testId: string) => {
    try {
        const response = await fetch(`/api/tests/${testId}.csv`);
        if (!response.ok) {
            throw new Error('Failed to fetch test data');
        }
        const csvData = await response.text();
        return parseCSV(csvData);
    } catch (error) {
        console.error('Error fetching test data:', error);
        throw error;
    }
};
