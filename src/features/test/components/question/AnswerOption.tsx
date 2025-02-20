import React from 'react';
import { Question } from '../../types';
import { AnswerButton } from '../../styles';

interface AnswerOptionProps {
    option: keyof Question;
    question: Question;
    isAnswered: boolean;
    selectedAnswer: string | null;
    onSelect: (answer: string) => void;
}

export const AnswerOption = ({
    option,
    question,
    isAnswered,
    selectedAnswer,
    onSelect,
}: AnswerOptionProps) => {
    const getOptionStyle = () => {
        if (!isAnswered) return {};

        if (question[option] === question.correctAnswer) {
            return { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' };
        }

        if (question[option] === selectedAnswer && question[option] !== question.correctAnswer) {
            return { backgroundColor: '#fff1f0', borderColor: '#ffa39e' };
        }

        return {};
    };

    return (
        <AnswerButton
            style={getOptionStyle()}
            onClick={() => onSelect(question[option])}
            disabled={isAnswered}
        >
            {question[option]}
        </AnswerButton>
    );
};
