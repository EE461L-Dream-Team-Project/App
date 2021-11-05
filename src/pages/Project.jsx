import React, { useState } from "react";
import { Button, PageHeader, List, Card, Modal, Form, Input } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./css/Project.css";
import { Link } from "react-router-dom";
import { get, post } from "../request";
export default function Project(props) {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description:
        "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
    },
    {
      id: 2,
      title: "Project 1",
      description:
        "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
    },
    {
      id: 3,
      title: "Project 1",
      description:
        "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
    },
  ];
  const [form] = Form.useForm();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const handleNewProject = async () => {
    try {
      const data = form.getFieldsValue();
      const res = await post("/project", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PageHeader title="Project List">
      <Modal
        title="Create New Project"
        visible={showNewProjectModal}
        onOk={handleNewProject}
        okText="Create"
        onCancel={() => setShowNewProjectModal(false)}
      >
        <Form name="new-project" form={form} labelCol={{ span: 8 }}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={() => setShowNewProjectModal(true)}>
          New Project <PlusOutlined />
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={projects}
        renderItem={(item) => (
          <List.Item>
            <Link to={`project-detail/${item.id}`}>
              <Card className="card" title={item.title}>
                {item.description}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </PageHeader>
  );
}
