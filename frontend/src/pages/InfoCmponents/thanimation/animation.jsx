import React from "react";
import { Space } from "antd";
import gsap from 'gsap';
import HeaderComponent from '../../../components/thanimationHeader/animationHeader'
import NarrativeChart from '../../../narrative-chart/src/vis/narrativechart.js';
import AniCaption from "../../../components/anicaption/anicaption";
import NatuSmallComponent from "../../../components/natuSmall/natuSmall";
import { animation, animation1, animation2, animation3, animation4 } from '../other/yourspec.js';


const content = {
    width: '100%',
    //height: '73vh',
    display: 'flex',
    //justifyContent: 'center',
    flexDirection: 'column',
    //marginTop: '2vw',
}
const whole = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'AlibabaPuHuiTi',
    // height:'100vh',
}

const FiBox = {
    height: '4.55vw',
    //background: '#2149FF14',
    borderRadius: '0.8vw',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    //marginTop: '6vw',
    //marginBottom: '10vw',
    width: '20.04vw', // 设置为auto以自适应宽度
    //border:'0.2vw',  
    //borderStyle:'solid',
    //borderRadius: '1.6vw', 
    backgroundColor: '#FFFFFF',
    boxShadow: ' 4px 4px 12px 5px rgba(180, 180, 180, 0.25)'
}
const Fi = {
    lineHeight: 'normal',
    fontSize: '1.67vw',
    fontWeight: '700',
    color: '#000000',
}
const dashedLineBox = {
    display: 'flex',
    flexDirection: 'column',
    height: '0vw',
    width: '100%'
}
const dashedLine = {
    borderTop: "0.12vw dashed black",
    width: '80vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2.5vw'
}
const boxStyleBox = {
    width: '100%',
    height: '29.98vw',
    //border: '1px solid #c3c3c3',
    marginTop: '-0.43vw',
    display: '-webkit-flex',
    WebkitFlexDirection: 'column',
    display: 'flex',
    flexDirection: 'column'
}
const blueBackgroundOrigin = {
    width: '100%',
    height: '16.8vw',
    flexShrink: '0',
    borderRadius: '0px 2vw 2vw 2vw',
    background: '#3E7AFF',
    marginTop: '-0.83vw'
}
const blueBackground = {
    ...blueBackgroundOrigin
}
const CardStyleOrigin = {
    display: '-webkit-flex',
    WebkitFlexDirection: 'column', // 正确的Webkit前缀写法
    display: 'flex',
    //backgroundColor:'#FFFFFF',
    flexDirection: 'column',
    width: '20vw',
    height: '20vw',
    //position:'fixed',
    //border:'0.2vw',  
    //borderStyle:'solid',
}
const CardStyle = {
    ...CardStyleOrigin, width: '34.90vw', height: '32.65vw', marginLeft: 'auto', marginRight: 'auto'
}
const idxBox = {
    width: '3.125vw',           // 设置框的宽度
    height: '2.08vw',          // 设置框的高度
    //right: '0px',
    //marginTop: '-100px',
    background: '#3E7AFF',
    //position: 'absolute',
    //bottom:'0px',
    //background:'#000000',
    textAlign: 'center',
    borderRadius: '0.42vw 0.42vw 0 0',
    //color: '#0050FF',
    //padding: '0.35vw 0',
    display: 'flex',         // 将父元素设置为Flex容器
    //alignItems: 'center',    // 垂直居中
    //justifyContent: 'center', // 水平居中
}
const idx = {
    //left:'0',
    //right:'0',
    //margin:'auto',
    lineHeight: 'normal',
    paddingTop: '0.26vw',
    marginLeft: 'auto',
    marginRight: 'auto',
    //paddingLeft:'auto',
    //paddingRight:'auto',
    fontSize: '0.83vw',
    color: '#FFF',
    fontFamily: 'Montserrat',
    fontWeight: '700'
}
const boxStyle = {
    borderRadius: '0 2vw 2vw 2vw',
    height: '29.98vw',
    width: '100%',
    //marginLeft:'0px',
    //position: 'relative',
    display: '-webkit-flex',
    WebkitFlexDirection: 'column', // 正确的Webkit前缀写法
    display: 'flex',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.81) 0%, rgba(255, 255, 255, 1) 16%)',
    /* 卡片阴影 */
    boxShadow: '0px 0.6vw 1.6vw 0px rgba(219, 219, 219, 0.25)',
    flexDirection: 'column',
};
const blueBackgroundBox = {
    width: '100%',
    height: '0vw',
    //border: '1px solid #c3c3c3',
    display: '-webkit-flex',
    WebkitFlexDirection: 'column',
    display: 'flex',
    flexDirection: 'column'
}
const caption = {
    fontSize: '1vw',
    //textAlign: 'center',
    marginTop: '50vw',
    marginLeft: '27vw',
    lineHeight: 'normal',
    fontStyle: 'normal',
    //marginRight:'auto',
    fontWeight: '400',
    fontFamily: 'AlibabaPuHuiTi',
    color: '#000000',
    opacity: 0, // 初始设置元素不可见
    position: 'absolute', // 设置绝对定位
    //left: 0, // 水平位置
    //top: 0, // 垂直位置
}



