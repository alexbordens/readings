import React, { Component } from "react";
import * as d3 from 'd3';

class XAxis extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {   
        d3.select(this.refs.axis)
            .attr('transform', `translate(0,${this.props.offsetTop})`)
            .call(d3.axisBottom(this.props.scale)
                .tickFormat(this.props.format));
    }

    render() {
        return(
            <g className="axis x" ref="axis"></g>
        )
    }
}

export default XAxis;