import React, { Component } from "react";
import * as d3 from 'd3';

class YAxis extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const goal = 30 * 365;
        const yAxisLabels = this.props.scale.ticks().slice(0,-2);

        yAxisLabels.push(goal)

        const yAxis = d3.select(this.refs.axis)
            .attr('transform', `translate(${this.props.offsetLeft},0)`)
            .call(d3.axisRight(this.props.scale)
                .tickValues(yAxisLabels)
                .tickFormat(d => d === goal ? `${this.props.format(d)} (goal)`: this.props.format(d)));

        yAxis.selectAll('.tick').filter(d => d === goal).classed('goal', true)
        yAxis.selectAll('.domain').remove();
    }

    render() {
        return(
            <g className="axis y" ref="axis"></g>
        )
    }
}

export default YAxis;