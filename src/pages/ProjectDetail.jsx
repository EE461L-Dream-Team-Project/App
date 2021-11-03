import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetail(props) {
  const { projectId } = useParams();

  return <div>{projectId}</div>;
}
