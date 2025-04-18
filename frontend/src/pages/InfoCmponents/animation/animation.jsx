import React from "react";
import gsap from 'gsap';
import { Space } from "antd";
import HeaderComponent from '../../../components/animationHeader/animationHeader'
//import NarrativeChart from '../../../../narrative-chart/src/vis/narrativechart.js';
import NatuSmallComponent from "../../../components/natuSmall/natuSmall.jsx";
import AniCaption from "../../../components/anicaption/anicaption";
import { animation, animation1, animation2, animation3, animation4 } from '../other/yourspec.js';
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginsight'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting.js';
import { factList } from "../../../selector/edit.js";

const content = {
    width: '100%',
    //height: '51%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: '3vw',
    // marginBottom: '2vw',
    alignItems: 'center'
}
const whole = {
    display: 'flex',
    flexDirection: 'column',
    // width: '100%',
}
const pic = {
    width: '45vw',
    height: '28vw',
    opacity: '30%',
}



export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1,
            // currenFact: animation,
            // currentCaption: 'test1',
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            factList: this.props.animationFactList,
            captionList: this.props.captionList
            // factList: [animation2, animation1, animation2, animation1, animation2],
            // captionList: ['test1', 'test2', 'test1', 'test2', 'test1']
        };
    }


    updateAnimationProps = () => {
        //console.log(this.state.factList[this.state.currentIndex - 1],)
        this.setState({
            currentFact: this.state.factList[this.state.currentIndex - 1],
            currentCaption: this.state.captionList[this.state.currentIndex - 1],
            currentIndex: this.state.currentIndex + 1,
        }, () => {
            console.log("已经改变的 currentSpec:", this.state.currenFact);
        });
    }

    componentDidMount() {
        console.log('animation', this.props)
        setTimeout(() => {
            for (let i = 1; i < this.state.factList.length; i++) {

                setTimeout(() => {
                    this.updateAnimationProps();
                }, i * 3000); // 每次间隔3秒（3000毫秒）
            }
        }, 3000);
    }
    render() {
        //console.log('this.state.factList[this.state.currentIndex-1]',this.state.factList[this.state.currentIndex-1])
        return (
            <div style={{ ...whole, ...this.props.style }}>
                <Space direction="vertical" size="middle">
                    <HeaderComponent infoTitle={this.props.infoTitle} keyPoint={this.props.keyPoint} />
                    <div style={content}>
                        {this.props.imageFileList3.length > 0 && <img style={{ maxWidth: '34.9vw', height: '30vw', objectFit: 'contain' }} src={URL.createObjectURL(this.props.imageFileList3[0].originFileObj)} alt="logo" />}
                        {this.props.imageFileList3.length === 0 && <img style={{ maxWidth: '34.9vw', height: '30vw', objectFit: 'contain' }} src={require("../../../pics/image.jpg")} alt="logo" />}

                        <NatuSmallComponent
                            yourSpec={this.state.factList[this.state.currentIndex - 1]}
                            CardStyle={{ width: '50vw', height: '45vw' }}
                            Index={this.state.currentIndex} name={'yourSpec' + String(this.state.currentIndex)}
                            IndexStyle={{ height: '1.6vw', width: '3.9vw', fontSize: '1.2vw' }}
                            FactStyle={{ display: 'none' }}
                            Bluestyle={{ borderRadius: '0px 20px 20px 20px' }} NarboxStyle={{ borderRadius: '0px 20px 20px 20px', background: 'white' }}
                        />

                    </div >
                    <div >
                        <AniCaption caption={this.state.captionList[this.state.currentIndex - 1]} />
                    </div>
                </Space>


            </div>
        );
    }
}
