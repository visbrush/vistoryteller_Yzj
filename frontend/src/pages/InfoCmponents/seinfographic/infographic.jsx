import React from "react";
import './infographic.css'
import NatuSmallComponent from '../../../components/natuSmall/natuSmall';
import html2canvas from 'html2canvas';
import { Card920767, Card980362, Card485362, Card320362, Card320176 } from "../../../constant/narsetting";
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginfo2'


export default class Info extends React.Component {
    constructor(props) {
        super(props);
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
            mainChartIndex: this.props.mainChartIndex1
            //mainChartIndex: this.props.mainChartIndex
        }
    }
    componentDidMount = () => {
    }

    //更新主图
    componentDidUpdate(prevProps) {
        if (prevProps.mainChartIndex !== this.props.mainChartIndex1) {
            this.setState({ mainChartIndex: this.props.mainChartIndex1 }, () => {
                console.log("update main chart:", this.props.mainChartIndex1)
            });
        }
    }

    // captureAndDownloadScreenshot = () => {
    //     const infographicElement = document.getElementById('infographic');
    //     // 使用html2canvas截图特定元素
    //     html2canvas(infographicElement).then(canvas => {
    //         // 将canvas转换为图片URL
    //         const screenshotUrl = canvas.toDataURL('image/png');
    //         // 创建一个下载链接
    //         const downloadLink = document.createElement('a');
    //         downloadLink.href = screenshotUrl;
    //         downloadLink.download = 'infographic.png';
    //         // 模拟点击下载链接
    //         downloadLink.click();
    //     });
    // };


    getFlexLayout = (factFlex, LastCaptions, LastTitles) => {
        let len = factFlex.length
        if (len < 4) {
            return (
                <div className='sebottom'>
                    {factFlex.map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', height: '362px' }}
                            Title={LastTitles[index]} Intro={LastCaptions[index]} Index={index + 4} name={'yourSpec_' + String(index + 4)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />))}
                </div>
            )
        }
        else if (len === 4) {
            return (
                <div className='sebottom'>
                    <NatuSmallComponent
                        yourSpec={factFlex[0]}
                        CardStyle={{ flex: '1', height: '362px' }}
                        Title={LastTitles[0]} Intro={LastCaptions[0]} Index={4} name={'yourSpec_4'}
                        IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                    />
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[1]}
                            CardStyle={{ width: '320px', height: '166px', marginBottom: '12px' }}
                            Title={LastTitles[1]} Intro={LastCaptions[1]} Index={5} name={'yourSpec_5'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                        <NatuSmallComponent
                            yourSpec={factFlex[2]}
                            CardStyle={{ width: '320px', height: '166px' }}
                            Title={LastTitles[2]} Intro={LastCaptions[2]} Index={6} name={'yourSpec_6'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                    <NatuSmallComponent
                        yourSpec={factFlex[3]}
                        CardStyle={{ flex: '1', height: '362px' }}
                        Title={LastTitles[3]} Intro={LastCaptions[3]} Index={7} name={'yourSpec_7'}
                        IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                    />
                </div>
            );
        } else if (len === 5) {
            return (
                <div className='sebottom'>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[0]}
                            CardStyle={{ width: '320px', height: '166px', marginBottom: '12px' }}
                            Title={LastTitles[0]} Intro={LastCaptions[0]} Index={4} name={'yourSpec_5'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                        <NatuSmallComponent
                            yourSpec={factFlex[1]}
                            CardStyle={{ width: '320px', height: '166px' }}
                            Title={LastTitles[1]} Intro={LastCaptions[1]} Index={5} name={'yourSpec_6'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                    <NatuSmallComponent
                        yourSpec={factFlex[2]}
                        CardStyle={{ flex: '1', height: '362px' }}
                        Title={LastTitles[2]} Intro={LastCaptions[2]} Index={6} name={'yourSpec_7'}
                        IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                    />
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[3]}
                            CardStyle={{ width: '320px', height: '166px', marginBottom: '12px' }}
                            Title={LastTitles[3]} Intro={LastCaptions[3]} Index={7} name={'yourSpec_8'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                        <NatuSmallComponent
                            yourSpec={factFlex[4]}
                            CardStyle={{ width: '320px', height: '166px' }}
                            Title={LastTitles[4]} Intro={LastCaptions[4]} Index={8} name={'yourSpec_9'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className='sebottom'>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[0]}
                            CardStyle={{ width: '320px', height: '166px', marginBottom: '12px' }}
                            Title={LastTitles[0]} Intro={LastCaptions[0]} Index={4} name={'yourSpec_5'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                        <NatuSmallComponent
                            yourSpec={factFlex[3]}
                            CardStyle={{ width: '320px', height: '166px' }}
                            Title={LastTitles[3]} Intro={LastCaptions[3]} Index={7} name={'yourSpec_6'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[1]}
                            CardStyle={{ width: '320px', height: '166px', marginBottom: '12px' }}
                            Title={LastTitles[1]} Intro={LastCaptions[1]} Index={5} name={'yourSpec_7'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                        <NatuSmallComponent
                            yourSpec={factFlex[4]}
                            CardStyle={{ width: '320px', height: '166px' }}
                            Title={LastTitles[4]} Intro={LastCaptions[4]} Index={8} name={'yourSpec_8'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[2]}
                            CardStyle={{ width: '320px', height: '166px', marginBottom: '12px' }}
                            Title={LastTitles[2]} Intro={LastCaptions[2]} Index={6} name={'yourSpec_9'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                        <NatuSmallComponent
                            yourSpec={factFlex[5]}
                            CardStyle={{ width: '320px', height: '166px' }}
                            Title={LastTitles[5]} Intro={LastCaptions[5]} Index={9} name={'yourSpec_10'}
                            IndexStyle={index60} FactStyle={{ fontSize: '12px' }} IntroStyle={{ fontSize: '12px' }} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                </div>
            );
        }
    }

    handleFactList = () => {
        const { mainChartIndex } = this.state
        const lowerValues = this.state.factList.map((value, index) => (index < mainChartIndex) ? value : null);
        const higherValues = this.state.factList.map((value, index) => (index > mainChartIndex) ? value : null);

        const mergedList = lowerValues.concat(higherValues);
        const filteredMergedList = mergedList.filter(value => value !== null);
        const firstThreeFacts = filteredMergedList.slice(0, 3);
        const LastFacts = filteredMergedList.slice(3);
        return { firstThreeFacts, LastFacts }
    }

    handleCaptionList = () => {
        const { mainChartIndex } = this.state
        const lowerValues = this.state.captionList.map((value, index) => (index < mainChartIndex) ? value : null);
        const higherValues = this.state.captionList.map((value, index) => (index > mainChartIndex) ? value : null);

        const mergedList = lowerValues.concat(higherValues);
        const filteredMergedList = mergedList.filter(value => value !== null);
        const firstThreeCaptions = filteredMergedList.slice(0, 3);
        const LastCaptions = filteredMergedList.slice(3);
        return { firstThreeCaptions, LastCaptions }
    }

    handleTitleList = () => {
        const { mainChartIndex } = this.state
        const lowerValues = this.state.titleList.map((value, index) => (index < mainChartIndex) ? value : null);
        const higherValues = this.state.titleList.map((value, index) => (index > mainChartIndex) ? value : null);

        const mergedList = lowerValues.concat(higherValues);
        const filteredMergedList = mergedList.filter(value => value !== null);
        const firstThreeTitles = filteredMergedList.slice(0, 3);
        const LastTitles = filteredMergedList.slice(3);
        return { firstThreeTitles, LastTitles }
    }

    render() {
        const { mainChartIndex } = this.state
        const { firstThreeFacts, LastFacts } = this.handleFactList();
        const { firstThreeCaptions, LastCaptions } = this.handleCaptionList()
        const { firstThreeTitles, LastTitles } = this.handleTitleList()
        // const factFlex = this.state.factList.slice(4);
        let layout = this.getFlexLayout(LastFacts, LastCaptions, LastTitles)
        return (
            <div style={this.props.style}>
                {/* <button style={button} onClick={this.captureAndDownloadScreenshot}>下载信息图</button> */}
                <div className="seinfographic" id="infographic">
                    <div className="seheader">
                        <div className="seheaderbox">
                            <div className="seheaderboxtitle">
                                <div className='seheadertop'></div>
                                <div className='seheadertitle'>{this.state.infoTitle}</div>
                                <div className='seheaderintro'>
                                    <span >
                                        {this.state.keyPoint}
                                    </span>
                                </div>
                            </div>
                            <div className="seheaderdivider"></div>
                        </div>
                        <div className="seheadernar">
                            <NatuSmallComponent
                                yourSpec={firstThreeFacts[0]} Title={firstThreeTitles[0]}
                                Intro={firstThreeCaptions[0]}
                                Index='1' name='yourSpec_0'
                                IndexStyle={index36}
                            />
                            <NatuSmallComponent
                                yourSpec={firstThreeFacts[1]} Title={firstThreeTitles[1]}
                                Intro={firstThreeCaptions[1]}
                                Index='2' name='yourSpec_1'
                                IndexStyle={index36}
                            />
                            <NatuSmallComponent
                                yourSpec={firstThreeFacts[2]} Title={firstThreeTitles[2]}
                                Intro={firstThreeCaptions[2]}
                                Index='3' name='yourSpec_2'
                                IndexStyle={index36}
                            />
                        </div>

                    </div>

                    <div className="semiddle">
                        <NatuSmallComponent
                            yourSpec={this.state.factList[mainChartIndex]}
                            Intro={this.state.captionList[mainChartIndex]}
                            Index={this.state.titleList[mainChartIndex]} name='youspec_1'
                            IndexStyle={{ height: '40px', fontSize: '20px', paddingLeft: '14px', paddingRight: '14px' }}
                            FactStyle={{ display: 'none' }}
                            CardStyle={Card920767} IntroStyle={{ fontSize: '14px', marginBottom: '48px' }}
                            Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    </div>
                    {layout}
                </div>
            </div>
        )
    }
}