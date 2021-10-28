import React from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login(props) {
  const onFinish = (values) => {
    const hide = message.loading('Logging In...', 0);
    fetch('https://projecture-backend.herokuapp.com/api/login', {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        setTimeout(hide, 0);
        if (response.status == 500) {
          response.json().then(data => {
            message.error(data.message)
          })
        }
        else {
          props.history.push('/project')
          message.success('Successfully Logged in!')
        }
      })
      .catch(error => {
        console.log(error)
      })
  };
  return (
    <div class="login-container">
      <img style={{ padding: 30, float: "center" }} src="logo.png" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div class="register-fields" style={{ "width": 300, margin: "0 auto" }}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username" />
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
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
          <br></br>
          <br></br>
          Don't have an account? <a href="/register">Register now</a>
        </Form.Item>

      </Form>
    </div>
  )
}

