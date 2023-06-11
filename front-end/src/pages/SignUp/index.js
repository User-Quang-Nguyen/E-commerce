import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, message } from 'antd';
import { Navigate } from "react-router-dom";
import '../../styles.css';
import FormItem from 'antd/es/form/FormItem';

const SignUpForm = () => {

  const [login, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (formData) => {

    // console.log(formData);
    // // Xử lý logic đăng ký tài khoản
    // axios.post('http://localhost:5000/admin/signup', formData)
    //   .then((response) => {
    //     console.log('Sign up successful:', response);
    //   })
    //   .catch((error) => {
    //     console.log('Sign up failed:', error);
    //   });

    // setLogin(true);
    try {
      console.log(formData);
      // Xử lý logic đăng ký tài khoản
      const response = await axios.post('http://localhost:5000/admin/signup', formData);
      console.log('Sign up successful:', response);
      setLogin(true);
    } catch (error) {
      console.log('Sign up failed:', error);
    }
  };

  return (

    <div className='modal'>
      <div className='modal-content'>
        <h1>Sign Up</h1>

        {login && (
          <Navigate to="/signin" replace={true} />
        )}
        
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          autoComplete="off"
        >

          <Form.Item
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          >
            <Input.Password />
          </Form.Item>

            <Form.Item>
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>

          <FormItem>
            <a href='http://localhost:3000/signin'>Đã có tài khoản</a>
          </FormItem>

        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;

