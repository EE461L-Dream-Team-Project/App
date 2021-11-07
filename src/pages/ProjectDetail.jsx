import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  PageHeader,
  Table,
  Space,
  Descriptions,
  List,
  Card,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { get } from "../request";

export default function ProjectDetail(props) {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const fetchProject = async () => {
    const project = await get(`/project/${projectId}`);
    setProject(project.data);
  };
  const checkIn = (item) => {

  }
  const checkOut = (item) => {

  }
  const deleteResource = (item) => {

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
      dataIndex: "manage",
      width: "40%",
      key: "manage",
      render: (_, item) => (
        <div>
          <Space>
            <Button type="primary" onClick={() => checkIn(item)}>
              Check In <PlusOutlined />
            </Button>
            <Button type="primary" onClick={() => checkOut(item)}>
              Check Out <MinusOutlined />
            </Button>
            <Button type="primary" danger onClick={() => deleteResource(item)}>
              Delete <DeleteOutlined />
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  const dataSource = [
    {
      name: "HWSet1",
      capacity: 50,
      availability: 50,
      manage: 0
    },
    {
      name: "HWSet2",
      capacity: 100,
      availability: 100,
      manage: 0
    }
  ];
  useEffect(() => {
    fetchProject();
  }, []);
  return (
    <PageHeader title={project.name}>
      <Descriptions>
        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
      </Descriptions>
      <div>{JSON.stringify(project)}</div>;
      <Table columns={columns} dataSource={dataSource} />
    </PageHeader>
  );
}

