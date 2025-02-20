import { Typography } from 'antd';
import { TestResult } from '../../types';
import { StyledCard, FullWidthSpace } from '../../styles';
import { ResultsProgress } from './ResultsProgress';
import { IncorrectAnswersList } from './IncorrectAnswersList';

const { Title } = Typography;

interface TestResultsProps {
    results: TestResult[];
    totalQuestions: number;
}

export const TestResults = ({ results, totalQuestions }: TestResultsProps) => {
    const correctAnswers = results.filter((r) => r.isCorrect).length;
    const incorrectAnswers = results.filter((r) => !r.isCorrect);

    return (
        <StyledCard>
            <FullWidthSpace direction='vertical' size='large'>
                <Title level={3} className='text-center'>
                    Результаты теста
                </Title>

                <ResultsProgress correct={correctAnswers} total={totalQuestions} />

                {incorrectAnswers.length > 0 && (
                    <IncorrectAnswersList incorrectAnswers={incorrectAnswers} />
                )}
            </FullWidthSpace>
        </StyledCard>
    );
};
