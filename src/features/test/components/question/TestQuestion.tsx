import React from 'react';
import { Typography, Space } from 'antd';
import { Question } from '../../types';
import { StyledCard, FullWidthSpace } from '../../styles';
import { QuestionProgress } from './QuestionProgress';
import { AnswersList } from './AnswersList';
import { NextQuestionButton } from './NextQuestionButton';

const { Title } = Typography;

interface TestQuestionProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    selectedAnswer: string | null;
    onAnswerSelect: (answer: string) => void;
    onNext: () => void;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({
    question,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    onAnswerSelect,
    onNext,
}) => {
    const isAnswered = selectedAnswer !== null;

    return (
        <StyledCard>
            <FullWidthSpace direction='vertical' size='middle'>
                <QuestionProgress current={questionNumber} total={totalQuestions} />

                <Title level={4} className='text-center question-title'>
                    {question.question}
                </Title>

                <AnswersList
                    question={question}
                    selectedAnswer={selectedAnswer}
                    isAnswered={isAnswered}
                    onAnswerSelect={onAnswerSelect}
                />

                {isAnswered && <NextQuestionButton onClick={onNext} />}
            </FullWidthSpace>
        </StyledCard>
    );
};
