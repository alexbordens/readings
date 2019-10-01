import React, { Component } from "react";
import * as d3 from 'd3';

class Circle extends Component {
    render() {
        return(
            <circle className="circle circle--end-marker"
                    cx={this.props.x}
                    cy={this.props.y}
                    r={this.props.r}></circle>
        )
    }
}

export default Circle;