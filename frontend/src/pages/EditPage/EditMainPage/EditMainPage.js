import React, { Component } from 'react'
import './EditMainPage.css'
import { useNavigate, Link } from 'react-router-dom'
// import { navigate } from '@reach/router';
import OperationType from '../../../constant/OperationType'
import edit2Preview from '../../../assets/pagePics/edit2Preview.png'
import { Layout, Divider, Button, Space, Card, Popover } from "antd"
import { Spin } from 'antd'
import editBackground from '../../../assets/pagePics/editBackground.png'
import SequencePanel from '../../../componentsSys/EditComponents/SequencePanel'
import SingleNarchart from '../../../componentsSys/EditComponents/SingleNarchart/'
import SingleNarchartInfo from '../../../componentsSys/EditComponents/SingleNarchartInfo/narchartInfo'
import NarchartEditPanel from '../../../componentsSys/EditComponents/NarchartEditPanel'
import DrawingOutline from '../../../componentsSys/EditComponents/Storyoutline'
import LeftPanel from '../../../componentsSys/EditComponents/LeftSingleNarchartPanel/';
import LeftPlot from '../../../componentsSys/EditComponents/EditPageLeftPlot/EditPageLeftPlot.js';
// import DrawerStyle from '../../../componentsSys/EditComponents/EditPageLeftPlot/DrawerStyle.js';
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';
import Analyst from '../../../pics/Agents/Analyst.png';
import Editor from '../../../pics/Agents/Editor.png';
import Reviewer from '../../../pics/Agents/Reviewer.png';
import Scripter from '../../../pics/Agents/Scripter.png';

//import HeadBarView from "@/components/HeadBar/index";
//import OperationType from '@/constant/OperationType';



const { Header, Content } = Layout;

const imageStyle = {
    width: '36px',
    height: '24px',
    marginRight: '2px',
    objectfit: 'contain',
};
  
const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0px',
};
  
const wordStyle1 = {
    // marginLeft: '44px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 'auto',
    maxheight: '25%',
    fontSize: '10px',
    color: '#7E7E7E',
    lineheight: '15px',
    fontFamily: 'AlibabaPuHuiTi',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    width: '150px',
};
  
const wordStyle2 = {
    position: 'relative',
    alignItems: 'center',
    marginBottom: '0px',
    height: 'auto',
    maxheight: '25%',
    fontSize: '10px',
    color: '#7E7E7E',
    lineheight: '15px',
    fontFamily: 'AlibabaPuHuiTi',
    display: 'inline-block',
    borderRadius: '20px',
    padding: '5px 15px',
    wordWrap: 'break-word', 
    whiteSpace: 'normal',
    width: '200px',
    marginLeft: '-105px', 
    backgroundColor: 'rgba(189, 221, 157, 0.25)',
};
  
const wordStyle3 = {
    position: 'relative',
    alignItems: 'center',
    marginBottom: '0px',
    height: 'auto',
    maxheight: '25%',
    fontSize: '10px',
    color: '#7E7E7E',
    lineheight: '15px',
    fontFamily: 'AlibabaPuHuiTi',
    display: 'inline-block',
    borderRadius: '20px',
    padding: '5px 15px',
    wordWrap: 'break-word', 
    whiteSpace: 'normal',
    width: '200px',
    marginLeft: '-105px', 
    backgroundColor: 'rgba(199, 201, 255, 0.25)',
};
  
const wordStyle4 = {
    position: 'relative',
    alignItems: 'center',
    marginBottom: '0px',
    height: 'auto',
    maxheight: '25%',
    fontSize: '10px',
    color: '#7E7E7E',
    lineheight: '15px',
    fontFamily: 'AlibabaPuHuiTi',
    display: 'inline-block',
    borderRadius: '20px',
    padding: '5px 15px',
    wordWrap: 'break-word', 
    whiteSpace: 'normal',
    width: '200px',
    marginLeft: '-105px', 
    backgroundColor: 'rgba(191, 205, 255, 0.25)',
};
  
const wordStyle5 = {
    position: 'relative',
    alignItems: 'center',
    marginBottom: '0px',
    height: 'auto',
    maxheight: '25%',
    fontSize: '10px',
    color: '#7E7E7E',
    lineheight: '15px',
    fontFamily: 'AlibabaPuHuiTi',
    display: 'inline-block',
    borderRadius: '20px',
    padding: '5px 15px',
    wordWrap: 'break-word', 
    whiteSpace: 'normal',
    width: '200px',
    marginLeft: '-105px', 
    backgroundColor: 'rgba(253, 217, 163, 0.25)',
};

