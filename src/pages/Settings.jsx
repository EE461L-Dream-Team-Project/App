import React from "react";
import { PageHeader, Button, message, Form, Input } from "antd";
import { LogoutOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { get, post } from "../request"
function Settings(props) {
  const [form] = Form.useForm();
  const handleLogout = async () => {
    try {
      await get('/logout')
      window.open('/', '_top')
    } catch (e) {
      console.error(e)
      message.error("Log out failed.")
    }
  }
  const onFinish = async (values) => {
    const hide = message.loading("Changing Password...", 0);
    try {
      const res = await post("/change_password", values);
      message.success("Successfully Changed Password!");
      form.resetFields();
    } catch (e) {
      message.error("Current Password entered is incorrect!");
    } finally {
      setTimeout(hide, 0);
    }
  };
  return (
    <PageHeader title="Settings">
      <p align="left">
        <h3>Change Password</h3>
        <Form
          name="change-password"
          className="change-password-form"
          form={form}
          onFinish={onFinish}
        >
          <div
            className="change-password-fields"
            style={{ width: 400 }}
          >
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
                placeholder="Current Password"
              />
            </Form.Item>
            <Form.Item
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm_new_password"
              dependencies={["new password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
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
                placeholder="Confirm New Password"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="change-pw-form-button"
            >
              Change Password <EditOutlined />
            </Button>
          </Form.Item>
        </Form>
        <br></br>
        <br></br>
        <Button onClick={handleLogout} type="danger">
          Logout <LogoutOutlined />
        </Button>
      </p>
    </PageHeader>
  );
}

export default Settings;
