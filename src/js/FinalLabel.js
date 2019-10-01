import React, { Component } from "react";
import * as d3 from 'd3';

import Circle from './Circle';
import Label from './Label';

class FinalLabel extends Component {
    render() {
        return(
            <React.Fragment>
                <Circle x={this.props.xPos} y={this.props.yPos} r="4"/>
                <Label xPos={this.props.xPos + 5}
                       yPos={this.props.yPos - 10}
                       text={this.props.text}
                       cssClass="final-value"
                       rotation="0"/>
            </React.Fragment>
        )
    }
}

export default FinalLabel;