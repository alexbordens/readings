import React, { Component } from "react";
import * as d3 from 'd3';

class Label extends Component {
    constructor(props) {
        super(props)

        this.generateCSSClassNames = this.generateCSSClassNames.bind(this);
    }

    generateCSSClassNames() {
        const cssClasses = [];
        const base = "label";
  
        cssClasses.push(base);

        if(this.props.cssClass !== undefined) {
            cssClasses.push(`${base}--${this.props.cssClass}`)
        }

        return cssClasses;
    }

    render() {
        const pos = {
            x: isNaN(this.props.xPos) ? 0 : this.props.xPos,
            y: isNaN(this.props.yPos) ? 0 : this.props.yPos
        }

        const rotate = `rotate(${this.props.rotation} ${pos.x} ${pos.y})`;


        return(
            <text className={this.generateCSSClassNames().join(' ')} x={pos.x} y={pos.y} transform={rotate}>
                {this.props.text}
            </text>
        )
    }
}

export default Label;