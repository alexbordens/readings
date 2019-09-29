import React, { Component } from "react";
import * as d3 from 'd3';

class Line extends Component {
    render() {
        const line = d3.line()
            .x(d => this.props.scales.x(d[this.props.xKey]))
            .y(d => this.props.scales.y(d[this.props.yKey]));

        return(
            <g className="line">
                <path d={line(this.props.data)}></path>
            </g>
        )
    }
}

export default Line;