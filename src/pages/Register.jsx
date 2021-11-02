import React from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login(props) {
    const onFinish = (values) => {
        const hide = message.loading('Registering New User...', 0);
        fetch('https://projecture-backend.herokuapp.com/api/register', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(response => {
                setTimeout(hide, 0);
                if (response.status == 400) {
                    response.json().then(data => {
                        message.error(data.message)
                    })
                }
                else {
                    props.history.push('/project')
                    message.success('Successfully Registered and Logged in!')
                }
            })
            .catch(error => {
                console.log(error)
            })
    };
    return (
        <div class="register-container">
            <img style={{ padding: 30, float: "center" }} src="logo.png" />
            <Form
                name="normal_register"
                className="register-form"
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
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The passwords do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </Button>
                    <br></br>
                    <br></br>
                    Already have an account?  <a href="/login">Sign in now</a>
                </Form.Item>
            </Form>
        </div>
    )
}

