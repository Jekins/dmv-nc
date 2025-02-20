import React from 'react';
import { Progress } from 'antd';

interface QuestionProgressProps {
    current: number;
    total: number;
}

export const QuestionProgress = ({ current, total }: QuestionProgressProps) => (
    <Progress
        percent={Math.round((current / total) * 100)}
        format={() => `${current} из ${total}`}
        size={['100%', 20]}
        status='active'
    />
);
