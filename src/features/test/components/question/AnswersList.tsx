import React from 'react';
import { Space } from 'antd';
import { Question } from '../../types';
import { AnswerOption } from './AnswerOption';

interface AnswersListProps {
    question: Question;
    selectedAnswer: string | null;
    isAnswered: boolean;
    onAnswerSelect: (answer: string) => void;
}

export const AnswersList: React.FC<AnswersListProps> = ({
    question,
    selectedAnswer,
    isAnswered,
    onAnswerSelect,
}) => {
    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            {question.answers.map((answer, index) => (
                <AnswerOption
                    key={index}
                    question={question}
                    option={index}
                    isSelected={selectedAnswer === answer}
                    isAnswered={isAnswered}
                    onAnswerSelect={onAnswerSelect}
                />
            ))}
        </Space>
    );
};
