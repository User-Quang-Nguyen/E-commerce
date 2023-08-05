import { Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HistoryOutlined } from '@ant-design/icons';

export const CartIcon = ({ link }) => {
    return (
        <a href={link}>
            <Button className='icon' style={{ marginLeft: '100px' }} type="link" icon={<ShoppingCartOutlined style={{ fontSize: '30px' }} />}>
            </Button>
        </a>
    )
}

export const ProfileIcon = ({ link, text }) => {
    return (
        <a href={link}>
            <Button className='icon' type="link" icon={<UserOutlined style={{ fontSize: '30px' }} />}>
                <p>{text}</p>
            </Button>
        </a>
    )
}

export const OrderIcon = ({ link }) => {
    return (
        <a href={link}>
            <Button className='icon' style={{ marginLeft: '100px' }} type="link" icon={<HistoryOutlined style={{ fontSize: '30px' }} />}>
            </Button>
        </a>
    )
}