import React from "react";
import NarrativeChart from "../../../narrative-chart/src/vis/narrativechart";
import './narchart.css'

export default class SingleNarchart extends React.Component {
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