const editorWords = (title) => {
    if(title == 'distribution' || title == 'Distribution') return 'I\'ve designed a bar chart for this data fact.';
    if(title == 'proportion' || title == 'Proportion') return 'I\'ve designed a pie chart for this data fact.';
    if(title == 'Rank'  || title == 'rank') return 'I\'ve designed a bar chart for this data fact.';
    if(title == 'Association' || title == 'association') return 'I\'ve designed a scatter chart for this data fact.';
    if(title == 'value' || title == 'Value') return 'I\'ve designed a number chart for this data fact.';
    if(title == 'categorization' || title == 'Categorization') return 'I\'ve designed a grid chart for this data fact.';
    if(title == 'trend' || title == 'Trend') return 'I\'ve designed a line chart for this data fact.';
    else return 'Here present a bar chart.';
}

export default class EditMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.editableDivInfoTitleRef = React.createRef();
        this.state = {
            isClickedDot: false,
            isHoveredTitle: false,
            isHoveredKp: false,
            savedSelection: null,
            left: 0,
            top: 0,

            leftPosition: 0,

            // factList: [yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_3, yourSpec_4,],
            // infoTitle: 'Hiking',
            // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
            // captionList: ['The count of gender is 100', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            // titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],

        }
    }

    componentDidMount() {
        //console.log('EditMainPage props:', this.props)
    }


    shouldComponentUpdate(nextProps) {
        // 如果只有 infoTitle 发生变化，阻止重新渲染
        //还有一点小bug
        //console.log('nextProps.infoTitle,this.props.infoTitle',!(nextProps.infoTitle !== this.props.infoTitle) && !(nextProps.keyPoint != this.props.keyPoint))
        return !(nextProps.infoTitle !== this.props.infoTitle) && !(nextProps.keyPoint != this.props.keyPoint);
    }


    EditableStoryTitleInput = (e) => {
        this.props.changeStoryTitle(e.currentTarget.innerHTML)
    }

    EditableStoryKeypointInput = (e) => {

        this.props.changeStoryKeypoint(e.currentTarget.innerHTML)
    }

    handleMouseEnterKp = () => {
        this.setState({ isHoveredKp: true });
    };

    handleMouseLeaveKp = () => {
        this.setState({ isHoveredKp: false });
    };

    handleMouseEnterTitle = () => {
        this.setState({ isHoveredTitle: true });
    };

    handleMouseLeaveTitle = () => {
        this.setState({ isHoveredTitle: false });
    };

    goToPreview = () => {
        const { updateUserOperation } = this.props
        updateUserOperation(OperationType.PREVIEW)
    }

    componentDidMount() {
        const existingComponent = document.getElementById('MainPanel');
        const rect = existingComponent.getBoundingClientRect();
        
        this.setState({
          left: rect.left + window.scrollX - 200,
          top: rect.top + window.scrollY - 25,
        });
      }
    
    componentDidMount() {
        if (this.editableDivInfoTitleRef.current) {
            const rect = this.editableDivInfoTitleRef.current.getBoundingClientRect();
            this.setState({ leftPosition: rect.left });
        }
    }
    
    render() {
        const { editingFactIndex, factList, infoTitle, keyPoint, captionList, titleList, schema, originFactList, chartmode, breakdownField, measureField, measureAgg } = this.props
        const { operateState } = this.props
        const { isClickedDot, isHoveredKp, isHoveredTitle } = this.state
        const conversation = this.props.conversation
        console.log("conversation this.props", this.state)
        console.log("conversation this.props", this.props)

        return (
            <div className='edit-main-content' style={{ position: 'relative', height: '100%', minHeight: '836px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                {operateState === OperationType.GENERATING_OUTLINE ?
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(62, 122, 255, 0.2)',  // 半透明黑色背景
                            zIndex: 1000,  // 设置 zIndex，确保蒙版在其他元素之上
                        }}
                    >
                        <div className="generatingInfo" style={{ position: 'absolute', top: '100px', zIndex: 5 }}>
                            <Space size={8}>
                                <Spin size="small"></Spin>
                                <span>{'Generating, please wait a moment...'}</span>
                            </Space>
                        </div>
                    </div>
                    :
                    <></>
                }

                <div className='edit-main-left' style={{ height: '100%', width: '73%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className='main-left-top'>
                        <div className='left-single-fact' style={{ position: "relative" }}>

                            <Space direction="vertical" size={1} style={{ width: '81%' }}>

                                <div className='single-titlt-box' style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '', top: '' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="16" viewBox="0 0 4 16" fill="none">
                                            <path d="M0 0C2.20914 0 4 1.79086 4 4V12C4 14.2091 2.20914 16 0 16V0Z" fill="#4680FF" />
                                        </svg>
                                    </div>
                                    <div
                                        className="editable-div"
                                        ref={this.editableDivInfoTitleRef}
                                        style={{
                                            //border: '1px solid gray',
                                            marginLeft: '10px',
                                            padding: '0 10px ',
                                            background: isHoveredTitle ? '#F1F1F1' : '',
                                            border: 'none',
                                        }}
                                        contentEditable
                                        onMouseEnter={this.handleMouseEnterTitle}
                                        onMouseLeave={this.handleMouseLeaveTitle}
                                        onInput={this.EditableStoryTitleInput}
                                        dangerouslySetInnerHTML={{ __html: infoTitle || 'Enter the title...' }}
                                    />
                                </div>
                                <div
                                    className="editable-div"

                                    style={{
                                        marginLeft: '10px',
                                        padding: '0 0 0 10px ',
                                        color: '#7E7E7E',
                                        background: isHoveredKp ? '#F1F1F1' : '',
                                    }}
                                    contentEditable
                                    onInput={this.EditableStoryKeypointInput}
                                    onMouseEnter={this.handleMouseEnterKp}
                                    onMouseLeave={this.handleMouseLeaveKp}
                                    dangerouslySetInnerHTML={{ __html: keyPoint || 'Enter the keypoint...' }}
                                />
                            </Space>
                            {/* <div onClick={this.goToPreview}
                            // style={{position:'absolute', right:'0',top:'50%'}}
                            > */}

                            <div style={{ height: "40px" }}>
                                <Link to="/preview/datastory">
                                    <img
                                        src={edit2Preview}
                                        alt='edit2Preview pic'
                                        width={'147px'}
                                        height={'40px'}
                                        onClick={this.goToPreview}
                                    ></img>
                                </Link>
                            </div>

                            {/* </div> */}

                        </div>
                        <div className='left-showedit-panel'>
                            {editingFactIndex !== null && editingFactIndex !== -1 && (

                                <Space size={48} style={{ justifyContent: 'center', }}>
                                    {/* <LeftPanel></LeftPanel> */}

                                    <div style = {{ marginLeft: '20px' }}>
                                        <Card style = {{ width: '290px', height: '330px', overflow: 'auto', marginTop: '20px'}}>

                                            <p>
                                                <div style = {{ display: 'flex', }}>
                                                    <div>
                                                        <img src={Analyst} style={imageStyle} />
                                                        <div style = {wordStyle1}>
                                                            Analyst
                                                        </div>
                                                    </div>
                                                    <div style = {wordStyle2}>
                                                        { conversation }
                                                        {/* I've loaded datasets, filtered them for unfunded records, grouped by industry, calculated average survival times, and ranked industries based on these times to analyze failure causes. */}
                                                    </div>
                                                </div>
                                            </p>

                                            <p>
                                                <div style = {{ display: 'flex', }}>
                                                    <div>
                                                        <img src={Scripter} style={imageStyle} />
                                                        <div style = {wordStyle1}>
                                                            Scripter
                                                        </div>
                                                    </div>
                                                    <div style = {wordStyle3}>
                                                        { conversation }
                                                        {/* I've analyzed how plots relate to the theme of startup failures, identifying trends and key factors, and also considered different entities like funding status and causes of failure. */}
                                                    </div>
                                                </div>
                                            </p>

                                            <p>
                                                <div style = {{ display: 'flex', }}>
                                                    <div>
                                                        <img src={Reviewer} style={imageStyle} />
                                                        <div style = {wordStyle1}>
                                                            Reviewer
                                                        </div>
                                                    </div>
                                                    <div style = {wordStyle4}>
                                                        { conversation }
                                                        {/* I've analyzed responses from an LLM agent, focusing on their content, context, and effectiveness. This helps in understanding the agent's capabilities and areas needing improvement. */}
                                                    </div>
                                                </div>
                                            </p>

                                            <p>
                                                <div style = {{ display: 'flex', }}>
                                                    <div>
                                                        <img src={Editor} style={imageStyle} />
                                                        <div style = {wordStyle1}>
                                                            Editor
                                                        </div>
                                                    </div>
                                                    <div style = {wordStyle5}>
                                                        { editorWords(titleList[editingFactIndex]) }
                                                    </div>
                                                </div>
                                            </p>

                                        </Card>
                                    </div>

                                    <div id = "MainPanel" style={{ justifyContent: 'center', }}>

                                        {/* <div className='showedit-panel-information'>
                                        <SingleNarchartInfo point={'point_d'} factType={titleList[editingFactIndex]}></SingleNarchartInfo>
                                    </div> */}
                                        <SingleNarchart
                                            name={'leftmain_yourspec'}
                                            IndexStyle={index60} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                        />
                                    </div>
                                    {/* <div style = {{position: 'absolute', left: `${this.state.left}px`, top: `${this.state.top}px`, }}>
                                        <LeftPlot/>
                                    </div> */}
                                </Space>

                            )}
                        </div>
                    </div>

                    <div className='main-left-bottom'>
                        <div className='left-sequence-overview'>
                            <div className='sequence-datafacts-sum'>
                                <span>DataFacts</span>
                                <span>{factList.length}</span>
                            </div>
                        </div>
                        <div className='left-sequence'>
                            <SequencePanel
                                factList={factList}
                                captionList={captionList}
                                titleList={titleList}
                                originFactList={originFactList}
                            />

                        </div>
                    </div>
                </div>

                <div className='edit-main-right' style={{ height: '100%', width: '27%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1.5px solid rgb(212, 212, 212)', background: 'white', gap: '-30px' }}>
                    <div className='main-right-top'>
                        <NarchartEditPanel
                        />
                    </div>
                    <div className='main-right-bottom'>
                        <Space>
                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                                <path d="M0 0C2.20914 0 4 1.79086 4 4V16C4 18.2091 2.20914 20 0 20V0Z" fill="#4680FF" />
                            </svg>
                            <span className='right-bottom-storyoutline'>Flow</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8.09607 4.75C7.44978 4.75 6.94323 4.92691 6.56769 5.28072C6.29175 5.53477 6.11939 5.85833 6.04413 6.25138C5.99243 6.52141 6.22288 6.7465 6.49782 6.7465C6.77275 6.7465 6.98087 6.51876 7.05257 6.25333C7.08859 6.11997 7.14206 6.00636 7.21397 5.91252C7.38865 5.68507 7.65939 5.57556 8.03493 5.57556C8.33188 5.57556 8.56769 5.65138 8.73362 5.81143C8.89083 5.97149 8.97817 6.19052 8.97817 6.46851C8.97817 6.67911 8.89956 6.88129 8.74236 7.06662C8.67249 7.14244 8.49782 7.30249 8.21834 7.54679C7.93013 7.79109 7.72926 8.02696 7.61572 8.25441C7.49345 8.48186 7.44105 8.75986 7.44105 9.07997V9.14782C7.44105 9.42516 7.66588 9.65 7.94323 9.65C8.22058 9.65 8.44541 9.42516 8.44541 9.14782V9.07997C8.44541 8.87779 8.48908 8.69246 8.57642 8.52398C8.65502 8.37235 8.76856 8.22914 8.92576 8.1112C9.34498 7.75739 9.59825 7.52994 9.67686 7.4457C9.9113 7.19444 10 6.83074 10 6.40954C10 5.89567 9.82533 5.49132 9.47598 5.19648C9.12664 4.89321 8.66375 4.75 8.09607 4.75Z" fill="#252931" />
                                <path d="M7.375 10.875C7.375 11.2202 7.65482 11.5 8 11.5C8.34518 11.5 8.625 11.2202 8.625 10.875C8.625 10.5298 8.34518 10.25 8 10.25C7.65482 10.25 7.375 10.5298 7.375 10.875Z" fill="#252931" />
                                <path d="M15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" fill="#252931" />
                            </svg>
                        </Space>
                        <div style={{ height: '16px' }}></div>
                        <DrawingOutline></DrawingOutline>
                    </div>
                </div>
            </div>
        )
    }
}