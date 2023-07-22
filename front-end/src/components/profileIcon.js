import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const ProfileIcon = ({ link, text }) => {
    return (
        <a href={link}>
            <Button className='icon' type="link" icon={<UserOutlined style={{ fontSize: '30px' }} />}>
                <p>{text}</p>
            </Button>
        </a>
    )
}