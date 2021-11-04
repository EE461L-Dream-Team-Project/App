import React, { Component } from 'react'
import { Image } from 'antd'
import "../pages/css/MemberItem.css"

class MemberItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="member-item">
                <Image
                    height={80}
                    src={this.props.source}
                />
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default MemberItem

