import React, { Component } from "react";
import * as d3 from 'd3';

import Axis from './Axis';
import Line from './Line';
import Area from './Area';


class DailyReadings extends Component {
    constructor(props) {
        super(props)

        this.state = {};
    }

    render() {
        const svgStyles = {
            height: this.props.dimensions.height,
            width: this.props.dimensions.width
        }

        const innerStyles = {
            transform: `translate(${this.props.dimensions.margins.left}px, ${this.props.dimensions.margins.top}px)`
        }
        return(
            <div className="chart-wrapper" >
                <svg className="chart" style={svgStyles}>
                    <g className="inner" style={innerStyles}>
                        <Axis />
                        <Axis />
                        <Area />
                        <Line />
                    </g>
                </svg>
            </div>
        )
    }
}

export default DailyReadings;