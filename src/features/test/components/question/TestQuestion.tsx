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
    isAnswered: boolean;
    selectedAnswer: string | null;
    onAnswerSelect: (answer: string) => void;
    onNext: () => void;
}

export const TestQuestion = ({
    question,
    questionNumber,
    totalQuestions,
    isAnswered,
    selectedAnswer,
    onAnswerSelect,
    onNext,
}: TestQuestionProps) => (
    <StyledCard>
        <FullWidthSpace direction='vertical' size='middle'>
            <QuestionProgress current={questionNumber} total={totalQuestions} />

            <Title level={4} className='text-center question-title'>
                {question.question}
            </Title>

            <AnswersList
                question={question}
                isAnswered={isAnswered}
                selectedAnswer={selectedAnswer}
                onSelect={onAnswerSelect}
            />

            {isAnswered && <NextQuestionButton onClick={onNext} />}
        </FullWidthSpace>
    </StyledCard>
);
