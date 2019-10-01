import React, { Component } from "react";
import * as d3 from 'd3';

class Line extends Component {
    constructor(props) {
        super(props);

        this.generateCSSClassNames = this.generateCSSClassNames.bind(this);
    }

    generateCSSClassNames() {
        const cssClasses = [];
        const base = "line";

        cssClasses.push(base);

        if(this.props.cssClass !== undefined) {
            cssClasses.push(`${base}--${this.props.cssClass}`)
        }

        return cssClasses;
    }

    render() {
        const line = d3.line()
            .x(d => this.props.scales.x(d[this.props.xKey]))
            .y(d => this.props.scales.y(d[this.props.yKey]));

        const cssClasses = this.generateCSSClassNames();

        return(
            <g className={cssClasses.join(' ')}>
                <path d={line(this.props.data)}></path>
            </g>
        )
    }
}

export default Line;