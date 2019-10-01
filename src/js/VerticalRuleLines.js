import React, { Component } from "react";

class VerticalRuleLines extends Component {
    render() {
        const data = this.props.data.filter(d => d.date.getDate() === 1);
        
        let lines = [];

        data.forEach((d,i) => {
            const line = <line key={i}
                               className="rule-line"
                               x1={this.props.x(d.date)}
                               x2={this.props.x(d.date)}
                               y1={this.props.y(0)}
                               y2={this.props.y(d.cumulative)}></line>

            lines.push(line);
        });
    
        return(
            <g className="rule-lines rule-lines--vertical">
                {lines}
            </g>
        )
    }
}

export default VerticalRuleLines;