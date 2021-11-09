import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  PageHeader,
  Table,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm
} from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { get, post } from "../request";

export default function ProjectDetail(props) {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const fetchProject = async () => {
    try {
      const project = await get(`/project/${projectId}`);
      setProject(project.data);
    } catch (e) {
      message.error("Invalid Project ID");
      props.history.push('/project');
    }
  };
  const [addResourceForm] = Form.useForm();
  const [checkInForm] = Form.useForm();
  const [checkOutForm] = Form.useForm();
  const [currentItem, setCurrentItem] = useState(null);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);

  const checkIn = async () => {
    const data = checkInForm.getFieldsValue();
    if (!(typeof data['amount'] === "number")) {
      message.error("Amount must be a number")
      return;
    }
    setShowCheckInModal(false);
    checkInForm.resetFields();
    data['name'] = currentItem['name'];
    const hide = message.loading("Checking In " + data['amount'] + " units to " + data['name'] + "...", 0);
    try {
      const res = await post(`/project/${projectId}/check_in`, data);
      message.success("Successfully checked in hardware!");
    } catch (e) {
      message.error("Cannot check in " + data['amount'] + " units");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchProject();

  }
  const checkOut = async () => {
    const data = checkOutForm.getFieldsValue();
    if (!(typeof data['amount'] === "number")) {
      message.error("Amount must be a number")
      return;
    }
    setShowCheckOutModal(false);
    checkOutForm.resetFields();
    data['name'] = currentItem['name'];
    const hide = message.loading("Checking Out " + data['amount'] + " units from " + data['name'] + "...", 0);
    try {
      const res = await post(`/project/${projectId}/check_out`, data);
      message.success("Successfully checked out hardware!");
    } catch (e) {
      message.warning("Cannot check out " + data['amount'] + " units, checked out all of the remaining units");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchProject();

  }
  const deleteResource = async (item) => {
    const hide = message.loading("Deleting " + item['name'] + "...", 0);
    try {
      const res = await post(`/project/${projectId}/delete`, { "name": item['name'] });
      message.success("Deleted Resource!");
    } catch (e) {
      message.error("Resource does not exist");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchProject();
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
      const res = await post(`/project/${projectId}/add`, data);
      message.success("Added Resource!");
    } catch (e) {
      message.error("Resource name " + data['name'] + " is already used");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchProject();
  }
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
      title: "Manage",
      width: "40%",
      render: (_, item) => (
        <div>
          <Space size="middle">
            <Button type="primary" onClick={() => {
              setCurrentItem(item);
              setShowCheckInModal(true)
            }
            }>
              Check In <PlusOutlined />
            </Button>
            <Button type="primary" onClick={() => {
              setCurrentItem(item);
              setShowCheckOutModal(true)
            }
            }>
              Check Out <MinusOutlined />
            </Button>
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
          </Space>
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <PageHeader title={project.name}>
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
      <Modal
        title="Check In"
        visible={showCheckInModal}
        onOk={checkIn}
        okText="Check In"
        onCancel={() => {
          setShowCheckInModal(false);
          checkInForm.resetFields()
        }
        }
      >
        <Form name="check-in-resource" form={checkInForm} labelCol={{ span: 8 }}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              controls={false}
              min={0}
              onPressEnter={checkIn}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Check Out"
        visible={showCheckOutModal}
        onOk={checkOut}
        okText="Check Out"
        onCancel={() => {
          setShowCheckOutModal(false);
          checkOutForm.resetFields()
        }
        }
      >
        <Form name="check-out-resource" form={checkOutForm} labelCol={{ span: 8 }}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              controls={false}
              min={0}
              onPressEnter={checkOut}
            />
          </Form.Item>
        </Form>
      </Modal>
      <p align="left">
        Project ID: {projectId}
        <br></br>
        Description: {project.description}
        <br></br>
        <br></br>
        <Button type="primary" onClick={() => setShowAddResourceModal(true)}>
          Add Resource <PlusOutlined />
        </Button>
      </p>
      <Table columns={columns} dataSource={project.resources} />
    </PageHeader>
  );
}

