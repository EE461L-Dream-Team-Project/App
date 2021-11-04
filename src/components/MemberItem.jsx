import React, { Component } from 'react'
import "../pages/css/MemberItem.css"

class MemberItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="member-item">
                <img    src={this.props.source}
                        id="image"></img>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default MemberItem

