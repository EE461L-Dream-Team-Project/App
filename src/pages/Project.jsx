import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1 id="title">Projecture</h1>
            <div className="buttons">
                <Link to="/login">
                    <Button id="btn-login">Login</Button>
                </Link>
                <Button id="btn-register">Register</Button>
            </div>
            <h2 id="description">Project Description</h2>
            <h4 id="team-member-info">Team Member Information</h4>
        </div>
    );
}