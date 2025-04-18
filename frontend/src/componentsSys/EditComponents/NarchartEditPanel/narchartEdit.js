import './narchartEdit.css'
import React, { Component } from "react";
import { Radio, message,Button } from 'antd';
import { Select, Space } from 'antd';
import config from "../../../axios/config";
import * as api from '../../../axios/api'
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import OperationType from '../../../constant/OperationType';
import { changeAniFactList, changeFactList } from '../../../action/storyAction';
import type from '../../../action/type';
import { changeConfirmLocale } from 'antd/es/modal/locale';


export default class NarchartEditPanel extends Component {
    constructor() {
        super()
        this.state = {
            isClickSubspaceAdd: false,
            // numericalList: [],
            // categoricalList: [],
            // temporalList: [],
            // temporalCategoricalList: [],
            subspaceValueList: [],
            chartMode: 'light',
            subspaceAddField: [],
            subspaceAddValue: [],

            //datafact里的内容
            type: '',
            breakdown: '',
            measurefield: '',
            measureaggregate: '',
            subspacefield: [],
            subspacevalue: [],

            changeType:'',
            changeBreakdown:'',
            changeMeasureField:'',
            changeMeasureAggregate:'',


        }
    }
    componentDidMount() {
        this.getDataFactDetails()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.editingFactIndex !== prevProps.editingFactIndex ||
            !isEqual(this.props.factList, prevProps.factList) ||
            !isEqual(this.props.originFactList, prevProps.originFactList)) {
            //console.log('enter narchartedit componentupdate:',!isEqual(this.props.factList, prevProps.factList),!isEqual(this.props.originDataFactList, prevProps.originDataFactList))
            this.getDataFactDetails()
        }
    }

    getSelectContent = () => {
        const schema = this.props.datasetSchema
        if (schema === '') {
            return
        }
        //从schema里取出numerical，categorical，temporal
        let numericalFields = []
        let numerical = schema.filter(d => d.type === "numerical")
        numericalFields = numerical.map(d => d.field)
        let categoricalFields = []
        let categorical = schema.filter(d => d.type === "categorical")
        categoricalFields = categorical.map(d => d.field)
        let temporalFields = []
        let temporal = schema.filter(d => d.type === "temporal")
        temporalFields = temporal.map(d => d.field)

        var numericalList = numericalFields.map(function (item) {
            return { value: item, label: item, }
        })
        var categoricalList = categoricalFields.map(function (item) {
            return { value: item, label: item, }
        })
        var temporalList = temporalFields.map(function (item) {
            return { value: item, label: item, }
        })

        //console.log('List',numericalList,categoricalList,temporalList,temporalCategoricalList)
        var temporalCategoricalList = categoricalList.concat(temporalList)
        // this.setState({
        //     numericalList: numericalList,
        //     categoricalList: categoricalList,
        //     temporalList: temporalList,
        //     temporalCategoricalList: temporalCategoricalList,
        // })
        return { numericalList, categoricalList, temporalList, temporalCategoricalList }
    }

    getDataFactDetails = () => {
        const { factList, originFactList, editingFactIndex } = this.props
        if (
            !Array.isArray(originFactList) ||
            editingFactIndex < 0 ||
            editingFactIndex >= originFactList.length
        ) { return null; }
        //获取mode
        // 获取指定索引的数据对象
        console.log('originFactList[editingFactIndex]', originFactList[editingFactIndex])
        const dataFact = originFactList[editingFactIndex];
        const yourSpec = factList[editingFactIndex]
        if (dataFact != null) {
            let chartMode = 'light'
            if (yourSpec != null) {
                if (yourSpec.actions && Array.isArray(yourSpec.actions)) {
                    const configActionIndex = yourSpec.actions.findIndex(
                        (action) => action.add === "config"
                    );
                    if (configActionIndex !== -1) {
                        chartMode = yourSpec.actions[configActionIndex].mode
                    }
                }
            }
            // 提取数据对象中的具体内容
            const { type, subspace, measure, breakdown } = dataFact;
            // 提取 measure 中的 field 和 aggregate
            const measurefield = measure.map((m) => m.field);
            const measureaggregate = measure.map((m) => m.aggregate);

            // 提取 subspace 中的所有 field 和 value
            const subspacefield = subspace.map((s) => s.field);
            const subspacevalue = subspace.map((s) => s.value);
            this.setState({
                dataFact,
                type,
                breakdown,
                measurefield: measurefield,
                measureaggregate: measureaggregate,
                subspacefield,
                subspacevalue,
                chartMode
            });
            //return {type,breakdown,measurefield,measureaggregate,subspacefield,subspacevalue,chartMode}
        }
        else {
            //初始化函数
        }

    }


    updateMode = (yourSpec, newMode) => {
        if (yourSpec && yourSpec.actions && Array.isArray(yourSpec.actions)) {
            // 找到第一个具有 "add": "config" 的 action
            const configActionIndex = yourSpec.actions.findIndex(
                (action) => action.add === "config"
            );
            if (configActionIndex !== -1) {
                // 更新找到的第一个 "add": "config" 的 action 的 mode
                yourSpec.actions[configActionIndex].mode = newMode;
            }
        }
        //console.log('mode',yourSpec)
        return yourSpec;
    }

    chartmodeonChange = (e) => {
        //console.log('mode',e)
        const { factList, editingFactIndex } = this.props
        const { changeFactList, changeAniFactList, } = this.props

        let currentChartmode = e.target.value
        // if (chartmode!=currentChartmode){
        let newMode = currentChartmode
        let yourSpec = cloneDeep(factList[editingFactIndex])
        let updateModeYourSpec = this.updateMode(yourSpec, newMode)
        const index = editingFactIndex

        changeFactList(updateModeYourSpec, index)
        // }
    };

    handleInsightTypeChange = async (value) => {
        this.setState({
            changeType: value
        })

    }

    //修改breakdown
    handleBreakdownChange = async (value) => {
        this.setState({
            changeBreakdown:value
        })
    }

    //更新measure field
    handleMeasureFieldChange = async (value) => {
        this.setState({
            changeMeasureField:value
        })
    };

    //更新measure aggregate
    handleMeasureAggChange = async (value) => {
        this.setState({
            changeMeasureAggregate:value
        })
    };




    handleSubspaceFieldChange = (value) => {
        const { uniqueResult } = this.props
        const foundValue = uniqueResult[value];

        if (foundValue !== undefined) {
            var foundValueList = foundValue.map(function (item) {
                return { value: item, label: item, }
            })
            this.setState({ subspaceValueList: foundValueList, subspaceAddField: value });
        } else {
            console.error(`Value "${value}" not found in uniqueResult.`);
        }
    };

    handleSubspaceValueChange = (value) => {
        this.setState({ subspaceAddValue:value });
    };

    handleSubspaceAddOk = async () => {
        const { subspaceAddField, subspaceAddValue } = this.state
        //console.log('csv_file_paths, txt_file_path',csv_file_paths, txt_file_path)
        this.setState( {
            isClickSubspaceAdd: false,
            subspacefield: [...this.state.subspacefield, subspaceAddField],
            subspacevalue: [...this.state.subspacevalue, subspaceAddValue],
        })

        
    }

    handleSubspaceDelete = (index) => {
        // 获取相应的值
        const { subspacefield, subspacevalue } = this.state
        const deletedField = subspacefield[index];
        const deletedValue = subspacevalue[index];
        // 删除对应索引的项
        const newSubspaceField = subspacefield.filter((_, i) => i !== index);
        const newSubspaceValue = subspacevalue.filter((_, i) => i !== index);
        // 更新状态
        this.setState({
            subspacefield: newSubspaceField,
            subspacevalue: newSubspaceValue,
        }, () => {
            // 在回调函数中访问最新的 state
            this.handleSaveClick();
        });
    }

    //修改后无需请求后端transform直接修改yourspec
    // removeFilterByField = (yourSpec, deletedfield) => {
    //     if (yourSpec.actions && Array.isArray(yourSpec.actions)) {
    //         yourSpec.actions.forEach((action, index) => {
    //             // 检查是否有 "filter" 属性和是否为数组
    //             if (action.filter && Array.isArray(action.filter)) {
    //                 // 过滤掉与 deletedfield 匹配的项
    //                 action.filter = action.filter.filter(filter => filter.field !== deletedfield);
    //             }
    //         });
    //     }
    //     return yourSpec;
    // }

    handleSaveClick = async ()=>{
        const { editingFactIndex, originFactList, factList, changeOriginFactList, changeFactList, changeAniFactList } = this.props
        const { csv_file_paths, txt_file_path } = this.props
        const {changeType,changeBreakdown,changeMeasureField,changeMeasureAggregate} = this.state
        const {type,subspacefield,subspacevalue,breakdown,measureaggregate,measurefield} = this.state

        let dataFact = {
            "type": "",
            "subspace": [],
            "breakdown": [],
            "measure": [{"field":"","aggregate":""}],
            "focus": []
        }
        for (let i = 0; i < subspacefield.length; i++) {
            dataFact.subspace.push({
                "field": subspacefield[i],
                "value": subspacevalue[i],
                "operator":"="
            });
        }
        dataFact['type'] = changeType !== '' ? changeType.toLowerCase() : type;
        dataFact['breakdown'][0] = changeBreakdown !== '' ? changeBreakdown:breakdown[0]
        dataFact.measure[0].aggregate = changeMeasureAggregate !== ''?changeMeasureAggregate:measureaggregate[0]
        dataFact.measure[0].field = changeMeasureField !== '' ? changeMeasureField:measurefield[0]

        if (dataFact['type'] === 'association'){
            const schema = this.props.datasetSchema
            let numerical = schema.filter(d => d.type === "numerical")
            let numericalFields = numerical.map(d => d.field)
            const firstNonMatchingField = numericalFields.find(field => field !== changeMeasureField);
            dataFact['measure'].push({ "field": firstNonMatchingField, "aggregate": changeMeasureAggregate })
        }

        try {
            const requestData = dataFact
            // 调用 generateNarJson 函数
            const response = await api.generateNarJson(requestData, csv_file_paths, txt_file_path);
            // 如果 response 包含预期的数据，才执行后续代码
            if (response.data !== 'Generate failed') {
                const animationFact = response.data["animationJsonData"]
                const nonanimationFact = response.data["jsonData"]

                changeOriginFactList(dataFact, editingFactIndex);
                changeFactList(nonanimationFact, editingFactIndex);
                changeAniFactList(animationFact, editingFactIndex)
                this.setState({
                    changeType:'',
                    changeBreakdown:'',
                    changeMeasureAggregate:'',
                    changeMeasureField:''
                })

            } else {
            }
        } catch (error) {
            this.setState({
                changeType:'',
                changeBreakdown:'',
                changeMeasureAggregate:'',
                changeMeasureField:''
            })
            console.error('Error calling generateNarJson');
            message.error('Generate failed!');
        }
    }

    render() {
        var { isClickSubspaceAdd, type,
            breakdown,
            measurefield,
            measureaggregate,
            subspacefield,
            subspacevalue, chartMode, subspaceValueList, selectedType,
            changeType,changeBreakdown,changeMeasureField,changeMeasureAggregate 
        } = this.state
        const listObject = this.getSelectContent()
        const numericalList = listObject['numericalList']
        const categoricalList = listObject['categoricalList']
        const temporalList = listObject['temporalList']
        const temporalCategoricalList = listObject['temporalCategoricalList']

        //console.log('subspacefield',subspacefield)
        return (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', margin: '5%', height: '100%' }}>
                <div style={{ position: 'absolute', left: '-5.5%' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                        <path d="M0 0C2.20914 0 4 1.79086 4 4V16C4 18.2091 2.20914 20 0 20V0Z" fill="#4680FF" />
                    </svg>
                </div>

                <span className='narchartedit-EditPanel-span'>Edit Panel</span>

                <Space direction="vertical">

                    <div className='narchartedit-chartmode'>

                        <span >Chart Mode</span>
                        <div style={{ width: '8px' }}></div>
                        <Radio.Group
                            onChange={this.chartmodeonChange}
                            key={chartMode}
                            defaultValue={chartMode}
                        >
                            <Radio.Button style={{ height: '32px', borderRadius: '4px' }} value="light">Light</Radio.Button>
                            <Radio.Button style={{ height: '32px', borderRadius: '4px' }} value="dark">Dark</Radio.Button>
                        </Radio.Group>


                    </div>

                    <div className='narchartedit-breakdown'>
                        <span>InsightType</span>
                        <div style={{ width: '16px' }}></div>
                        <Select
                            value={changeType !== '' ? changeType : type}
                            style={{
                                height: '32px',
                                width: '100%',
                                borderRadius: '4px'
                            }}
                            onChange={this.handleInsightTypeChange}
                            options={[
                                {
                                    value: 'Proportion',
                                    label: 'proportion',
                                },
                                {
                                    value: 'Distribution',
                                    label: 'distribution',
                                },
                                {
                                    value: 'Categorization',
                                    label: 'categorization',
                                },
                                {
                                    value: 'Value',
                                    label: 'value',
                                },
                                {
                                    value: 'Extreme',
                                    label: 'extreme',
                                },
                                {
                                    value: 'Association',
                                    label: 'association',
                                },
                                {
                                    value: 'Difference',
                                    label: 'difference',
                                },
                                {
                                    value: 'Rank',
                                    label: 'rank',
                                },
                                {
                                    value: 'Outlier',
                                    label: 'outlier',
                                },
                                {
                                    value: 'Trend',
                                    label: 'trend',
                                },
                            ]}
                        />

                    </div>

                    <div className='narchartedit-breakdown'>
                        <span>Breakdown</span>
                        <div style={{ width: '18px' }}></div>
                        <Select
                            //defaultValue={breakdown}
                            value={changeBreakdown!= ''?changeBreakdown:breakdown}
                            style={{
                                height: '32px',
                                width: '100%',
                                borderRadius: '4px'
                            }}
                            onChange={this.handleBreakdownChange}
                            options={categoricalList}
                        />

                    </div>



                    <div className='narchartedit-measure'>
                        <span>Measure</span>
                        <div style={{ width: '41px' }}></div>
                        <div className='narchartedit-measure-select'>
                            <Select
                                //defaultValue={measureField}
                                value={changeMeasureField!=''?changeMeasureField:measurefield}
                                style={{ width: '70%', borderRadius: '4px' }}
                                onChange={this.handleMeasureFieldChange}
                                options={numericalList}
                            //disabled={selectedType === 'categorization' || type  === 'categorization'}
                            />
                            <Select
                                //defaultValue={measureAgg}
                                value={changeMeasureAggregate!=''?changeMeasureAggregate:measureaggregate}
                                style={{ width: '30%', borderRadius: '4px' }}
                                onChange={this.handleMeasureAggChange}
                                //disabled={selectedType === 'categorization' || type  === 'categorization'}
                                options={[
                                    {
                                        value: 'sum',
                                        label: 'sum',
                                    },
                                    {
                                        value: 'avg',
                                        label: 'avg',
                                    },
                                    {
                                        value: 'count',
                                        label: 'count',
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div className='narchartedit-subspace'>
                        <span style={{ marginTop: '4px' }}>Subspace</span>
                        <div style={{ width: '32px' }}></div>

                        {isClickSubspaceAdd === false && (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                {subspacefield.length !== 0 && subspacevalue.length !== 0 && subspacefield.length === subspacevalue.length ? (
                                    subspacefield.map((field, index) => (
                                        <div key={index} style={{ width: '100%', height: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '4px', padding: '6px 12px', background: "#F0F6FF", marginBottom: '4px' }}>
                                            {/* 在这里使用每个subspacefield的值进行操作 */}
                                            {`${field}=${subspacevalue[index]}`}
                                            <div
                                                onClick={() => this.handleSubspaceDelete(index)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M13.125 4.5H10.75V3.625C10.75 3 10.25 2.5 9.625 2.5H6.375C5.75 2.5 5.25 3 5.25 3.625V4.5H2.875C2.675 4.5 2.5 4.675 2.5 4.875C2.5 5.075 2.675 5.25 2.875 5.25H13.125C13.325 5.25 13.5 5.075 13.5 4.875C13.5 4.675 13.325 4.5 13.125 4.5ZM6 4.5V3.625C6 3.425 6.175 3.25 6.375 3.25H9.625C9.825 3.25 10 3.425 10 3.625V4.5H6ZM11.85 6C11.65 6 11.475 6.175 11.475 6.375V12.05C11.475 12.425 11.175 12.75 10.775 12.75H5.2C4.825 12.75 4.5 12.45 4.5 12.05V6.375C4.5 6.175 4.325 6 4.125 6C3.925 6 3.75 6.175 3.75 6.375V12.05C3.75 12.85 4.4 13.5 5.2 13.5H10.8C11.6 13.5 12.25 12.85 12.25 12.05V6.375C12.225 6.175 12.05 6 11.85 6Z" fill="#585858" />
                                                    <path d="M6.94922 11.625V6.375C6.94922 6.175 6.77422 6 6.57422 6C6.37422 6 6.19922 6.175 6.19922 6.375V11.625C6.19922 11.825 6.37422 12 6.57422 12C6.77422 12 6.94922 11.825 6.94922 11.625ZM9.79922 11.625V6.375C9.79922 6.175 9.62422 6 9.42422 6C9.22422 6 9.04922 6.175 9.04922 6.375V11.625C9.04922 11.825 9.22422 12 9.42422 12C9.62422 12 9.79922 11.825 9.79922 11.625Z" fill="#585858" />
                                                </svg>
                                            </div>
                                        </div>

                                    ))
                                ) : null}

                                <div style={{ width: '100%', height: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--text-text-icon-03, #DCDEE1)', borderRadius: '4px', padding: '5px' }}
                                    onClick={() => this.setState({ isClickSubspaceAdd: true })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.8 8.7623H2.2C1.77969 8.7623 1.4375 8.41855 1.4375 7.9998C1.4375 7.57949 1.78125 7.2373 2.2 7.2373H13.7984C14.2188 7.2373 14.5609 7.58105 14.5609 7.9998C14.5625 8.42012 14.2188 8.7623 13.8 8.7623Z" fill="#898B8F" />
                                        <path d="M7.23828 13.8V2.2C7.23828 1.77969 7.58203 1.4375 8.00078 1.4375C8.42109 1.4375 8.76328 1.78125 8.76328 2.2V13.7984C8.76328 14.2188 8.41953 14.5609 8.00078 14.5609C7.58047 14.5625 7.23828 14.2188 7.23828 13.8Z" fill="#898B8F" />
                                    </svg>
                                </div>
                            </div>

                        )}
                        {isClickSubspaceAdd && (
                            <div className='subspace-add'>
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select
                                        placeholder='Field'
                                        style={{
                                            width: '100%',
                                            // marginBttom:'5%',
                                        }}
                                        onChange={this.handleSubspaceFieldChange}
                                        options={categoricalList}
                                    />
                                    <Select
                                        placeholder='Value'
                                        style={{
                                            width: '100%',
                                            // marginBttom:'5%',
                                        }}
                                        onChange={this.handleSubspaceValueChange}
                                        options={subspaceValueList}
                                    />

                                    <div className='subspace-add-span' style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <div className="hoverColor" style={{ cursor: 'pointer', marginRight: '16px' }} onClick={() => this.setState({ isClickSubspaceAdd: false })}>Cancel</div>
                                        <div className="hoverColor" style={{ cursor: 'pointer', }} onClick={this.handleSubspaceAddOk}>Save</div>
                                    </div>
                                </Space>
                            </div>
                        )}
                    </div>

                    <div style={{display:'flex',justifyContent:'center'}}>
                    <Button className="save-btn" onClick={this.handleSaveClick}>Save Changes</Button>
                    
                    </div>
                </Space>
            </div>
        )
    }
}