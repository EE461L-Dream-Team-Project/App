import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../request";

export default function ProjectDetail(props) {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const fetchProject = async () => {
    const project = await get(`/project/${projectId}`);
    setProject(project.data);
  };

  useEffect(() => {
    fetchProject();
  }, []);
  return <div>{JSON.stringify(project)}</div>;
}
