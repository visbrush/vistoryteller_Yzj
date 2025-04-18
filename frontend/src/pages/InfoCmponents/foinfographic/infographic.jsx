import React from "react";
import './infographic.css'
import html2canvas from 'html2canvas';
import NatuSmallComponent from '../../../components/natuSmall/natuSmall';
import info4header from '../../../pics/info4header.png'
import info4header_line from '../../.../../../pics/info4header_line.svg'
import info4header_triangle from '../../../pics/info4header_triangle.svg'
import { yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../other/hikinginsight'
import { Card200200, index36, index60, bluestyle, narstyle, factstyle, introstyle } from '../../../constant/narsetting';

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // factList: [yourSpec_0, yourSpec_1, yourSpec_2, yourSpec_3, yourSpec_4, ],
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
        // const {rightEditPanel} = this.props
        // if (rightEditPanel===true){
        //     this.setState({
        //         factList:this.state.factList.map(() => null)
        //     })
        // }
        
    }

    splitFactList=(factList) =>{
        const length = factList.length;
        console.log(length)
        let result = [];
        if (length <= 4) {
        result.push(factList);
        } else {
        let groupSizes = [];
        
        if (length === 10) {
            groupSizes = [3, 3, 2, 2];
        } 
        else if (length % 3 === 0) {
            groupSizes = Array(3).fill(length / 3);
        } 
        else if (length === 8) {
            groupSizes = [3, 2, 3];
        }
        else if (length === 5) {
            groupSizes = [2, 1, 2];
        }
        else {
            
            const smallerGroups = Math.floor(length / 3);
            const largerGroups = length % 3;
            
            groupSizes = Array(3).fill(smallerGroups);
            console.log('other',length,groupSizes)
            for (let i = 0; i < largerGroups; i++) {
            groupSizes[i]++;
            }
        }
    
        let index = 0;
    
        for (const size of groupSizes) {
            result.push(factList.slice(index, index + size));
            index += size;
        }
        }
        console.log(result)
        return result;
    }


    render(){
        const {titleList,captionList}=this.state
        const factMapList=this.splitFactList(this.state.factList)
        const part1length=factMapList[0].length+1
        const part2length=factMapList[1].length+part1length
        const part3length=factMapList[2].length+part2length
        return(
            <div style={this.props.style}>
            <div className='foinfographic'  id="infographic">
                <div className='info4header' style={{height:'10.7%',position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <img
                    src={info4header}
                    alt='info4header pic'
                    width={'91.4%'}
                    height={'94%'}
                ></img>
                <h1 style={{position:'absolute',top:'4%',fontSize:'36px',fontWeight: 700}}>{this.state.infoTitle}</h1>
                <img
                src={info4header_line}
                alt='info4header_line pic'
                width={'86.8%'}
                height={1}
                style={{position:'absolute',top:'52.6%'}}
                ></img>
                <span style={{width:'77.4%',position:'absolute',top:'54.6%',fontSize:'16px',fontWeight: 400}}> {this.state.keyPoint}</span>
            </div>

            {this.state.factList.length<10 ? (
            <div className="info4narcontent" style={{height:'89.3%',display:'flex',flexDirection:'column',paddingTop:'1%'}}>
                    <div style={{height:'33.3%',display:'flex',flexDirection:'row',gap:'10px'}}>
                    {factMapList[0].map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', height: '400px' }}
                            Title={titleList[index]} Intro={captionList[index]}  Index={index+1} name={'yourSpec_' + String(index)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />))}
                    </div>
                    <div style={{height:'33.3%',display:'flex',flexDirection:'row',gap:'10px'}}>
                    {factMapList[1].map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', height: '400px' }}
                            Title={titleList[index+part1length]} Intro={captionList[index+part1length]}  Index={index+part1length} name={'yourSpec_' + String(index+part1length)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />))}
                    </div>
                    <div style={{height:'33.3%',display:'flex',flexDirection:'row',gap:'10px'}}>
                    {factMapList[2].map((fact, index) => (
                        <NatuSmallComponent
                            key={index} yourSpec={fact}
                            CardStyle={{ flex: '1', height: '400px' }}
                            Title={titleList[index+part2length]} Intro={captionList[index+part2length]}  Index={index+part2length} name={'yourSpec_' + String(index+part2length)}
                            IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                        />))}
                    </div>
                </div>)
                : (
                    <div className="narcontent" style={{height:'89.3%',display:'flex',flexDirection:'column',paddingTop:'1%'}}>
                            <div style={{height:'25%',display:'flex',flexDirection:'row',gap:'1%'}}>
                            {factMapList[0].map((fact, index) => (
                                <NatuSmallComponent
                                    key={index} yourSpec={fact}
                                    CardStyle={{ flex: '1', height: '98.56%' }}
                                    Title={titleList[index]} Intro={captionList[index]}  Index={index+1} name={'yourSpec_' + String(index)}
                                    IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                />))}
                            </div>
                            <div style={{height:'25%',display:'flex',flexDirection:'row',gap:'1%'}}>
                            {factMapList[1].map((fact, index) => (
                                <NatuSmallComponent
                                    key={index} yourSpec={fact}
                                    CardStyle={{ flex: '1', height: '98.56%' }}
                                    Title={titleList[index+part1length]} Intro={captionList[index+part1length]}  Index={index+part1length} name={'yourSpec_' + String(index+part1length)}
                                    IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                />))}
                            </div>
                            <div style={{height:'25%',display:'flex',flexDirection:'row',gap:'1%'}}>
                            {factMapList[2].map((fact, index) => (
                                <NatuSmallComponent
                                    key={index} yourSpec={fact}
                                    CardStyle={{ flex: '1', height: '98.56%' }}
                                    Title={titleList[index+part2length]} Intro={captionList[index+part2length]}  Index={index+part2length} name={'yourSpec_' + String(index+part2length)}
                                    IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                />))}
                            </div>
                            <div style={{height:'25%',display:'flex',flexDirection:'row',gap:'1%'}}>
                            {factMapList[3].map((fact, index) => (
                                <NatuSmallComponent
                                    key={index} yourSpec={fact}
                                    CardStyle={{ flex: '1', height: '98.56%' }}
                                    Title={titleList[index+part3length]} Intro={captionList[index+part3length]}  Index={index+part3length} name={'yourSpec_' + String(index+part3length)}
                                    IndexStyle={index60} FactStyle={factstyle} IntroStyle={introstyle} Bluestyle={bluestyle} NarboxStyle={narstyle}
                                />))}
                            </div>
                        </div>)
                }

            </div>
            </div>
        )
    }
}