import React, { Component } from 'react';
import { AutoVis } from './vis';
import get_spec from './spec/spec';
export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        //const { id } = this.props.spec.chart;
        //let spec = this.props.spec;
        //let container = id ? `#vischart_${id}` : "#demo-chart";
        let container = "#demo-chart"
        this.autovis = new AutoVis(this.props.chartType);
        this.autovis.container(container);
        //this.autovis.load(this.props.spec);
        this.autovis.generate();
    }

    componentDidUpdate() {
        // const { id } = this.props.spec.chart;
        // let spec = this.props.spec;
        // let container = id ? `#vischart_${id}` : "#demo-chart";\

        let container = "#demo-chart";
        this.autovis = new AutoVis();
        this.autovis.container(container);
        this.autovis.load(get_spec(this.props.chartType, this.props.node1, this.props.node2));
        this.autovis.generate();
        //style={{ height: height, width: width, position: "relative" }}
    }



    render() {
        let height = 400, width = 400;
        const { id } = "demo-chart";
        return (
            <div id={id ? `vischart_${id}` : 'demo-chart'}  >
            </div>
        )
    }
}