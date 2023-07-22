import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const CartIcon = ({ link }) => {
    return (
        <a href={link}>
            <Button className='icon' style={{ marginLeft: '100px' }} type="link" icon={<ShoppingCartOutlined style={{ fontSize: '30px' }} />}>
            </Button>
        </a>
    )
}