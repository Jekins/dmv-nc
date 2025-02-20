import { RightOutlined } from '@ant-design/icons';
import { AnswerButton } from '../../styles';

interface NextQuestionButtonProps {
    onClick: () => void;
}

export const NextQuestionButton = ({ onClick }: NextQuestionButtonProps) => (
    <AnswerButton type='primary' icon={<RightOutlined />} onClick={onClick}>
        Следующий вопрос
    </AnswerButton>
);
