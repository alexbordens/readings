import React, { Component } from "react";
import * as d3 from 'd3';

class Area extends Component {

    render() {
        const area = d3.area()
            .x(d => this.props.scales.x(d[this.props.xKey]))
            .y0(this.props.innerHeight)
            .y1(d => this.props.scales.y(d[this.props.yKey]));


        return(
            <g className="area">
                <path d={area(this.props.data)}></path>
            </g>
        )
    }
}

export default Area;