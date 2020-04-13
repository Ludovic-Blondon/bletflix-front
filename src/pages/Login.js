import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthContext } from '../providers/AuthProvider.js';

const Login = () => {

  const [authState, authDispatch] = useAuthContext();
  const { auth } = authState;
  const { authLogin, authIsLogged } = authDispatch;
  const [loading, setLoading] = useState(false);

  const onFinish = values => {
    authLogin(values.username, values.password, response => {
      if (response.error) {
        message.error('Login ou mot de passe invalide')
      }
    })
  };

  return (
    <div className="login_container">
      {
        authIsLogged()
        ? <Redirect to="/" />
        : (
          loading
          ? (
            <React.Fragment>
              <Icon type="loading" style={{marginRight:".5em"}} />
              Identification en cours
            </React.Fragment>
          )
          : (
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          )
        )
      }
    </div>
  );
};

export default Login;
