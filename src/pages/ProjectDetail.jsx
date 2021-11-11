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
  const [checkInForm] = Form.useForm();
  const [checkOutForm] = Form.useForm();
  const [currentItem, setCurrentItem] = useState(null);
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
    const hide = message.loading("Checking in " + data['amount'] + " units to " + data['name'] + "...", 0);
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
    const hide = message.loading("Checking out " + data['amount'] + " units from " + data['name'] + "...", 0);
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
  const checkInAll = async () => {
    const hide = message.loading("Checking in all units...", 0);
    try {
      const res = await get(`/project/${projectId}/check_in_all`);
      message.success("Successfully checked in all hardware!");
    } catch (e) {
      message.error("Unknown Error");
    } finally {
      setTimeout(hide, 0);
    }
    await fetchProject();
  }
  const deleteProject = async () => {
    const hide = message.loading("Deleting Project...", 0);
    try {
      const res = await get(`/project/${projectId}/delete_project`);
      message.success("Successfully deleted project!");
    } catch (e) {
      message.error("Unknown Error");
    } finally {
      setTimeout(hide, 0);
    }
    props.history.push('/project')
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
      title: "Checked Out",
      dataIndex: "checked_out",
      width: "15%",
      key: "checked_out",
    },
    {
      title: "Manage",
      width: "25%",
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
          </Space>
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <PageHeader title={project['name']}>
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
        Description: {project['description']}
        <br></br>
        <div align="right">
          <Space>
            <Popconfirm
              title="Are you sure you want to check in all resources?"
              okText="Yes"
              cancelText="No"
              onConfirm={checkInAll}
              icon={<QuestionCircleOutlined />}
            >
              <Button type="primary">
                Check In All <PlusOutlined />
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure you want to delete this project?"
              okText="Yes"
              cancelText="No"
              onConfirm={deleteProject}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button type="danger">
                Delete Project <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </p>
      <Table columns={columns} dataSource={project['data']} />
    </PageHeader>
  );
}

