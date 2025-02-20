import { Typography, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { TestResult } from '../../types';

const { Text } = Typography;

interface IncorrectAnswerProps {
    result: TestResult;
}

export const IncorrectAnswer: React.FC<IncorrectAnswerProps> = ({ result }) => {
    return (
        <Space direction='vertical'>
            <Text strong>{result.question}</Text>
            <Space>
                <Text type='danger'>Ваш ответ: {result.userAnswer}</Text>
            </Space>
            <Space>
                <CheckCircleOutlined /> Правильный ответ: {result.correctAnswer}
            </Space>
            {result.explanation && <Text type='secondary'>Объяснение: {result.explanation}</Text>}
        </Space>
    );
};
