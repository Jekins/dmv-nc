import { Space, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { StyledCard } from '../../styles';

const { Title } = Typography;

export const LoadingState = () => (
    <StyledCard>
        <Space direction='vertical' align='center' className='full-width text-center'>
            <QuestionCircleOutlined spin className='loading-icon' />
            <Title level={4}>Загрузка вопросов...</Title>
        </Space>
    </StyledCard>
);
