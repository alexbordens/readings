import React, { Component } from "react";
import { csv } from 'd3-fetch';
import { timeParse } from 'd3-time-format';

import DailyReadings from './DailyReadings';

class App extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isDataLoaded: false
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

        }).then((d) => this.setState({
            isDataLoaded: true,
            dailyReadingsData: d
        }));
    }

    render(){
        const dailyReadingsDimensions = {
            height: 500,
            width: 960,
            margins: {top: 10, right: 85, bottom: 20, left: 20}
        }

        let chart;

        if(this.state.isDataLoaded) {
            chart = <DailyReadings dimensions={dailyReadingsDimensions}
                                   data={this.state.dailyReadingsData}/>
        } else {
            chart = <h1>Data loading</h1> // TODO: Create real loading component
        }

        return(
            <React.Fragment>
                {chart}
            </React.Fragment>
        )
    }
}

export default App;