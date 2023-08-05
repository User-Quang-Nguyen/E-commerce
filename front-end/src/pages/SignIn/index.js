import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import '../../asset/styles.css';
import { HandleLogin } from '../../api/authen';

const SignIn = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    HandleLogin(values, navigate);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h1>Sign In</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <p>Nếu chưa có tài khoản bấm <a href='http://localhost:3000/signup' >Đăng ký</a> </p>
        </Form>
      </div>
    </div>
  );
};
export default SignIn;

