import React from "react";
import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <h1>Projecture</h1>
      <div className="buttons">
      <Button>Login</Button>
      <Button>Register</Button>
      </div>
      <h2>Project Description</h2>
      <h4>Team Member Information</h4>
    </div>
  );
}
