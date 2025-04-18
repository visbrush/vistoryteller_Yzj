// csv文件预览界面
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Space, Input, Menu, Table, Pagination, message, Button, Spin } from 'antd';
import SequenceNarChart from "../EditComponents/SequenceNarchart/sequence";
import NarrativeChart from "../../narrative-chart/src/vis/narrativechart";
import storyoutlineIcon from '../../assets/pagePics/storyOutlineIcon.png'
import previewStoryOutlineIcon from '../../assets/pagePics/previewStoryoutlineIcon.svg'

const { Content } = Layout;
const StoryoutlineCard = (props) => {
    const [targetquestion, setTargetQuestion] = useState('');
    const [clickedIndex, setClickedIndex] = useState(null);
    const [plotIndex, setPlotIndex] = useState(null)
    const [relatedDfs, setRelatedDfs] = useState(null)

    const uniqueQuestions = Array.from(new Set(props.questionList));

    // 点击事件处理函数，设置targetquestion为当前点击的question
    const handleClick = (question, index) => {
        const count = props.questionList.filter(item => item === question).length;

        setTargetQuestion(question);
        setClickedIndex(index);
        setPlotIndex(props.questionList.findIndex(item => item === question))
        setRelatedDfs(count)
    };

    //useEffect
    useEffect(() => {
        // initData(csvFileList.length > 0 ? csvFileList[0] : '');
    }, []);

    return (


        <div style={{ display: 'flex', flexDirection: 'row', ...props.style }} id='infographic'>
            <div style={{ height: '320px', width: '280px', overflowY: 'scroll' }}>
                {uniqueQuestions.map((question, index) => (
                    <div style={{ position: 'relative', height: '78px', width: '263px', marginBottom: '12px', borderRadius: '4px', border: '1.4px solid rgb(228, 228, 228)', borderLeft: clickedIndex === index ? '2.4px solid black' : '1.4px solid rgb(228, 228, 228)', }}
                        onClick={() => handleClick(question, index)}>
                        {index !== clickedIndex ? (
                        <div style={{
                            width: '86px', borderRadius: '0px 4px 4px 0px', padding: '1px 8px',border: '1.4px solid rgb(228, 228, 228)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background:'white', color:'#585858',
                            fontSize: '14px',
                            fontWeight: 500
                        }}>
                            <img
                                src={previewStoryOutlineIcon}
                                width='14px'
                                height='14px'
                            />
                            <div>{'Plot'}</div>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '3px',
                                border: '1.4px solid rgb(228, 228, 228)',
                                lineHeight: '15.5px',
                                textAlign: 'center',
                            }}>{(index + 1)}</div>
                        </div>
                    ) : (
                        <div style={{
                            width: '86px', borderRadius: '0px 4px 4px 0px', padding: '1px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'black', color:'white',
                            fontSize: '14px',
                            fontWeight: 500
                        }}>
                            <img
                                src={storyoutlineIcon}
                                width='14px'
                                height='14px'
                            />
                            <div>{'Plot'}</div>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '3px',
                                border: '1px solid #FFF',
                                background: '#898B8F',
                                lineHeight: '15.5px',
                                textAlign: 'center',
                            }}>{(index+ 1)}</div>
                        </div>
                    )}


                        <div style={{ padding: '8px', fontSize: '12px', fontWeight: 400 }}>
                            {question}
                        </div>
                        {/* {index === clickedIndex && (
                            <div style={{ position: 'absolute', bottom: '6px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#898B8F', fontWeight: 400, fontSize: '12px', marginLeft: '8px' }}>
                                {relatedDfs + ' DataFacts related'}
                            </div>
                        )} */}
                    </div>
                ))}
            </div>
            <div style={{ width: 'auto', overflowX: 'auto', display: 'flex', flexDirection: 'row' }}>
                {props.factList.map((fact, index) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '18px' }}>
                            {props.questionList[index] === targetquestion && (
                                <div style={{ width: '33px', height: '18px', backgroundColor: 'black', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', display: 'flex', flexDirection: 'row', color: "white", justifyContent: 'center', alignItems: 'center' }}>
                                    <img
                                        src={storyoutlineIcon}
                                        width='14px'
                                        height='14px'
                                    >
                                    </img>
                                    <div style={{ width: '2px' }}></div>
                                    {plotIndex + 1}
                                </div>
                            )}
                        </div>
                        <SequenceNarChart
                            index={index + 1}
                            yourSpec={fact}
                            Caption={props.captionList[index]}
                            Title={props.titleList[index]}
                            className={
                                'notedit-notoutline' // 默认边框样式
                            }
                            question={false}
                            circleIndex={''}
                            operateState={''}
                            isPreview={true}
                            factType={props.originFactList[index]['type']}
                        />
                        {/* <div style={{ width: '10px' }}></div> */}
                    </div>

                ))}
            </div>
        </div>

    );
};

export default StoryoutlineCard;
