import React, { Component } from "react";
import * as d3 from 'd3';

import Axis from './Axis';
import Line from './Line';
import Area from './Area';


class DailyReadings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            innerWidth: this.props.dimensions.width - this.props.dimensions.margins.left - this.props.dimensions.margins.right,
            innerHeight: this.props.dimensions.height - this.props.dimensions.margins.top - this.props.dimensions.margins.bottom
        };

        this.setScales = this.setScales.bind(this);
    }

    setScales() {
        const xScale = d3.scaleTime()
            .range([0, this.state.innerWidth])
            .domain(d3.extent(this.props.data, d => d.date));

        const yScale = d3.scaleLinear()
            .range([this.state.innerHeight, 0])
            .domain([0, d3.max(this.props.data, d => d.cumulative)]).nice();

        return { x: xScale, y: yScale };
    }

    render() {
        const svgStyles = {
            height: this.props.dimensions.height,
            width: this.props.dimensions.width
        }

        const innerStyles = {
            transform: `translate(${this.props.dimensions.margins.left}px, ${this.props.dimensions.margins.top}px)`
        }

        const scales = this.setScales();

        return(
            <div className="chart-wrapper" >
                <svg className="chart" style={svgStyles}>
                    <g className="inner" style={innerStyles}>
                        <Axis />
                        <Axis />
                        <Area data={this.props.data}
                              xKey="date"
                              yKey="cumulative"
                              scales={scales}
                              innerHeight={this.state.innerHeight}/>
                        <Line data={this.props.data} 
                              xKey="date" 
                              yKey="cumulative" 
                              scales={scales}/>
                        <Line data={this.props.data}
                              xKey="date"
                              yKey="cumulative_target"
                              scales={scales}/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default DailyReadings;