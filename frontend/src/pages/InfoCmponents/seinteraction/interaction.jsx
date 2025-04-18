import React from "react";
import jiantou from "../../../pics/jiantou.svg"
import NatuSmallComponent from "../../../components/natuSmall/natuSmall";
import HeaderComponent from '../../../components/seInterHeader/header'
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginter'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';


const Boxstyle = {
    overflowX: 'hidden', overflowY: 'auto', width: '100vw',
    maxWidth: '100%',
    height: '1200px', perspective: '1px', margin: '0px auto',
    backgroundSize: 'cover', // 让背景图自适应填满整个元素
    backgroundPosition: 'center', // 将背景图位置设置为居中
}

const bottom = {
    height: '800px', transform: 'translateZ(0px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: '6vw',
    marginRight: '6vw'
}

const styles = {
    container: {
        marginTop: '5.21vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //justifyContent: 'flex',
        height: 'auto',
        //position: 'relative',
    },
    line: {
        width: '100%',
        height: '1px',
        backgroundColor: '#898989',
        //position: 'absolute',
        bottom: 0,
    },
    box: {
        marginTop: '-0.65vw',
        backgroundColor: '#FFF',
        //padding: '10px 20px',
        borderRadius: '5px',
        paddingLeft: '0.5vw',
        paddingRight: '0.5vw'
    },
    letters: {
        fontSize: '0.833vw',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#5C5C5C',
    },
};



//////
export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            // factList: [yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7],
            // infoTitle: 'Hiking',
            // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
            // captionList: ['The count of gender is 100', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            // titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank']
            factList: this.props.factList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            captionList: this.props.captionList,
            titleList: this.props.titleList,

            //mainChartIndex:this.props.mainChartIndex
            mainChartIndex: this.props.mainChartIndex2
        }
    }
    //更新主图
    componentDidUpdate(prevProps) {
        if (prevProps.mainChartIndex !== this.props.mainChartIndex2) {
            this.setState({ mainChartIndex: this.props.mainChartIndex2 }, () => {
                console.log("update main chart:", this.props.mainChartIndex2)
            });
        }
    }

    handleFactList = () => {
        const { mainChartIndex } = this.state
        const otherFacts = this.state.factList.map((value, index) => (index !== mainChartIndex) ? value : null);

        const filteredOtherFacts = otherFacts.filter(value => value !== null);
        return filteredOtherFacts
    }

    handleCaptionList = () => {
        const { mainChartIndex } = this.state
        const otherCaption = this.state.captionList.map((value, index) => (index !== mainChartIndex) ? value : null);

        const filteredOtherCaption = otherCaption.filter(value => value !== null);
        return filteredOtherCaption
    }

    handleTitleList = () => {
        const { mainChartIndex } = this.state
        const otherTitle = this.state.titleList.map((value, index) => (index !== mainChartIndex) ? value : null);

        const filteredOtherTitle = otherTitle.filter(value => value !== null);
        return filteredOtherTitle
    }

    componentDidMount() {
        const filteredOtherCaption = this.handleCaptionList()
        const filteredOtherTitle = this.handleTitleList()
        this.setState({
            captionList: filteredOtherCaption,
            titleList: filteredOtherTitle
        })

    }

    render() {
        const { mainChartIndex, factList, titleList, captionList, infoTitle, keyPoint } = this.state
        const factFlex = this.handleFactList()
        return (
            <div style={{ fontFamily: 'AlibabaPuHuiTi', ...this.props.style }}>
                <div className='absolutedMainChart' style={{
                    marginLeft: '6vw',
                    zIndex: '1',
                    position: 'absolute',
                    top: '50vw'
                }}>
                    <NatuSmallComponent yourSpec={factList[mainChartIndex]}
                        CardStyle={{ width: '45vw', height: '47vw' }}
                        Title={titleList[0]} Intro={captionList[0]} Index={titleList[0]} name={'yourSpec_'}
                        IndexStyle={{ height: 'auto', fontSize: '20px', padding: '0.2vw 1.5vw' }} FactStyle={{ display: 'none' }} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={{ borderRadius: '0px 20px 20px 20px', background: 'white', top: 'calc(-100% + 8px)' }} />
                </div>
                <HeaderComponent infoTitle={infoTitle} keyPoint={keyPoint} />
                <div className='seinterArrowBox' style={{
                    width: '100vw',
                    height: '20vw',
                    maxWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    // marginBottom: '10vw',
                }}
                    onClick={() => this.containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                    <img src={jiantou} style={{ height: '4.37vw', width: '4.37vw', }} variant="contained"></img>
                </div>

                <div ref={this.containerRef} className="bg-image" style={{ position: "relative", ...Boxstyle }}>

                    <div style={bottom}>
                        {factFlex.map((fact, index) => (
                            <div style={{ marginBottom: '48px' }}>
                                <NatuSmallComponent
                                    key={index} yourSpec={fact}
                                    CardStyle={{ width: '26vw', height: '28vw' }}
                                    Title={this.state.titleList[index]} Intro={this.state.captionList[index]} Index={index + 1} name={'yourSpec_' + String(index)}
                                    IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                />
                            </div>
                        ))}
                        {/* <div style={endBox}>
            <span style={end}>END</span>
        </div> */}
                    </div>
                </div>

                <div className='interEnd' style={styles.container}>
                    <div style={styles.line}></div>
                    <div style={styles.box}>
                        <div style={styles.letters}>END</div>
                    </div>
                </div>
            </div>
        )
    }
}
