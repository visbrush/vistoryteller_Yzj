import React, { Component } from "react";
import './sequence.css'
import { CloseOutlined } from '@ant-design/icons'
import NarrativeChart from "../../../narrative-chart/src/vis/narrativechart";
import storyoutlineIcon from '../../../assets/pagePics/storyOutlineIcon.png'
import { Spin } from "antd";
import OperationType from "../../../constant/OperationType";
import { factColors } from "../../../constant/color";

export default class SequenceNarChart extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    updataWidthHeight =()=>{
        const { index, yourSpec, operateState,isPreview } = this.props
        console.log(isPreview)
        //装修改后的宽高
        //console.log('yourSpec != null && operateState===OperationType.GENERATED', operateState)
        
        if (yourSpec != null) {
            let updatedSpec = { ...yourSpec };
            const updateConfigAction = updatedSpec.actions.find(action => action.add === 'config');
            //上层传过来的
            const yourspeConfigAction = yourSpec.actions.find(action => action.add === 'config');
            //先判断是否存在宽高字段，如果存在就修改
            if (updateConfigAction && yourspeConfigAction) {
                if (isPreview){
                    updateConfigAction.width = 143;
                updateConfigAction.height = 145;
                }
                else{
                updateConfigAction.width = 163;
                updateConfigAction.height = 131;}
            }
            this.setState({
                yourSpec: updatedSpec
            })
            const chartdiv = '#sequenceSpec' + String(index)
            // console.log('sequence chartdiv:', chartdiv )
            // console.log('sequece yourspec:', updatedSpec)
            this.generateChart(chartdiv, updatedSpec)
        }
    }

    componentDidMount() {
        //console.log('sequence props:',this.props )
        // const { index, yourSpec, operateState } = this.props
        // //装修改后的宽高
        // //console.log('yourSpec != null && operateState===OperationType.GENERATED', operateState)
        
        // if (yourSpec != null) {
        //     let updatedSpec = { ...yourSpec };
        //     const updateConfigAction = updatedSpec.actions.find(action => action.add === 'config');
        //     //上层传过来的
        //     const yourspeConfigAction = yourSpec.actions.find(action => action.add === 'config');
        //     //先判断是否存在宽高字段，如果存在就修改
        //     if (updateConfigAction && yourspeConfigAction) {
        //         updateConfigAction.width = 163;
        //         updateConfigAction.height = 141;
        //     }
        //     this.setState({
        //         yourSpec: updatedSpec
        //     })
        //     const chartdiv = '#sequenceSpec' + String(index)
        //     // console.log('sequence chartdiv:', chartdiv )
        //     // console.log('sequece yourspec:', updatedSpec)
        //     this.generateChart(chartdiv, updatedSpec)
        // }
        this.updataWidthHeight()
    }

    componentDidUpdate(prevProps) {
        const { index, yourSpec, operateState } = this.props
        //装修改后的宽高

        if (yourSpec === null) {
            const chartdiv = '#sequenceSpec' + String(index);
            // 清空 #sequenceSpec 的内容
            if (document.querySelector(chartdiv) != null) { document.querySelector(chartdiv).innerHTML = ''; }
        }
        else if (yourSpec != null && yourSpec != prevProps.yourSpec) {
            this.updataWidthHeight()
        }
        else if (yourSpec != null && prevProps.operateState === OperationType.GENERATING_OUTLINE && operateState === OperationType.GENERATED_OUTLINE) {
            this.updataWidthHeight()
        }
        else if (yourSpec != null && prevProps.operateState === OperationType.PREVIEW && (operateState === OperationType.GENERATED_OUTLINE || operateState == OperationType.GENERATED)) {
            this.updataWidthHeight()
        }
    }

    generateChart = (chartdiv_id, Spec) => {
        const chart = new NarrativeChart();
        // console.log('sequence narrative chart:',chart)
        chart.container(chartdiv_id);
        chart.generate(Spec);
        return chart;
    }

    handleClose = (index, event) => {
        const { deleteDatafact, setFactIndex, editingFactIndex } = this.props
        deleteDatafact(index)
        if (editingFactIndex === index){
            const setIndex = index-1
            if (setIndex===-1){
                setFactIndex(index)
            }
            else{
                setFactIndex(setIndex)
            }
        }
       
        event.stopPropagation();
    }

    render() {
        const { editingFactIndex, index, yourSpec, Caption, Title, className, question, circleIndex, operateState, isPreview,factType } = this.props
        //console.log('factColors',factType)
        return (
            <>
                {isPreview === false &&
                    <div className={`sequence-card ${className}`} style={{ position: 'relative', width: '200px', height: '220px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'content', alignItems: 'center', padding: '6px', }}>
                        <span onClick={(event) => this.handleClose(index - 1, event)} style={{ position: 'absolute', left: '180px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7.47746 7L10.4013 4.07616C10.5329 3.94456 10.5329 3.73114 10.4013 3.5987C10.2697 3.4671 10.0563 3.4671 9.92384 3.5987L7 6.52254L4.07616 3.59954C3.94456 3.46794 3.73114 3.46794 3.5987 3.59954C3.4671 3.73114 3.4671 3.94456 3.5987 4.07701L6.52254 7L3.59954 9.92384C3.46794 10.0554 3.46794 10.2689 3.59954 10.4013C3.66534 10.4671 3.75139 10.5 3.83827 10.5C3.92516 10.5 4.01121 10.4671 4.07701 10.4013L7 7.47746L9.92384 10.4013C9.98964 10.4671 10.0757 10.5 10.1626 10.5C10.2495 10.5 10.3355 10.4671 10.4013 10.4013C10.5329 10.2697 10.5329 10.0563 10.4013 9.92384L7.47746 7Z" fill="#BCBDC0"/>
                            </svg>
                        </span>
                        {/* 更新单个point */}
                        {/* {question?(
                    <div style={{ position: 'absolute', left: '0px',borderRadius: '0px 4px 4px 0px',padding:'1px 4px',background:'black',display:'flex',alignItems:'center',color:'white', fontFamily:' PingFang SC',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 500}}>
                        <img
                            src={storyoutlineIcon}
                            width='14px'
                            height='14px'
                        >
                        </img>
                        <div style={{width:'2px'}}></div>
                        {circleIndex+1}
                    </div>)
                    :null} */}
                        {/* 全量更新 */}
                        {(operateState === OperationType.GENERATED_OUTLINE || operateState === OperationType.GENERATED) && question ? (
                            <div style={{
                                position: 'absolute', left: '0px', borderRadius: '0px 4px 4px 0px', padding: '1px 4px', background: 'black', display: 'flex', alignItems: 'center', color: 'white', fontFamily: ' PingFang SC',
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 500
                            }}>
                                <img
                                    src={storyoutlineIcon}
                                    width='14px'
                                    height='14px'
                                >
                                </img>
                                <div style={{ width: '2px' }}></div>
                                {circleIndex + 1}
                            </div>)
                            : null}

                        {operateState === OperationType.GENERATING_OUTLINE ?
                            // <Spin size="small" style={{ position: 'absolute', top: '98px' }}></Spin>
                            <></>
                            :
                            <>
                                <div className={index-1 === editingFactIndex ? "sequence-title" : "sequence-title sequence-title-notedit"}>
                                    <span>{Title}</span>
                                </div>

                                <div className="sequence-caption">
                                    <span>{Caption}</span>
                                </div>
                                <div className='sequence-chart' id={'sequenceSpec' + String(index)}></div>
                            </>
                        }

                    </div>}
                {isPreview === true &&
                    <div 
                    
                    className={`sequence-calliope ${factType}`}
                    style={{ display: 'flex', flexDirection: 'column', width:'170px',height: '280px', outline: '3px solid' + factColors[factType.toLowerCase()], outlineOffset: '-3px' }}>
                        <div className='sequence-chart'id={'sequenceSpec' + String(index)} ></div>
                        <div className="sequence-caption-preview" style={{paddingLeft:'10px',paddingRight:'10px'}}>
                            {Caption}
                        </div>
                        <div className="sequence-title-preview" style={{backgroundColor:factColors[factType.toLowerCase()]}}>
                            <span>{Title}</span>
                        </div>
                    </div>
                }
            </>
        )
    }
}