export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNums: 1,
            secondNums: 2,
            thirdNums: 3,
            forthNums: 2,
            currentIndex: 1,
            currentSpec: animation1,
            currentCaption: 'test1',
            currentPart: 'Part1',
            // factList: [animation2, animation1, animation2, animation1, animation2],
            // captionList: ['test1', 'test2', 'test1', 'test2', 'test1'],

            factList: this.props.animationFactList,
            captionList: this.props.captionList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,

        };
    }

    // 函数用于更新动画属性
    updateAnimationProps = () => {
        console.log('this.state.currentIndex', this.state.currentIndex)
        const { firstNums, secondNums, thirdNums, forthNums } = this.state
        this.setState((prevState) => {
            let newCurrentPart = prevState.currentPart;
            if (prevState.currentIndex === firstNums + secondNums) {
                newCurrentPart = 'Part2';
            } else if (prevState.currentIndex === firstNums + secondNums + thirdNums) {
                newCurrentPart = 'Part3';
            } else if (prevState.currentIndex === firstNums + secondNums + thirdNums + forthNums) {
                newCurrentPart = 'Part4';
            }

            return {
                currentPart: newCurrentPart,
                currentSpec: prevState.factList[prevState.currentIndex - 1],
                currentCaption: prevState.captionList[prevState.currentIndex - 1],
                currentIndex: prevState.currentIndex + 1,
            };
        });
    }


    componentDidMount() {
        console.log(this.state.factList)
        let i = 1
        const updateFact = setInterval(() => {
            this.updateAnimationProps();
            i++;
            console.log(i, this.state.factList.length - 1)
            if (i === this.state.factList.length) {
                clearInterval(updateFact);
            }
        }, 3000); // 每3秒执行一次
    }

    render() {
        const { factList, currentIndex, titleIdx, infoTitle, keyPoint } = this.state;
        return (
            <div style={{ ...whole, ...this.props.style }}>
                <Space direction="vertical" size="middle">
                    <HeaderComponent infoTitle={infoTitle} keyPoint={keyPoint} />
                    <div style={content}>

                        <div style={dashedLineBox}>
                            <div style={dashedLine}></div>
                        </div>
                        <Space direction="vertical" size="middle">
                            <div style={FiBox}>
                                <span style={Fi}>
                                    {this.state.currentPart}
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5vw' }}>
                                <NatuSmallComponent
                                    yourSpec={this.state.factList[this.state.currentIndex - 1]} name='yourSpec' Index={this.state.currentIndex}
                                    CardStyle={{ width: '55vw', height: '75vh' }}
                                    IndexStyle={{ height: '1.6vw', width: '3.125vw', fontSize: '1.2vw', }}
                                    FactStyle={{ display: 'none' }} IntroStyle={{ display: 'none' }}
                                    Bluestyle={{ borderRadius: '0px 20px 20px 20px' }} NarboxStyle={{ borderRadius: '0px 20px 20px 20px', background: 'white', top: 'calc(-100% + 8px)' }} />

                            </div>
                            <div >
                                <AniCaption caption={this.state.captionList[this.state.currentIndex - 1]} />
                            </div>
                        </Space>
                    </div>
                </Space>
            </div>
        );
    }
}
