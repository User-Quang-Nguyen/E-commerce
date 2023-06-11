import React from 'react';
import { Layout, Row, Col, Input, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../../styles.css'
import myLogo from './logo192.png';

const { Header } = Layout;
const { Search } = Input;

const HomeHeader = () => {
  return (
    <Header className="header">
      <Row justify="space-between" align="middle">
        <Col>
          <div>
            <img className="logo" src={myLogo} alt='Logo' />
          </div>
        </Col>
        <Col>
          <Search id='enterButton' placeholder="Tìm kiếm" enterButton />
        </Col>
        <Col>
        <a href="http://localhost:3000/signin">
          <Button className='icon' style={{marginLeft: '100px'}} type="link" icon={<ShoppingCartOutlined style={{ fontSize: '30px' }} />}>
                {/* <p>Giỏ hàng</p> */}
            </Button>
        </a>
        </Col>
        <Col>
        <a href="http://localhost:3000/signin">
          <Button className='icon' type="link" icon={<UserOutlined style={{ fontSize: '30px' }} />}>
            {/* <p>Tài khoản</p> */}
          </Button>
        </a>
        </Col>
      </Row>
    </Header>
  );
}

export default HomeHeader;
