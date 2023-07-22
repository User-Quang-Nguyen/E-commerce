import React from 'react';
import { Layout, Row, Col, Input, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../asset/styles.css'
import myLogo from '../asset/logo192.png';
import { CartIcon } from './cartIcon';
import { ProfileIcon } from './profileIcon';

const { Header } = Layout;
const { Search } = Input;

const HomeHeader = ({ authState }) => {
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
          <CartIcon link=
            {authState.isLoggedIn ? (
              "http://localhost:3000/cart"
            ) : (
              "http://localhost:3000/signin"
            )}
          />
        </Col>
        <Col>
          {authState.isLoggedIn ? (
            <ProfileIcon text={authState.name} />
          ) : (
            <ProfileIcon text="Đăng nhập" link='http://localhost:3000/signin' />
          )}
        </Col>
      </Row>
    </Header >
  );
}

export default HomeHeader;
