import React, { Component } from "react";
import { csv } from 'd3-fetch';
import { timeParse } from 'd3-time-format';

import DailyReadings from './DailyReadings';

class App extends Component{
    constructor(props) {
        super(props)

        this.state = {
            dailyReadingsData: []
        }
    }

    componentDidMount() {
        const dateParse = timeParse('%Y-%m-%d');

        csv("./data/CY18-readings.csv", function(d) {
            return {
                cumulative: +d.cumulative,
                cumulative_target: +d.cumulative_target,
                date: dateParse(d.date),
                page_count: +d.page_count
            }

        }).then((d) => this.setState({ dailyReadingsData: d}));
    }

    render(){
        const dailyReadingsDimensions = {
            height: 500,
            width: 960,
            margins: {top: 10, right: 85, bottom: 20, left: 20}
        }

        return(
            <DailyReadings
                dimensions={dailyReadingsDimensions}
                data={this.state.dailyReadingsData}/>
        )
    }
}

export default App;