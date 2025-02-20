import { Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { TestResult } from '../../types';
import { IncorrectAnswer } from './IncorrectAnswer';

const { Title } = Typography;

interface IncorrectAnswersListProps {
    incorrectAnswers: TestResult[];
}

export const IncorrectAnswersList = ({ incorrectAnswers }: IncorrectAnswersListProps) => (
    <>
        <Title level={4}>
            <CloseCircleOutlined className='error-icon' />
            Неправильные ответы:
        </Title>
        {incorrectAnswers.map((result, index) => (
            <IncorrectAnswer key={index} result={result} />
        ))}
    </>
);
