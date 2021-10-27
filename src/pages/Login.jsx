import React from "react";
import Navbar from "../components/Navbar";

export default function Login() {
    return (
        <div>
            <Navbar/>
            <br/>
            <div className="user-login-container">
              <img className="logo" src="public/logo.png"></img>
              <div className="username-container">
                <h3>Username</h3>
                <input
                  type="text"
                />
              </div>
              <div className="password-container">
                <h3>Password</h3>
                <input
                  type="password"
                />
              </div>
              <br/>
              <div className="login-button">
                <input
                  type="button"
                  value="Login"
                />
              </div>
            </div>
        </div>
    )
}