import React from "react";
import NatuSmallComponent from '../../../components/natuSmall/natuSmall';
import './infographic.css'
import { Card980308,Card485308,Card237308,Card320308 } from "../../../constant/narsetting";
import { Card200200,index36,index60,bluestyle,narstyle,factstyle,introstyle } from '../../../constant/narsetting';
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7, yourSpec_8, yourSpec_9 } from '../other/hikinginsight'
import html2canvas from 'html2canvas';
import HeaderComponent from '../../../components/thheader/header'

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNums:1,
            secondNums:4,
            thirdNums:3,
            forthNums:2,
            // factList: [yourSpec_0, yourSpec_1, yourSpec_0, yourSpec_0, yourSpec_0, yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4,],
            // infoTitle: 'Hiking',
            // keyPoint: 'What are the characteristics of people who enjoy hiking? and where do they go most often?',
            // captionList: ['The count of gender is 100','Rank','Proportion','Distribution','Distribution','Distribution','Categorization','Rank'],
            // titleList: ['Value','Rank','Proportion','Distribution','Distribution','Distribution','Categorization','Rank'],
            factList: this.props.factList,
            infoTitle: this.props.infoTitle,
            keyPoint: this.props.keyPoint,
            captionList: this.props.captionList,
            titleList: this.props.titleList
        }
    }

    componentDidMount=()=>{
        let partNums=[]
        if (this.props.factList.length === 5){
            partNums=[1,2,1,1]
        }
        else if (this.props.factList.length === 6){
            partNums=[1,2,1,2]
        }
        else if (this.props.factList.length === 7){
            partNums=[2,2,1,2]
        }
        else if (this.props.factList.length ===8){
            partNums=[2,3,1,2]
        }
        else if (this.props.factList.length === 9){
            partNums=[2,3,1,3]
        }
        else if (this.props.factList.length ===10){
            partNums=[2,3,2,3]
        }
        this.setState({
            firstNums:partNums[0],
            secondNums:partNums[1],
            thirdNums:partNums[2],
            forthNums:partNums[3],
        })
    }

    splitFactList=(factList) =>{
        const {firstNums,secondNums,thirdNums,forthNums}=this.state
        let groupSizes = [firstNums,secondNums,thirdNums,forthNums]
        let index = 0;
        let result = [];
        for (const size of groupSizes) {
            result.push(factList.slice(index, index + size));
            index += size;
        }
        console.log(result)
        return result;
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
    render() {
        const {titleList,captionList}=this.state
        const factMapList=this.splitFactList(this.state.factList)
        const part1length=factMapList[0].length
        const part2length=factMapList[1].length+part1length
        const part3length=factMapList[2].length+part2length
        const part4length=factMapList[3].length+part3length
        return (
            <div style={this.props.style}>
                <div id="infographic">
                    <HeaderComponent infoTitle={this.props.infoTitle} keyPoint={this.props.keyPoint}/>
                    <div className='thinfographic'>

                        <div className='thfirst'>
                        {factMapList[0].map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index]} Intro={captionList[index]}  Index={index+1} name={'yourSpec_' + String(index)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />))}
                        </div>
                        <div className='thsecond'>
                        {factMapList[1].map((fact, index) => (
                            factMapList.length>=4 ?(
                            <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index+part1length]} Intro={captionList[index+part1length]}  Index={index+1} name={'yourSpec_' + String(index+part1length)}
                            IndexStyle={index60}  Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />)
                        :(<NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index+part1length]} Intro={captionList[index+part1length]}  Index={index+1} name={'yourSpec_' + String(index+part1length)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />)))}
                        </div>
                        <div className='ththird' >
                        {factMapList[2].map((fact, index) => (
                            factMapList.length>=4 ?(
                            <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index+part2length]} Intro={captionList[index+part2length]}  Index={index+1} name={'yourSpec_' + String(index+part2length)}
                            IndexStyle={index60} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />)
                        :(<NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index+part2length]} Intro={captionList[index+part2length]}  Index={index+1} name={'yourSpec_' + String(index+part2length)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />)))}
                        </div>
                        <div className='thforth' >
                        {factMapList[3].map((fact, index) => (
                            factMapList.length>=4 ?(
                            <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index+part3length]} Intro={captionList[index+part3length]}  Index={index+1} name={'yourSpec_' + String(index+part3length)}
                            IndexStyle={index60}  Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />)
                        :(<NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', width:'auto',height: '308px' }}
                            Title={titleList[index+part3length]} Intro={captionList[index+part3length]}  Index={index+1} name={'yourSpec_' + String(index+part3length)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />)))}
                        </div>
                        <div className='arrowbox'></div>
                    </div>

                </div>
                {/* <button style={button} onClick={this.captureAndDownloadScreenshot}>下载信息图</button> */}
            </div>
        )
    }
}