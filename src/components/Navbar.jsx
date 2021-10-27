import React from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className="navbar-container">
                <Link to="/">
                    <Button id="btn-home">Home</Button>
                </Link>
                <Link to="/project">
                    <Button id="btn-projects">Projects</Button>
                </Link>
                <Link to="/dataset">
                    <Button id="btn-datasets">Datasets</Button>
                </Link>
                <Link to="/settings">
                    <Button id="btn-settings">Settings</Button>
                </Link>
            </div>
        </>
    )
}

export default Navbar