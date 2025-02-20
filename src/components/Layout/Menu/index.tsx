import React, { useState, useEffect } from 'react';
import { StyledMenu } from './styles';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
    onTestSelect: (testId: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ onTestSelect }) => {
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState('1'); // Устанавливаем первый тест по умолчанию

    useEffect(() => {
        // При монтировании компонента выбираем первый тест
        handleTestClick('1');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleTestClick = (testId: string) => {
        setSelectedKey(testId);
        onTestSelect(testId);
        navigate(`/test/${testId}`);
    };

    const menuItems = Array.from({ length: 8 }, (_, i) => ({
        key: (i + 1).toString(),
        label: `Тест ${i + 1}`,
        onClick: () => handleTestClick((i + 1).toString()),
    }));

    return (
        <StyledMenu
            theme='dark'
            mode='horizontal'
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => handleTestClick(key)}
            items={menuItems}
        />
    );
};
