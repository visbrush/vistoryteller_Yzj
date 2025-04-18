import React from 'react';
import Chart from './Chart';
import EditPannel from './EditPannel';
import './playground.css';

import {
  HashRouter as Router,
  Switch,
  Route,
  //useParams
} from "react-router-dom";


export default class Playground extends React.Component {
  constructor(props) {
    super(props);
    let status = 'static';
    let spec = require('../spec/hiking.json');
    this.state = {
      spec: spec,
      status: status,
    };
  }
  onEndEdit = (spec) => {
    this.setState({
      spec
    })
  }
  changeStatus = (event) => {
    let { spec, specs } = this.state;
    // spec.chart.duration = event.target.value === 'animation' ? 4000 : 0;
    this.setState({
      status: event.target.value,
      spec: spec,
      specs: specs
    })
  }
  changeStaticSpec = (event) => {
    let spec = require('../spec/' + event.target.value + '.json');
    this.setState({
      spec
    })
  }
  changeSize = (event) => {
    let chart = Object.assign({}, this.state.spec.chart);
    let spec = Object.assign({}, this.state.spec);
    chart.size = event.target.value;
    spec.chart = chart;
    this.setState({
      spec: spec,
    })
  }
  showGallary = (props) => {
    props.history.push('/gallary')
  }

  render() {
    const { spec, status } = this.state;

    const staticselector = <select key="staticselector" style={{ marginLeft: '20px' }} onChange={this.changeStaticSpec}>
      <option value="scatterplot">scatterplot</option>
      <option value="linechart">linechart</option>
      <option value="barchart">barchart</option>
      <option value="hbarchart">hbarchart</option>
      <option value="piechart">piechart</option>
      <option value="unitvis">unitvis</option>
      <option value="areachart">areachart</option>
      <option value="bubblechart">bubblechart</option>
      <option value="hiking">hiking</option>
    </select>

    let specselector;
    let displayview;
    let shownspec;
    switch (status) {
      case 'static':
        specselector = staticselector;
        shownspec = spec;
        displayview = <Chart spec={spec} />;
        break;
      default:
        break;
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/*" render={
            props => {
              return <div style={{ height: "100%" }}>
                <div className="header">
                  Narrative Chart
                  {specselector}
                </div>
                <div className='pannelWrapper'>
                  <div className='editPannel'>
                    <EditPannel onEndEdit={this.onEndEdit} spec={shownspec} />
                  </div>
                  <div className='chartPannel'>
                    {displayview}
                  </div>
                </div>
              </div >
            }
          }>
          </Route>
        </Switch>
      </Router >
    )
  }
}

