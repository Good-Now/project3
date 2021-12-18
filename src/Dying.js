import React, { Component } from "react";

class Dying extends Component {
    render () {
        return (
            <div>
            <h1>As I Lay Dying</h1>
            <h2>William Faulkner</h2>
            <div>
            <p>{this.props.matchString}</p>
            </div> 
            </div>
        );
    }
}
export default Dying;