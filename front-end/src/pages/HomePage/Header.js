import React from 'react';
import { Layout, Row, Col, Input, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../../asset/styles.css'
import myLogo from './logo192.png';

const { Header } = Layout;
const { Search } = Input;

const HomeHeader = ({ isLoggedIn }) => {
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
          {isLoggedIn.message ? (
            <a href="http://localhost:3000/cart">
              <Button className='icon' style={{ marginLeft: '100px' }} type="link" icon={<ShoppingCartOutlined style={{ fontSize: '30px' }} />}>
              </Button>
            </a>
          ) : (
            <a href="http://localhost:3000/signin">
              <Button className='icon' style={{ marginLeft: '100px' }} type="link" icon={<ShoppingCartOutlined style={{ fontSize: '30px' }} />}>
              </Button>
            </a>
          )}
        </Col>
        <Col>
          {isLoggedIn.message ? (
            <Button className='icon' type="link" icon={<UserOutlined style={{ fontSize: '30px' }} />}>
              <p>{isLoggedIn.email}</p>
            </Button>
          ) : (
            <a href="http://localhost:3000/signin">
              <Button className='icon' type="link" icon={<UserOutlined style={{ fontSize: '30px' }} />}>
                <p>Đăng nhập</p>
              </Button>
            </a>
          )}
        </Col>
      </Row>
    </Header >
  );
}

export default HomeHeader;
