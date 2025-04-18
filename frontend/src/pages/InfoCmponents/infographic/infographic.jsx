import React from "react";
import { Button } from "antd";
import './infographic.css'
import html2canvas from 'html2canvas';
import NatuSmallComponent from '../../../components/natuSmall/natuSmall';
import HeaderComponent from '../../../components/header/header'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginsight'
import logo_left_up from "../../../pics/infographic1/Vector1.svg"
import logo_left_down from "../../../pics/infographic1/Vector2.svg"
import logo_right_up from "../../../pics/infographic1/Vector3.svg"
import logo_right_down from "../../../pics/infographic1/Vector4.svg"
import logo_center_left from "../../../pics/infographic1/Vector5.svg"
import logo_center_right from "../../../pics/infographic1/Vector6.svg"




const shadow_left_up = {
    position: 'absolute',
    top: '16px',
    left: '0px',
    zIndex: ' 1',
}
const shadow_left_down = {
    position: 'absolute',
    top: '-100px',
    left: '0px',
    zIndex: ' 1',
}
const shadow_right_up = {
    position: 'absolute',
    top: '16px',
    left: '-200px',
    zIndex: ' 1',
}

const shadow_right_down = {
    position: 'absolute',
    top: '-105px',
    left: '-220px',
    zIndex: ' 1',
}

const shadow_center_left = {
    position: 'absolute',
    top: '22px',
    left: '170px',
    zIndex: ' 1',
}

const shadow_center_right = {
    position: 'absolute',
    top: '25px',
    left: '-240px',
    zIndex: ' 1',
}


