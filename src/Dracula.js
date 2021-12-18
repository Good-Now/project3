import React, { Component } from "react";

class Dracula extends Component {
    render () {
        return (
            <div>
            <h1>Dracula</h1>
            <h2>Bram Stoker</h2>
            <div>
            <p>{this.props.matchString}</p>
            </div> 
            </div>
        );
    }
}
export default Dracula;