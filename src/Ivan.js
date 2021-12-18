import React, { Component } from "react";

class Ivan extends Component {
    render () {
        return (
            <div>
            <h1>The Death of Ivan Ilych</h1>
            <h2>Leo Tolstoy</h2>
            <div>
            <p>{this.props.matchString}</p>
            </div> 
            </div>
        );
    }
}
export default Ivan;