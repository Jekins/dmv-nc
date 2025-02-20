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

    const getButtonType = () => {
        if (!isAnswered) return isSelected ? 'primary' : 'default';

        if (answer === question.correctAnswer) return 'success';
        if (isSelected) return 'error';
        return 'default';
    };

    const getButtonStyle = () => {
        if (!isAnswered) return {};

        if (answer === question.correctAnswer) {
            return { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' };
        }
        if (isSelected && answer !== question.correctAnswer) {
            return { backgroundColor: '#fff1f0', borderColor: '#ffa39e' };
        }
        return {};
    };

    return (
        <Button
            type={getButtonType()}
            style={getButtonStyle()}
            onClick={() => !isAnswered && answer && onAnswerSelect(answer)}
            block
            disabled={isAnswered}
        >
            {answer}
        </Button>
    );
};
