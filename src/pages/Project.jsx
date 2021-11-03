import React from "react";
import { Button, PageHeader, List, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./css/Project.css";
import { Link } from "react-router-dom";
export default function Home() {
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
  return (
    <PageHeader title="Project List">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 16,
        }}
      >
        <Button type="primary">
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