export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // factList: [yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7],
            // infoTitle: 'Hiking',
            // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
            // captionList: ['The count of gender is 100', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            // titleList: ['Value', 'Rank', 'Proportion', 'Distribution', 'Distribution', 'Distribution', 'Categorization', 'Rank'],
            factList: this.props.factList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            captionList: this.props.captionList,
            titleList: this.props.titleList,
        }
    }

    componentDidMount = () => {
        // const {rightEditPanel} = this.props
        // if (rightEditPanel===true){
        //     this.setState({
        //         factList:this.state.factList.map(() => null)
        //     })
        // }
    }

    captureAndDownloadScreenshot = () => {
        const infographicElement = document.getElementById('infographic');

        // 使用html2canvas截图特定元素
        html2canvas(infographicElement).then(canvas => {
            // 将canvas转换为图片URL
            const screenshotUrl = canvas.toDataURL('image/png');

            // 创建一个下载链接
            const downloadLink = document.createElement('a');
            downloadLink.href = screenshotUrl;
            downloadLink.download = 'infographic.png';

            // 模拟点击下载链接
            downloadLink.click();
        });
    };

    // captureAndDownloadScreenshot = () => {
    //     // 使用html2canvas截图特定元素
    //     html2canvas(document.body).then(canvas => {
    //         // 将canvas转换为图片URL
    //         const screenshotUrl = canvas.toDataURL('image/png');
    //         this.setState((prevState) => ({
    //             captureImages: [...prevState.captureImages, screenshotUrl],
    //         }));
    //         //console.log(screenshotUrl)
    //     });
    // };

    getBottomLayout = () => {
        let length = this.state.factList.length
        const { titleList, captionList } = this.state

        if (length < 7) {
            const factFlex = this.state.factList.slice(4);
            return (
                <div className='bottomcontainer'>
                    {factFlex.map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', height: '450px' }}
                            Title={titleList[index + 4]} Intro={captionList[index + 4]} Index={index + 5} name={'yourSpec_' + String(index + 5)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />))}
                </div>
            )
        }
        else if (length >= 7 && length != 10) {
            const factFlex = this.state.factList.slice(6);
            return (
                <div className='bottomcontainer'>
                    {factFlex.map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact} Title={titleList[index + 6]} Intro={captionList[index + 6]} Index={index + 7} name={'yourSpec_' + String(index + 7)}
                            CardStyle={{ flex: '1', height: '450px' }} IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />
                    ))}
                </div>)
        }
        else {
            const factFlex = this.state.factList.slice(6);
            return (
                <div className='bottomcontainer'>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[0]}
                            CardStyle={{ flex: '1', width: 'auto', height: '220px' }}
                            Title={titleList[6]} Intro={captionList[6]} Index={7} name={'yourSpec_7'}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                        <NatuSmallComponent
                            yourSpec={factFlex[2]}
                            CardStyle={{ flex: '1', width: 'auto', height: '220px' }}
                            Title={titleList[8]} Intro={captionList[8]} Index={9} name={'yourSpec_8'}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <NatuSmallComponent
                            yourSpec={factFlex[1]}
                            CardStyle={{ flex: '1', width: 'auto', height: '220px' }}
                            Title={titleList[7]} Intro={captionList[7]} Index={8} name={'yourSpec_9'}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                        <NatuSmallComponent
                            yourSpec={factFlex[3]}
                            CardStyle={{ flex: '1', width: 'auto', height: '220px' }}
                            Title={titleList[9]} Intro={captionList[9]} Index={10} name={'yourSpec_10'}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle} />
                    </div>

                </div>)
        }
    }

    render() {
        let bottomLatout = this.getBottomLayout()
        const { infoTitle, keyPoint, titleList, captionList, factList } = this.state
        return (
            <div style={this.props.style}>
                {/* <Button onClick={this.captureAndDownloadScreenshot}>Download</Button> */}
                <div className='infographic' id="infographic">
                    <HeaderComponent className='header' infoTitle={infoTitle} keyPoint={keyPoint} />
                    <div className='contentcontainer'>
                        {this.state.factList.length < 7 ?
                            <div className='middlecontainer'>
                                <div className='leftchart'>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent
                                                yourSpec={factList[0]} Title={titleList[0]} Intro={captionList[0]}
                                                Index='1' name='yourSpec_1' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_left_up} style={shadow_left_up} alt="logo" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[2]} Title={titleList[2]} Intro={captionList[2]}
                                                Index='3' name='yourSpec_3' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_left_down} style={shadow_left_down} alt="logo" />
                                    </div>

                                </div>
                                <div className='middle'>
                                    {this.props.imageFileList1.length > 0 && 
                                    <img className='middlepic' src={URL.createObjectURL(this.props.imageFileList1[0].originFileObj)} alt="logo" 
                                    style={{ height: '321px', maxWidth: "479px", objectFit: 'contain' }}
                                    />}
                                    {this.props.imageFileList1.length === 0 && 
                                    <img className='middlepic' src={require("../../../pics/image.jpg")} alt="logo" 
                                    style={{ height: '321px', maxWidth: "479px", objectFit: 'contain' }}
                                    />}
                                </div>
                                <div className='rightchart'>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[1]} Title={titleList[1]} Intro={captionList[1]}
                                                Index='2' name='yourSpec_2' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_right_up} style={shadow_right_up} alt="logo" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[3]} Title={titleList[3]} Intro={captionList[3]}
                                                Index='4' name='yourSpec_4' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_right_down} style={shadow_right_down} alt="logo" />
                                    </div>
                                </div>
                            </div> :
                            <div className='middlecontainer'>
                                <div className='leftchart'>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[0]} Title={titleList[0]} Intro={captionList[0]}
                                                Index='1' name='yourSpec_1' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_left_up} style={shadow_left_up} alt="logo" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[2]} Title={titleList[2]} Intro={captionList[2]}
                                                Index='3' name='yourSpec_3' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_center_left} style={shadow_center_left} alt="logo" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[4]} Title={titleList[4]} Intro={captionList[4]}
                                                Index='5' name='yourSpec_5' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_left_down} style={shadow_left_down} alt="logo" />
                                    </div>

                                </div>
                                <div className='middle'>
                                    {this.props.imageFileList1.length > 0 && 
                                    <img src={URL.createObjectURL(this.props.imageFileList1[0].originFileObj)} alt="logo" 
                                    style={{ height: '135px', maxWidth: "210px", objectFit: 'contain' }}
                                    />}
                                    {this.props.imageFileList1.length === 0 && 
                                    <img  src={require("../../../pics/image.jpg")} alt="logo" 
                                    style={{ height: '135px', maxWidth: "210px", objectFit: 'contain' }}
                                    />}
                                </div>
                                <div className='rightchart'>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[1]} Title={titleList[1]} Intro={captionList[1]}
                                                Index='2' name='yourSpec_2' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_right_up} style={shadow_right_up} alt="logo" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[3]} Title={titleList[3]} Intro={captionList[3]}
                                                Index='4' name='yourSpec_4' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_center_right} style={shadow_center_right} alt="logo" />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'relative', zIndex: '2' }}>
                                            <NatuSmallComponent yourSpec={factList[5]} Title={titleList[5]} Intro={captionList[5]}
                                                Index='6' name='yourSpec_6' CardStyle={Card200200} IndexStyle={index36} />
                                        </div>
                                        <img src={logo_right_down} style={shadow_right_down} alt="logo" />
                                    </div>
                                </div>
                            </div>
                        }
                        {bottomLatout}
                    </div>
                </div>
            </div>
        )
    }
}