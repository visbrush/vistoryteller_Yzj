import React from "react";
import './main.css'
import AutoVis from '/Users/17713/Desktop/ontology/frontend/src/graph-chart/vis/autovis'
import Graph from "../../graph-chart/Graph";
//import HeaderComponent from "../../components/header/header";
import { Layout } from 'antd';
//import Info from "./components/thinteraction/interaction"; //显示哪一个信息图
import Info from "./components/seanimation/animation"; //显示哪一个信息图
//import Info from "./components/seinfographic/infographic"; //显示哪一个信息图
import { Select, Row, Col } from 'antd';

const { Header, Sider, Content } = Layout;

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node1: '',
            node2: '',
            chartType: 'neighborin'
        };
    }

    componentDidMount() {
    }

    handleNodeChange = (value) => {
        this.setState({ node1: value });
    }

    handleChartTypeChange = (value) => {
        this.setState({ chartType: value });
    }
    handleNodeChange2 = (value) => {
        this.setState({ node2: value });
    }


    render() {
        const nodes = [{ "id": "Napoleon", "group": 1 },
        { "id": "MlleBaptistine", "group": 1 },
        { "id": "MmeMagloire", "group": 1 },
        { "id": "Count", "group": 2 },
        { "id": "OldMan", "group": 1 },
        { "id": "Labarre", "group": 2 }];

        const chartTypes = [{ "value": "neighborin", "label": "Neighbor In" },
        { "value": "neighborout", "label": "Neighbor Out" },
        { "value": "accessibilityin", "label": "Accessibility In" },
        { "value": "accessibilityout", "label": "Accessibility Out" },
        { "value": "connectivity", "label": "Connectivity" },
        ]

        return (
            <>
                <Row>
                    <Col span={6}>图表类型:
                        <Select
                            defaultValue="neighborin"
                            style={{ width: 200, marginLeft: 20 }}
                            onChange={this.handleChartTypeChange.bind(this)}
                        >
                            {chartTypes.map((type, index) => (
                                <Select.Option key={index} value={type.value}>
                                    {type.label}
                                </Select.Option>
                            ))}
                        </Select></Col>
                    <Col span={6}>关注的节点:
                        <Select
                            onChange={this.handleNodeChange}
                            style={{ width: 200, marginLeft: 20 }}
                        >
                            {nodes.map((node, index) => (
                                <Select.Option key={index} value={node.id}>
                                    {node.id}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>

                    {this.state.chartType === "connectivity" && (
                        <Col span={6}>
                            <Select
                                onChange={this.handleNodeChange2}
                                style={{ width: 200, marginLeft: 20 }}
                            >
                                {nodes.map((node, index) => (
                                    <Select.Option key={index} value={node.id}>
                                        {node.id}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                    )}
                </Row>
                <Graph chartType={this.state.chartType} node1={this.state.node1} node2={this.state.node2}  ></Graph>
            </>



        )
    }
}