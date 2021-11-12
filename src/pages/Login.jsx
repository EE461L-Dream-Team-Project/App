import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { get, post } from "../request";

export default function Login(props) {
  const onFinish = async (values) => {
    const hide = message.loading("Logging In...", 0);
    try {
      const res = await post("/login", values);
      props.history.push("/project");
      message.success("Successfully Logged in!");
    } catch (e) {
      message.error("Invalid Username and Password Combination");
    } finally {
      setTimeout(hide, 0);
    }
  };
  return (
    <div className="login-container">
      <img style={{ padding: 30, float: "center", width:"50%" }} src="logo.png" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div
          className="login-fields"
          style={{ width: 300, margin: "0 auto" }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <br></br>
          <br></br>
          Don't have an account? <a href="/register">Register now</a>
        </Form.Item>
      </Form>
    </div>
  );
}
