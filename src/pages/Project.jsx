import React, { useState, useEffect } from "react";
import {
  Button,
  PageHeader,
  List,
  Card,
  Modal,
  Form,
  Input,
  message,
  Space
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./css/Project.css";
import { Link } from "react-router-dom";
import { get, post } from "../request";
const { Search } = Input;

export default function Project(props) {
  // const projects = [
  //   {
  //     id: 1,
  //     title: "Project 1",
  //     description:
  //       "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
  //   },
  //   {
  //     id: 2,
  //     title: "Project 1",
  //     description:
  //       "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
  //   },
  //   {
  //     id: 3,
  //     title: "Project 1",
  //     description:
  //       "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
  //   },
  // ];
  const [form] = Form.useForm();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleNewProject = async () => {
    const data = form.getFieldsValue();
    setShowNewProjectModal(false);
    const hide = message.loading("Creating new project...", 0);
    try {
      await post("/project", data);
      message.success("Successfully created!");
      // update project list
      await fetchProjects();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(hide, 0);
    }
  };

  const fetchProjects = async () => {
    const projects = await get("/project");
    setProjects(projects.data);
  };

  const onSearch = async (value) => {
    try {
      await get("/project/" + value);
      props.history.push("/project-detail/" + value);
    } catch (e) {
      message.error("Invalid Project ID");
    }
  }

  useEffect(() => {
    // fetch existing projects when entering Project Page
    fetchProjects();
  }, []);

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
        <Space size="large">
          <Button type="primary" onClick={() => setShowNewProjectModal(true)}>
            New Project <PlusOutlined />
          </Button>
          <Search
            placeholder="Project ID"
            allowClear
            enterButton="Go To Project"
            size="medium"
            style={{ width: 600 }}
            onSearch={onSearch}

          />
        </Space>
      </div>
      <List
        header={<h3>Previously Viewed Projects</h3>}
        grid={{ column: 4 }}
        dataSource={projects}
        className="project-list"
        renderItem={(item) => (
          <List.Item>
            <Link to={`project-detail/${item._id.$oid}`}>
              <Card
                className="card"
                title={
                  <>
                    <div>{item.name}</div>
                    <div style={{ fontSize: 10, color: "#ccc" }}>
                      id: {item._id.$oid}
                    </div>
                  </>
                }
                bodyStyle={{ overflowWrap: "break-word" }}
              >
                {item.description}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </PageHeader>
  );
}
