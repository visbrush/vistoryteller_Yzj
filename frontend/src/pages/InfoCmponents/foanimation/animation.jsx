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
    // height: '73vh',
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

const blueBackgroundOrigin = {
    width: '100%',
    height: '16.8vw',
    flexShrink: '0',
    borderRadius: '0px 2vw 2vw 2vw',
    background: '#3E7AFF',
    marginTop: '-0.83vw'
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
            factList: [animation2, animation1, animation2, animation1, animation2],
            captionList: ['test1', 'test2', 'test1', 'test2', 'test1'],

            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            factList: this.props.animationFactList,
            captionList: this.props.captionList

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
        const { factList, currentIndex, titleIdx } = this.state;
        console.log('caption test', this.state.currentSpec)
        return (
            <div style={{ ...whole, ...this.props.style }}>
                <Space direction="vertical" size="middle">
                    <HeaderComponent infoTitle={this.state.infoTitle} keyPoint={this.state.keyPoint} />
                    <div style={content}>
                        {/* <div style={dashedLineBox}>
                        <div style={dashedLine}></div>
                    </div>
                    <div style={FiBox}>
                        <span style={Fi}>
                            {this.state.currentPart}
                        </span>
                    </div> */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3vh', marginBottom: '3vh' }}>
                            <NatuSmallComponent
                                yourSpec={this.state.factList[this.state.currentIndex - 1]} name='yourSpec' Index={this.state.currentIndex}
                                CardStyle={{ width: '64vw', height: '86vh' }}
                                IndexStyle={{ height: '1.6vw', width: '3.125vw', fontSize: '1.2vw', }}
                                FactStyle={{ display: 'none' }} IntroStyle={{ display: 'none' }}
                                Bluestyle={{ borderRadius: '0px 20px 20px 20px' }} NarboxStyle={{ borderRadius: '0px 20px 20px 20px', background: 'white', top: 'calc(-100% + 8px)' }} />

                        </div>
                        <div >
                            <AniCaption caption={this.state.captionList[this.state.currentIndex - 1]} />
                        </div>
                    </div>
                </Space>
            </div>
        );
    }
}
