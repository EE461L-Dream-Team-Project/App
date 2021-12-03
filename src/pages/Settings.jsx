import { React, useState, useEffect } from "react";
import { PageHeader, Button, message, Form, Input, Popconfirm, Modal, InputNumber, Table } from "antd";
import { LogoutOutlined, EditOutlined, LockOutlined, QuestionCircleOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { get, post } from "../request"
function Settings(props) {
  const [form] = Form.useForm();
  const [authed, setAuth] = useState(false);
  const [resources, setResources] = useState({});
  const [addResourceForm] = Form.useForm();
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);

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
  const fetchResources = async () => {
    try {
      const resources = await get(`/hwsets`);
      setResources(resources.data);
    } catch (e) {
      message.error("Unknown Error");
    }
  };
  const deleteResource = async (item) => {
    const hide = message.loading("Deleting " + item['name'] + "...", 0);
    try {
      const res = await post(`/delete`, { "name": item['name'] });
      message.success("Deleted Resource!");
    } catch (e) {
      message.error("Resource does not exist");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchResources();
  }
  const addResource = async () => {
    const data = addResourceForm.getFieldsValue();
    if (!(typeof data['capacity'] === "number")) {
      message.error("Capacity must be a number")
      return;
    }
    setShowAddResourceModal(false);
    addResourceForm.resetFields();
    const hide = message.loading("Adding Resource " + data['name'] + "...", 0);
    try {
      const res = await post(`/add`, data);
      message.success("Added Resource!");
    } catch (e) {
      message.error("Resource name " + data['name'] + " is already used");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchResources();
  }
  useEffect(() => {
    async function getAuth() {
      const resources = await get(`/hwsets`);
      setResources(resources.data);
      console.log(resources);
      const res = await get('/is_admin');
      setAuth(res.data.bool);
    }
    getAuth();
  }, []);
  const columns = [
    {
      title: "Resource",
      dataIndex: "name",
      width: "30%",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      width: "15%",
      key: "capacity",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      width: "15%",
      key: "availability",
    },
    {
      title: "Delete",
      width: "25%",
      render: (_, item) => (
        <div>
          <Popconfirm
            title="Are you sure you want to delete this?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteResource(item)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button type="primary" danger>
              Delete <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <PageHeader title="Settings">
      <Modal
        title="Add Resource"
        visible={showAddResourceModal}
        onOk={addResource}
        okText="Add"
        onCancel={() => {
          setShowAddResourceModal(false);
          addResourceForm.resetFields()
        }
        }
      >
        <Form name="add-resource" form={addResourceForm} labelCol={{ span: 8 }}>
          <Form.Item
            name="name"
            label="Resource Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              controls={false}
              min={0}
              onPressEnter={addResource}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div align="left">
        {authed ?
          <div>
            <h3>Admin Panel</h3>
            <div style={{
              marginBottom: 10
            }}>
              <Button type="primary" onClick={() => setShowAddResourceModal(true)}>
                Add Resource <PlusOutlined />
              </Button>
            </div>
            <Table columns={columns} dataSource={resources} />
          </div> : null}

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
      </div>
    </PageHeader>
  );
}

export default Settings;
