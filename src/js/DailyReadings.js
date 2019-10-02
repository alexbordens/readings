import React, { Component } from "react";
import * as d3 from 'd3';

import XAxis from './XAxis';
import YAxis from './YAxis';

import Line from './Line';
import Area from './Area';
import VerticalRuleLines from './VerticalRuleLines';

import Label from './Label';
import FinalLabel from './FinalLabel';

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
        const thousandsFormat = d3.format(',');
        const timeFormat = d3.timeFormat('%b');

        const dateParse = d3.timeParse('%Y-%m-%d');

        const finalValue = this.props.data[this.props.data.length - 1];

        return(
            <div className="chart-wrapper" >
                <svg className="chart" style={svgStyles}>
                    <g className="inner" style={innerStyles}>
                        <XAxis scale={scales.x} format={timeFormat} offsetTop={this.state.innerHeight}/>

                        <YAxis scale={scales.y} format={thousandsFormat} offsetLeft={this.state.innerWidth}/>

                        <Area data={this.props.data}
                              xKey="date"
                              yKey="cumulative"
                              scales={scales}
                              innerHeight={this.state.innerHeight}/>

                        <VerticalRuleLines data={this.props.data}
                                           x={scales.x}
                                           y={scales.y} />

                        <Line data={this.props.data} 
                              xKey="date" 
                              yKey="cumulative" 
                              scales={scales}
                              cssClass="cumulative"/>

                        <Line data={this.props.data}
                              xKey="date"
                              yKey="cumulative_target"
                              scales={scales}
                              cssClass="daily-target"/>

                        <Label xPos={scales.x(dateParse("2018-5-15"))}
                               yPos={scales.y(4250)}
                               text="30 pages per day"
                               cssClass="target-label"
                               rotation="333.5"/>

                        <FinalLabel xPos={scales.x(finalValue.date)}
                                    yPos={scales.y(finalValue.cumulative)}
                                    text={thousandsFormat(finalValue.cumulative)}/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default DailyReadings;