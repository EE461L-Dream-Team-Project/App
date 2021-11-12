import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { get, post } from "../request";

export default function Register(props) {
  const onFinish = async (values) => {
    const hide = message.loading("Registering New User...", 0);
    try {
      const res = await post("/register", values);
      props.history.push("/project");
      message.success("Successfully Registered and Logged in!");
    } catch (e) {
      message.error("Username already exists, try another");
      console.log(e);
    } finally {
      setTimeout(hide, 0);
    }
  };
  return (
    <div className="register-container">
      <img style={{ padding: 30, float: "center", width:"50%" }} src="logo.png" />
      <Form
        name="normal_register"
        className="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div
          className="register-fields"
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
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match")
                  );
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
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
          <br></br>
          <br></br>
          Already have an account? <a href="/login">Sign in now</a>
        </Form.Item>
      </Form>
    </div>
  );
}
