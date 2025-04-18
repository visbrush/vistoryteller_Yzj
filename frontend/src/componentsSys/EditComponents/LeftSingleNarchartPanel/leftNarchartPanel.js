import React, { useRef, useState, createRef, useEffect } from 'react';
import { Layout, Divider, Button, Space, Input, ConfigProvider } from "antd"
import storyoutlineIcon from '../../../assets/pagePics/storyOutlineIcon.png'

const LeftPanel = (props) => {
    const [outline, setOutline] = useState('');
    const [factType, setFactType] = useState('')

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        const { editingFactIndex, questionList, titleList,originFactList } = props
        const capitalizeFactType=capitalizeFirstLetter(originFactList[editingFactIndex]['type']) 
        setFactType(capitalizeFactType)
        const uniqueQuestions = [...new Set(questionList)]; // 获取不同的 questions
        const index = uniqueQuestions.indexOf(questionList[editingFactIndex]);
        setOutline(index + 1)

        console.log('props.questionList',props.questionList[props.editingFactIndex])
    }, [props.editingFactIndex,props.originFactList]);

    const wrappingStyle = {
        height:'100px',
        border: '1px solid #F1F1F1',
        borderRadius: '2px',
        boxShadow: ' 0px 6px 16px 0px rgba(219, 219, 219, 0.25)',
        backgroundColor: 'white',
        padding: '14px',
        fontFamily: 'PingFang SC',
        fontStyle: 'normal',
        fontWeight: '500'
    }
    const outlineInfoStyle = {
        width: '84px',
        borderRadius: '4px',
        background: '#101010',
        color: 'white',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: '450',

    }
    const factTypeStyle = {
        width: 'fit-content',
        padding: '0px 5px',
        fontSize: '12px',
        color: '#585858',
        borderRadius: '4px',
        border: '1px solid var(--text-text-icon-03, #DCDEE1)',
        background: '#F8F9FA'
    }
   
    return (
        <div style={wrappingStyle}>
            <Space direction="vertical" size="small">
                <div style={outlineInfoStyle}>

                    <img
                        src={storyoutlineIcon}
                        width='14px'
                        height='14px'
                        style={{marginRight:'6px'}}
                    >
                    </img>

                    {props.questionList[props.editingFactIndex] === ''
                    ?
                    <div>{'Custom'}</div>

                    :
                    <Space size={6}>
                    <div>{'Plot'}</div>
                    <div style={{
                        width: '16px',
                        height:'16px',
                        borderRadius: '3px',
                        border: '1px solid #FFF',
                        background: '#898B8F',
                        lineHeight:'15.5px',
                        textAlign:'center',
                    }}>{(outline)}</div>
                    </Space>
                    }
                </div>
                <div style={factTypeStyle}>{factType}</div>
            </Space>
        </div>
    );
};

export default LeftPanel;