import React from 'react';
import { Space, Card, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TestResult } from '../../types';

const { Text } = Typography;

interface IncorrectAnswerProps {
    result: TestResult;
}

export const IncorrectAnswer = ({ result }: IncorrectAnswerProps) => (
    <Card className='error-card'>
        <Space direction='vertical'>
            <Text strong>{result.question.question}</Text>
            <Text type='danger'>
                <CloseCircleOutlined /> Ваш ответ: {result.userAnswer}
            </Text>
            <Text type='success'>
                <CheckCircleOutlined /> Правильный ответ: {result.question.correctAnswer}
            </Text>
        </Space>
    </Card>
);
