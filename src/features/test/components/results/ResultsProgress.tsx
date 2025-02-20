import React from 'react';
import { Card, Progress } from 'antd';

interface ResultsProgressProps {
    correct: number;
    total: number;
}

export const ResultsProgress = ({ correct, total }: ResultsProgressProps) => (
    <Card>
        <Progress
            percent={Math.round((correct / total) * 100)}
            format={() => `${correct}/${total}`}
            status={correct === total ? 'success' : 'normal'}
        />
    </Card>
);
