import React from "react";
import { Space } from "antd";
import html2canvas from 'html2canvas';
import '../seanimation/animation.css'
import HeaderComponent from '../../../components/seanimationHeader/animationHeader'
//import NarrativeChart from '../../../../narrative-chart/src/vis/narrativechart.js';
import NatuSmallComponent from "../../../components/natuSmall/natuSmall";
import AniCaption from "../../../components/anicaption/anicaption";
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinganimation';


const blueBackgroundOrigin = {
    width: '100%',
    height: '29.5vw',
    flexShrink: '0',
    borderRadius: '0px 2vw 2vw 2vw',
    background: '#3E7AFF',
    // marginTop: '-0.83vw'
}

const CardStyleOrigin = {
    display: '-webkit-flex',
    WebkitFlexDirection: 'column', // 正确的Webkit前缀写法
    display: 'flex',
    //backgroundColor:'#FFFFFF',
    flexDirection: 'column',
    width: '20vw',
    height: '20vw',
    position: 'fixed',
    //border:'0.2vw',  
    //borderStyle:'solid',
}



const animationBox = {
    //margin:'auto',
    position: 'fixed',
    marginLeft: '50vw',
    // marginTop: '2vw'
}

const caption = {
    fontSize: '1vw',
    //textAlign: 'center',
    marginTop: '51vw',
    marginLeft: '27vw',
    lineHeight: 'normal',
    fontStyle: 'normal',
    //marginRight:'auto',
    fontWeight: '400',
    fontFamily: 'AlibabaPuHuiTi',
    color: '#000000',
    opacity: 0, // 初始设置元素不可见
    position: 'absolute', // 设置绝对定位
}
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIdx: 1,
            // infoTitle: 'Hiking',
            // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
            // factList: [yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7],
            // captionList: ['The rank of age_amount','Proportion','Distribution','Distribution','Distribution','Categorization','Rank'],
            mainSpec: {},
            mainChartIndex: this.props.mainChartIndex3,
            factList: this.props.animationFactList,
            captionList: this.props.captionList,
            titleList: this.props.titleList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
        };
    }


    handleFactList = () => {
        const { mainChartIndex } = this.state
        const otherFacts = this.state.factList.map((value, index) => (index !== mainChartIndex) ? value : null);

        const filteredOtherFacts = otherFacts.filter(value => value !== null);
        //console.log('otherFacts',this.props.factList,otherFacts,filteredOtherFacts)
        return filteredOtherFacts

    }

    handleCaptionList = () => {
        const { mainChartIndex } = this.state
        console.log('mainChartIndex', mainChartIndex)
        const otherCaption = this.state.captionList.map((value, index) => (index !== mainChartIndex) ? value : null);

        const filteredOtherCaption = otherCaption.filter(value => value !== null);
        return filteredOtherCaption
    }

    //更新主图
    // componentDidUpdate(prevProps) {
    //     if (prevProps.mainChartIndex !== this.props.mainChartIndex3) {
    //         this.setState({ mainChartIndex: this.props.mainChartIndex3 }, () => {
    //             console.log("update main chart:", this.props.mainChartIndex3)
    //         });
    //     }
    // }


    // 函数用于更新动画属性
    updateAnimationProps = () => {
        this.setState({
            currentIdx: this.state.currentIdx + 1,
        });
    }

    componentDidMount() {
        const filteredOtherCaption = this.handleCaptionList()
        const filteredOtherFacts = this.handleFactList()

        //console.log('this.props.factList',this.props.factList)
        this.setState({
            factList: filteredOtherFacts,
            captionList: filteredOtherCaption
        })
        let i = 1
        const updateFact = setInterval(() => {
            this.updateAnimationProps();
            i++;
            //console.log(i,this.state.factList.length-1)
            if (i === this.state.factList.length) {
                clearInterval(updateFact);
            }
        }, 3000); // 每3秒执行一次
    }

    render() {
        const { mainChartIndex } = this.state
        //console.log('this.state.factList[this.state.currentIdx-1]',this.state.factList[this.state.currentIdx-1])
        // const {mainSpec,currenSpec,currentCaption}=this.state
        // console.log('const {mainSpec,currenSpec,currentCaption}=this.state',mainSpec,currenSpec,currentCaption)

        console.log('animation', this.state.factList, this.props.factList, this.props.factList[this.props.mainChartIndex3], this.props.mainChartIndex3)
        return (
            <div className='seanimation' style={this.props.style}>
                <Space direction="vertical" size="middle">
                    <HeaderComponent infoTitle={this.state.infoTitle} keyPoint={this.state.keyPoint} />
                    <div className='seancontent' style={{ marginTop: '5vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '4vw', paddingRight: '4vw' }}>
                        <NatuSmallComponent yourSpec={this.props.animationFactList[this.props.mainChartIndex3]} name='yourSpec_1' Index='Categorization'
                            CardStyle={{ width: '50vw', height: '40vw' }}
                            Intro={this.props.captionList[this.props.mainChartIndex3]}
                            // Title={this.props.titleList[this.props.mainChartIndex3]}
                            FactStyle={{ display: 'none' }}
                            IntroStyle={{ fontSize: '1.5vw' }}
                            IndexStyle={{ height: '2vw', fontSize: '1.4vw', paddingLeft: '14px', paddingRight: '14px', }}
                            Bluestyle={{ borderRadius: '0px 20px 20px 20px' }} NarboxStyle={{ borderRadius: '0px 20px 20px 20px', background: 'white', top: 'calc(-100% + 8px)' }} />
                        <NatuSmallComponent
                            yourSpec={this.state.factList[this.state.currentIdx - 1]} name='yourSpec_2' Index={this.state.currentIdx}
                            CardStyle={{ width: '38vw', height: '32vw' }} FactStyle={{ display: 'none' }}
                            IndexStyle={{ height: '1.6vw', width: '3.125vw', fontSize: '1.2vw', }}
                            Bluestyle={{ borderRadius: '0px 20px 20px 20px' }} NarboxStyle={{ borderRadius: '0px 20px 20px 20px', background: 'white', top: 'calc(-100% + 8px)' }} />
                    </div>
                    <div>
                        <AniCaption caption={this.state.captionList[this.state.currentIdx - 1]}></AniCaption>
                    </div>
                </Space>
            </div>
        );
    }
}
