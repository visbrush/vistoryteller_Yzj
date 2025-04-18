import React from "react";
import NarrativeChart from '../../narrative-chart/src/vis/narrativechart.js'
import './natuSmall.css'

const blugrnd = {
  borderRadius: '0px 16px 20px 20px'
}
const narbox = {
  borderRadius: '0px 16px 16px 16px'
}

const index36 = {
  width: '36px'
}
const index60 = {
  width: '60px'
}
const bluestyle = {
  borderRadius: '0px 20px 20px 20px'
}
const narstyle = {
  borderRadius: '0px 20px 20px 20px'
}
const factstyle = {
  fontSize: '16px',
  height: '30px'
}
const introstyle = {
  fontSize: '14px'
}

export default class NatuSmallComponent extends React.Component {
  constructor(props) {
    super(props);
    this.narcharRef = React.createRef();
    this.facttypeRef = React.createRef();
    this.introRef = React.createRef()
    this.state = {
      yourSpec: this.props.yourSpec,
      width: 100,
      height: 100
    }
  }


  componentDidMount() {
    // const { name, yourSpec } = this.props
    // const chartdiv = '#' + name
    // this.generateChart(chartdiv, yourSpec)
    if (this.state.yourSpec!==null){
      console.log('natusmall',this.state.yourSpec)
      const narcharElement = this.narcharRef.current;
      // 创建 ResizeObserver 实例
      this.updateYouspecWH()
  
      this.resizeObserver = new ResizeObserver(this.updateYouspecWH);
      // 如果 narcharElement 存在，则开始观察尺寸变化
      if (narcharElement) {
        this.resizeObserver.observe(narcharElement);
      }
    }
   
  }

  componentWillUnmount() {
    // 在组件卸载时断开 ResizeObserver 的监听
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //使用 prevProps 和 prevState 来检测属性和状态的变化
    const { width, height } = this.state
    const { name } = this.props

    if (this.props.yourSpec !== prevProps.yourSpec&&this.props.yourSpec !==null) {
      // 属性 someProp 发生了变化，执行相应操作

      //装修改后的宽高
      let updatedSpec = { ...this.props.yourSpec };
      const updateConfigAction = updatedSpec.actions.find(action => action.add === 'config');
      //上层传过来的
      const yourspeConfigAction = this.props.yourSpec.actions.find(action => action.add === 'config');
      //先判断是否存在宽高字段，如果上层传过来的宽高!=this.state.width，则修改，装在updatedSpec里
      if (updateConfigAction && yourspeConfigAction) {
        if (yourspeConfigAction.width != width || yourspeConfigAction.height != height) {
          updateConfigAction.width = width;
          updateConfigAction.height = height;
        }
      }
      this.setState({
        yourSpec: updatedSpec
      })

      const chartdiv = '#' + name
      this.generateChart(chartdiv, updatedSpec)
    }
  }

  updateYouspecWH = () => {
    const { yourSpec } = this.state
    const { name } = this.props
    

    //获取facttype和intro的高度
    const facttypeElement = this.facttypeRef.current
    const introElement = this.introRef.current
    let facttypeElementHeight = 0
    let introElementHeight = 0
    if (facttypeElement) {
      facttypeElementHeight = facttypeElement.clientHeight
    }
    if (introElement) {
      introElementHeight = introElement.clientHeight
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
    console.log(narchartElement)
    const yourspeConfigAction = yourSpec.actions.find(action => action.add === 'config');
    if (yourspeConfigAction) {
      console.log('currentWidth,currentHeight',currentWidth,currentHeight)
      if (Math.abs(currentWidth - yourspeConfigAction.width) > 10 || Math.abs(currentHeight - yourspeConfigAction.height) > 10) {
        console.log('重置 yourspec 的宽高配置')
        // 重置 yourspec 的宽高配置
        // 假设 yourSpec 是不可变对象，使用 spread 运算符创建新的对象
        let newWidth, newHeight;
        if (currentWidth / currentHeight < 1.3) {
          newWidth = currentWidth
          newHeight = currentHeight - facttypeElementHeight - introElementHeight-10
        }
        else {
          newWidth = currentHeight
          newHeight = currentHeight - facttypeElementHeight - introElementHeight-10
        }
        let updatedSpec = { ...yourSpec };
        const configAction = updatedSpec.actions.find(action => action.add === 'config');
        if (configAction) {
          configAction.width = newWidth;
          configAction.height = newHeight;
        }
        //检查是否有两个caption字段
        updatedSpec = this.modifyCaptionTopPadding(updatedSpec,newWidth,newHeight)

        this.setState({
          yourSpec: updatedSpec,
          width: newWidth,
          height: newHeight
        })
        //console.log('newWidth,newHeight', updatedSpec, newWidth, newHeight)
        
        


        const chartdiv = '#' + name
        this.generateChart(chartdiv, updatedSpec)

        // 在此处执行更新 yourspect 的逻辑，比如将 updatedSpec 传递给父组件或者更新本地状态
        //console.log('Update yourspect:', updatedSpec);
      }
    }
  }


  modifyCaptionTopPadding=(spec, newWidth, newHeight)=> {
    if (!spec || !spec.actions || !Array.isArray(spec.actions)) {
        // 无效的规范
        return spec;
    }

    const captionActions = spec.actions.filter(action => action.add === "caption");
    // 如果存在两个 caption，并且 newWidth 和 newHeight 的其中一个大于 350
    if (captionActions.length === 2 && (newWidth > 350 || newHeight > 350)) {
        // 修改第二个 caption 的 toppadding
        captionActions[1].style = captionActions[1].style || {};
        captionActions[1].style["top-padding"] = Math.min(250, newHeight);
    } else {
        // 其他情况下保持不变
        return spec;
    }

    return spec;
}


  generateChart = (chartdiv_id, Spec) => {
    const chart = new NarrativeChart();
    chart.container(chartdiv_id);
    chart.generate(Spec);
    return chart;
  }

  render() {
    const { Title, Intro, Index, name, IndexStyle, CardStyle, FactStyle, IntroStyle, Bluestyle, NarboxStyle } = this.props //拿到yourSpec对应的内容
    // if (type ==='small'){
    //   IndexStyle = index36

    // }
    // else if (type === 'medium'){
    //   IndexStyle = index60
    // }
    return (
      <div className='narcomponent' style={CardStyle} >
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
                  <span>{Title}</span>
                  <div ></div>
                </div>
              </div>

              <div className="introbox" style={IntroStyle} ref={this.introRef}>
                <span>{Intro}</span>
              </div>
              <div className="narchart" id={name} ></div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}