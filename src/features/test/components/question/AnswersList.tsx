import React from 'react';
import { Space } from 'antd';
import { Question } from '../../types';
import { AnswerOption } from './AnswerOption';

interface AnswersListProps {
    question: Question;
    isAnswered: boolean;
    selectedAnswer: string | null;
    onSelect: (answer: string) => void;
}

export const AnswersList = ({
    question,
    isAnswered,
    selectedAnswer,
    onSelect,
}: AnswersListProps) => (
    <Space direction='vertical' className='full-width'>
        {(['optionA', 'optionB', 'optionC', 'optionD'] as const).map((option) => (
            <AnswerOption
                key={option}
                option={option}
                question={question}
                isAnswered={isAnswered}
                selectedAnswer={selectedAnswer}
                onSelect={onSelect}
            />
        ))}
    </Space>
);
