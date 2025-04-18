import React, { useState } from 'react';
import { Card, Button, Popover } from 'antd';
import Analyst from '../../../pics/Agents/Analyst.png';
import Editor from '../../../pics/Agents/Editor.png';
import Reviewer from '../../../pics/Agents/Reviewer.png';
import Scripter from '../../../pics/Agents/Scripter.png';
import QuestionStyle from '../../../componentsSys/EditComponents/EditPageLeftPlot/QuestionStyle.js';
import DrawingOutline from '../../../componentsSys/EditComponents/Storyoutline/storyoulineEdit.js';
import NarrativeChart from "../../../narrative-chart/src/vis/narrativechart";
import '../../../componentsSys/EditComponents/SingleNarchart/narchart.css'
// import DrawerStyle from '../../../componentsSys/EditComponents/EditPageLeftPlot/DrawerStyle.js';

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


export default class LeftPlot extends React.Component {
  constructor(props) {
    super(props);
    this.narcharRef = React.createRef();
    this.facttypeRef = React.createRef();
    this.introRef = React.createRef()
    this.state={
      yourSpec:this.props.yourSpec,
      width:280,
      height:165,

    }
  }


  componentDidMount() {
    const { factList,editingFactIndex} = this.props
    const yourSpec=factList[editingFactIndex]
    // const chartdiv = '#' + name
    // this.generateChart(chartdiv, yourSpec)
    //console.log('singleNarChart props:',this.props)
    if (yourSpec !=null){
      this.updateYouspecWH()
    }
    
  }


  componentDidUpdate(prevProps, prevState) {
    //使用 prevProps 和 prevState 来检测属性和状态的变化
    const {width,height} = this.state
    const { name} = this.props
    const { factList,editingFactIndex} = this.props
    const yourSpec=factList[editingFactIndex]

    
    if (yourSpec == null)
    {
      const chartdiv = name;
      //console.log('querySelector(chartdiv).innerHTML',document.getElementById(chartdiv))
      // 清空 #sequenceSpec 的内容
      document.getElementById(chartdiv).innerHTML = '';
    }
    
    else if (yourSpec !=null&&(this.props.editingFactIndex !== prevProps.editingFactIndex)) {  
      this.updateYouspecWH()
      //console.log('change')
    }
    else if (yourSpec !=null&&(yourSpec !== prevProps.factList[prevProps.editingFactIndex])) {  
      this.updateYouspecWH()
      //console.log('change')
    }

  }


  shouldComponentUpdate(nextProps) {
    // 如果只有 infoTitle 发生变化，阻止重新渲染
    //还有一点小bug
    //console.log('nextProps.infoTitle,this.props.infoTitle',nextProps.Intro != this.props.Intro)
    //console.log('nextProps.Title,this.props.Title',nextProps.Title,this.props.Title)
    const {editingFactIndex,factList,titleList,captionList} = this.props
    const Title=titleList[editingFactIndex] 
    const Intro=captionList[editingFactIndex] 
    const Index=editingFactIndex + 1
    const yourSpec = factList[editingFactIndex]
      // 如果编辑索引未更改，继续更新
  if (nextProps.editingFactIndex === editingFactIndex && yourSpec === nextProps.factList[nextProps.editingFactIndex]) {
    
    const Title = titleList[editingFactIndex];
    const Intro = captionList[editingFactIndex];
    //console.log('in shouldComponentUpdate',!(nextProps.titleList[nextProps.editingFactIndex] !== Title) && !(nextProps.captionList[nextProps.editingFactIndex] != Intro))
    console.log('shouldComponentUpdate', !(nextProps.titleList[nextProps.editingFactIndex] !== Title) && !(nextProps.captionList[nextProps.editingFactIndex] != Intro))
    // 如果标题和介绍未更改，阻止更新
    return  !(nextProps.titleList[nextProps.editingFactIndex] !== Title) && !(nextProps.captionList[nextProps.editingFactIndex] != Intro);
  }
  
  // 如果编辑索引已更改，继续更新
  return true;
}
    

  updateYouspecWH = () =>{

    const {name} = this.props
    const { factList,editingFactIndex} = this.props
    const yourSpec=factList[editingFactIndex]
    const chartdiv = '#' + name

    //获取facttype和intro的高度
    const facttypeElement = this.facttypeRef.current
    const introElement = this.introRef.current
    let facttypeElementHeight = 0
    let introElementHeight = 0
    if (facttypeElement){
      facttypeElementHeight=facttypeElement.clientHeight
    }
    if(introElement){
      introElementHeight=introElement.clientHeight
    }

    const narchartElement = this.narcharRef.current;
    //获得narchartElement减去padding后的宽高
    const computedStyle = window.getComputedStyle(narchartElement);
    // 提取宽度和高度（包括 padding）
    const currentWidthWithPadding = parseFloat(computedStyle.width);
    const currentHeightWithPadding = parseFloat(computedStyle.height);
  
    // 提取 padding
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
  
    // 计算减去 padding 后的宽高
    const currentWidth = currentWidthWithPadding - paddingLeft - paddingRight;
    const currentHeight = currentHeightWithPadding - paddingTop - paddingBottom;    
    // const currentWidth = narchartElement.clientWidth;
    // const currentHeight = narchartElement.clientHeight;
    //console.log(narchartElement)
    console.log('yourSpec.actions',yourSpec)
    const yourspeConfigAction = yourSpec.actions.find(action => action.add === 'config');
    if (yourspeConfigAction) {
      
    if (Math.abs(currentWidth - yourspeConfigAction.width) > 10 || Math.abs(currentHeight - yourspeConfigAction.height) > 10) {
      console.log('重置 yourspec 的宽高配置')
      // 重置 yourspec 的宽高配置
      // 假设 yourSpec 是不可变对象，使用 spread 运算符创建新的对象
      let newWidth,newHeight;
      if (currentWidth/currentHeight < 1.3){
        newWidth=currentWidth
        newHeight=currentHeight-facttypeElementHeight-introElementHeight-10
      }
      else{
        newWidth=currentHeight
        newHeight=currentHeight-facttypeElementHeight-introElementHeight-10
      }
      let updatedSpec = { ...yourSpec};
      const configAction = updatedSpec.actions.find(action => action.add === 'config');
      if (configAction) {
        configAction.width = newWidth;
        configAction.height = newHeight;
      }
      this.setState({
        yourSpec:updatedSpec,
        width:newWidth,
        height:newHeight
      })
      // console.log('newWidth,newHeight',newWidth,newHeight)
      this.generateChart(chartdiv, updatedSpec)

      // 在此处执行更新 yourspect 的逻辑，比如将 updatedSpec 传递给父组件或者更新本地状态
      // console.log('Update yourspect:', updatedSpec);
    }
  }

  //this.generateChart(chartdiv, yourSpec)
  }
  
