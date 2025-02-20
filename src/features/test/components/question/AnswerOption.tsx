import { Button } from 'antd';
import { Question } from '../../types';

interface AnswerOptionProps {
    question: Question;
    option: number;
    isSelected: boolean;
    isAnswered: boolean;
    onAnswerSelect: (answer: string) => void;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
    question,
    option,
    isSelected,
    isAnswered,
    onAnswerSelect,
}) => {
    const answer = question.answers[option];

    const getButtonStyle = () => {
        if (!isAnswered) return {};

        if (answer === question.correctAnswer) {
            return {
                backgroundColor: '#f6ffed',
                borderColor: '#b7eb8f',
                color: '#52c41a',
            };
        }
        if (isSelected) {
            return {
                backgroundColor: '#fff1f0',
                borderColor: '#ffa39e',
                color: '#ff4d4f',
            };
        }
        return {};
    };

    return (
        <Button
            type={isSelected && !isAnswered ? 'primary' : 'default'}
            style={getButtonStyle()}
            onClick={() => !isAnswered && answer && onAnswerSelect(answer)}
            block
            disabled={isAnswered}
        >
            {answer}
        </Button>
    );
};