    generateChart = (chartdiv_id, Spec ) => {
      const chart = new NarrativeChart();
      chart.container(chartdiv_id);
      chart.generate(Spec);
      return chart;
    }

    EditableFactTitleInput = (e)=>{
      const {editingFactIndex} = this.props
      this.props.changeFactTitle(e.currentTarget.innerHTML,editingFactIndex)
 
    }

    EditableFactCaptionInput = (e)=>{
      const {editingFactIndex} = this.props
      this.props.changeFactCaption(e.currentTarget.innerHTML,editingFactIndex)

    }

  render() {
    const {editingFactIndex,factList,titleList,captionList} = this.props
    const {  name, IndexStyle, CardStyle, FactStyle, IntroStyle, Bluestyle, NarboxStyle } = this.props //拿到yourSpec对应的内容
    
    const Title=titleList[editingFactIndex] 
    const Intro=captionList[editingFactIndex] 
    const Index=editingFactIndex + 1

    // console.log('Title',Title,Intro,Index)
    // if (type ==='small'){
    //   IndexStyle = index36

    // }
    // else if (type === 'medium'){
    //   IndexStyle = index60
    // }
    return (
      <div className='single-narcomponent' style={CardStyle} >
        <div className='indexbox' style={IndexStyle}>
          <div className='index'> {Index}</div>
        </div>
        <div className='bluebackground'>
          <div className='bluegrnd' style={Bluestyle} ></div>
          <div className='narbox' style={NarboxStyle}>
            <div className='narflexbox' ref={this.narcharRef}>
              <div className="facttypebox" style={FactStyle} ref={this.facttypeRef}>
                <div className="factypeflexbox">
                  <div ></div>
                  <span
                  contentEditable
                  onInput={this.EditableFactTitleInput}
                  dangerouslySetInnerHTML={{ __html: Title || 'Enter the title...' }}
                  ></span>
                  <div ></div>
                </div>
              </div>

              <div className="introbox" style={IntroStyle} ref= {this.introRef}
                contentEditable
                onInput={this.EditableFactCaptionInput}
                dangerouslySetInnerHTML={{ __html: Intro || 'Enter the caption...'  }}
              >
              </div>
              <div className="narchart" id={name} ></div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
  }


// const LeftPlot = () => (
  // <Card style = {{ width: '290px', height: '330px', overflow: 'auto', marginTop: '20px'}}>

  //     <p>
  //       <div style = {{ display: 'flex', }}>
  //         <div>
  //           <img src={Analyst} style={imageStyle} />
  //           <div style = {wordStyle1}>
  //             Analyst
  //           </div>
  //         </div>
  //         <div style = {wordStyle2}>
  //           I've loaded datasets, filtered them for unfunded records, grouped by industry, calculated average survival times, and ranked industries based on these times to analyze failure causes.
  //         </div>
  //       </div>
  //     </p>

  //     <p>
  //       <div style = {{ display: 'flex', }}>
  //         <div>
  //           <img src={Scripter} style={imageStyle} />
  //           <div style = {wordStyle1}>
  //             Scripter
  //           </div>
  //         </div>
  //         <div style = {wordStyle3}>
  //           I've analyzed how plots relate to the theme of startup failures, identifying trends and key factors, and also considered different entities like funding status and causes of failure.
  //         </div>
  //       </div>
  //     </p>

  //     <p>
  //       <div style = {{ display: 'flex', }}>
  //         <div>
  //           <img src={Reviewer} style={imageStyle} />
  //           <div style = {wordStyle1}>
  //             Reviewer
  //           </div>
  //         </div>
  //         <div style = {wordStyle4}>
  //           I've analyzed responses from an LLM agent, focusing on their content, context, and effectiveness. This helps in understanding the agent's capabilities and areas needing improvement.
  //         </div>
  //       </div>
  //     </p>

  //     <p>
  //       <div style = {{ display: 'flex', }}>
  //         <div>
  //           <img src={Editor} style={imageStyle} />
  //           <div style = {wordStyle1}>
  //             Editor
  //           </div>
  //         </div>
  //         <div style = {wordStyle5}>
  //           hahahahahaha
  //         </div>
  //       </div>
  //     </p>

  //   </Card>
// );

// export default LeftPlot;