import React from "react";
import './infotest.css'
import { Layout } from 'antd';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Select, Row, Col } from 'antd';
import publishExport from '../../assets/pagePics/publishExport.svg'
import G1T1 from '../InfoCmponents/infographic/infographic';
import G1T2 from '../InfoCmponents/seinfographic/infographic'
import G1T3 from '../InfoCmponents/thinfographic/infographic'
import G1T4 from '../InfoCmponents/foinfographic/infographic'
import G2T1 from '../InfoCmponents/interaction/interaction'
import G2T2 from '../InfoCmponents/seinteraction/interaction'
import G2T3 from '../InfoCmponents/thinteraction/interaction'
import G2T4 from '../InfoCmponents/fointeraction/interaction'
import G3T1 from '../InfoCmponents/animation/animation'
import G3T2 from '../InfoCmponents/seanimation/animation'
import G3T3 from '../InfoCmponents/thanimation/animation'
import G3T4 from '../InfoCmponents/foanimation/animation'
import G4T1 from '../../componentsSys/StoryoutlineCard/storyoutlineCard'
import config from "../../axios/config";
import * as api from '../../axios/api'

const { Header, Sider, Content } = Layout;

export default class InfoTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.visualizationGenre,
            template: this.props.visualizationTemplate,
            //fileList: this.props.changedFileList,
            fileList: [],
            infoDownloadType: 'png',
        }

    }

    componentDidMount() {
        console.log('Infotest props:', this.props)
        
    }

    getShrinkScale() {
        if (this.state.genre === "g1") return 0.4;
        else if (this.state.genre === "g2") {
            if (this.state.template === "t1") return 0.72
            else if (this.state.template === "t4") return 0.72
            else return 0.72;
        }
        else if (this.state.genre === "g3") return 0.75;
        else if (this.state.genre === "g4") return 0.75;
    }

    handleInfoChange = (value) => {
        this.setState({
            infoDownloadType: value
        })

    };
    handleType1Event = () => {
        const { infoDownloadType } = this.state
        if (infoDownloadType == 'pdf') {
            console.log("infoDownloadType=='pdf'")
            this.generatePDF()
        }
        else if (infoDownloadType == 'png') { this.generatePNG() }
    }

    generatePNG = () => {
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
    }



    generatePDF = () => {
        // 获取要转换为PDF的HTML元素
        console.log('generatepdf')
        const content = document.getElementById('infographic');
        console.log(content)
        // 设置html2pdf选项
        const options = {
            margin: 10,
            filename: 'infographic.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'px', format: [1000, 1600], orientation: 'portrait' },
        };
        // 使用html2pdf生成PDF
        html2pdf(content, options)
    }


    handleExportClick = () => {
        const { genre } = this.state;
        switch (genre) {
            case 'g1':
                // 执行类型1的事件
                this.handleType1Event();
                break;
            case 'g2':
                // 执行类型2的事件
                this.handleType2Event();
                break;
            case 'g3':
                // 执行类型3的事件
                this.handleType3Event();
                break;
            case 'g4':
                // 执行类型1的事件
                this.handleType1Event();
                break;
            default:
                break;
        }
    }

    handleType3Event = () => {
        this.recordVideo()
    }



    recordVideo = async () => {
        var videoUrl = 'http://localhost:8000/videos/output.mp4';
        try {
            // 使用 fetch 获取视频内容
            const response = await fetch(videoUrl);
            const videoBlob = await response.blob();
        
            // 创建一个 Blob URL
            const blobUrl = URL.createObjectURL(videoBlob);
        
            // 创建一个隐藏的 <a> 元素
            var a = document.createElement('a');
            a.style.display = 'none';
            document.body.appendChild(a);
        
            // 设置 <a> 元素的 href 属性为 Blob URL
            a.href = blobUrl;
        
            // 设置下载文件的文件名
            a.download = 'output.mp4';
        
            // 模拟点击 <a> 元素，触发下载
            a.click();
        
            // 移除 <a> 元素
            document.body.removeChild(a);
          } catch (error) {
            console.error('Error downloading video:', error);
          }
        // 准备请求体数据，这里仅是一个示例，根据实际情况传递你需要的数据
        // const requestBody = {
        //     "animationFactList": this.props.animationFactList,
        //     "infoTitle": this.props.infoTitle,
        //     "keyPoint": this.props.keyPoint,
        //     "captionList": this.props.captionList,
        //     "genre": this.state.genre,
        //     "template": this.state.template,
        //     "duration": this.props.animationFactList.length * 3
        // }

        // try {
        //     //console.log('try -- requestBody',requestBody)
        //     const response = await api.recordVideo(requestBody)
        //     const result = response.data
        //     console.log('Success:', result);
        //     // 在这里可以处理后端返回的数据，例如处理下载链接或者其他操作
        //     const downloadUrl = result.downloadUrl;
        //     // 创建一个隐藏的链接元素
        //     const downloadLink = document.createElement('a');
        //     downloadLink.href = downloadUrl;
        //     downloadLink.download = 'downloaded-file.mp4'; // 替换为实际的文件名
        //     downloadLink.click();
        //     // 将链接元素追加到页面中（这一步是必须的，但不会显示在页面上）
        //     // document.body.appendChild(downloadLink);
        //     // // 触发链接的点击事件以开始下载
        //     // downloadLink.click();
        //     // // 下载完成后，从页面中移除链接元素
        //     // document.body.removeChild(downloadLink);

        // } catch (error) {
        //     console.error('Request failed:', error.message);
        //     // 处理请求失败，例如显示错误提示给用户
        // }
    };



    //back按钮 回到编辑页面
    // backToEditPage = () => {
    //     window.location.href = '/edit';
    // }

    // backToEditPage  = () => {
    //     const navigate = useNavigate();
    //     navigate('/edit');
    // };

    render() {
        const shrinkStyle = {
            transform: `scale(${this.getShrinkScale()})`,
            transformOrigin: 'top', // 缩放的基准点为顶部
        };

        const borderStyle = {
            backgroundColor: "white",
            // border: "1.4px solid #DCDEE1",
            justifyContent: 'center',
            display: 'flex',
            paddingTop: 10
        };

        // 从 LocalStorage 获取 uid



        return (
            <div className="publish-container" >
                <div className="publish-menu" style={{ position: 'relative', display: 'flex', alignItems: 'center',height:'130px' }}>
                    <div style={{ position: 'absolute', 
                    left: (() => {
                        switch (this.state.genre) {
                          case 'g3':
                            return '180px';
                          case 'g2':
                            return '220px';
                          case 'g1':
                            return '290px';
                          default:
                            return '180px'; // 设置默认值或根据需要更改
                        }
                      })(),
                    height:'32px' }}>
                        <Link to="/preview/datastory">
                            <Button 
                            className='back-btn'
                            styles={{ width: '98px', height: '32px' }}
                            icon={< ArrowLeftOutlined />
                            } //onClick={this.backToEditPage} 
                            >Back</Button>
                        </Link>
                    </div>
                    <div style={{ position: 'absolute', 
                    right: (() => {
                        switch (this.state.genre) {
                          case 'g3':
                            return '185px';
                          case 'g2':
                            return '180px';
                          case 'g1':
                            return '195px';
                          default:
                            return '185px'; // 设置默认值或根据需要更改
                        }
                      })(),
                    display: 'flex', alignItems: 'center' }}>
                        <Space direction={"horizontal"} size={12}>
                        {(this.state.genre === "g1" || this.state.genre === "g4") &&
                            <Select
                                defaultValue={'png'}
                                //value={measurefield}
                                style={{ width: '98px', height: '32px',borderRadius:'4px' }}
                                onChange={this.handleInfoChange}
                                options={[
                                    {
                                        value: 'png',
                                        label: 'png',
                                    },
                                    {
                                        value: 'pdf',
                                        label: 'pdf',
                                    }
                                ]}
                            />}
                        {(this.state.genre ==="g1"||this.state.genre ==="g4") &&
                             <Button type="primary" className="export-btn" onClick={this.handleExportClick}>
                            <Space size={12}style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.5749 9.77643C12.5592 9.40245 12.3148 9.19592 11.9922 9.20359C11.6725 9.21117 11.4617 9.42137 11.4317 9.80363C11.4097 10.0844 11.4285 10.3683 11.4225 10.6506C11.4072 11.3592 11.2538 11.523 10.5454 11.5369C9.86304 11.5504 9.18021 11.5413 8.49759 11.5414C6.92053 11.5415 5.34343 11.5427 3.76637 11.5405C2.68027 11.539 2.58614 11.4452 2.58095 10.3893C2.58001 10.201 2.5895 10.0116 2.57221 9.82473C2.5354 9.42705 2.34897 9.22014 2.03333 9.20229C1.69262 9.183 1.44429 9.41466 1.41824 9.82429C1.39441 10.1995 1.4078 10.5772 1.41028 10.9538C1.41835 12.1729 1.95846 12.72 3.17797 12.7269C4.44899 12.7342 5.7201 12.7286 6.99118 12.7288C7.36779 12.7292 7.74443 12.7293 8.12102 12.7291C9.08612 12.7288 10.0514 12.7422 11.0162 12.7238C11.8667 12.7075 12.4887 12.2155 12.5605 11.4693C12.6144 10.9094 12.5983 10.34 12.5749 9.77643Z" fill="white"/>
                            <path d="M2.70606 6.02657C3.91953 7.24073 5.13316 8.45473 6.34678 9.66874C6.39665 9.71863 6.44743 9.7676 6.49696 9.81779C6.69225 10.0158 6.92007 10.1274 7.19606 10.0228C7.28609 9.98872 7.35301 9.9373 7.41023 9.87896C7.448 9.85281 7.48502 9.82403 7.51864 9.79135C8.14256 9.18465 10.8013 6.51738 11.4155 5.90069C11.4815 5.83444 11.5449 5.76324 11.5969 5.68589C11.7639 5.43755 11.741 5.19426 11.543 4.97695C11.3404 4.75468 11.0852 4.74535 10.8338 4.86901C10.7117 4.92905 10.6111 5.03938 10.5117 5.13798C10.0983 5.54801 8.60294 7.04199 7.60169 8.04476C7.60221 6.47851 7.60238 4.91227 7.60207 3.34601C7.60198 2.87571 7.61698 2.40457 7.59366 1.9354C7.57196 1.49957 7.36044 1.27723 7.01987 1.26606C6.67052 1.25461 6.45857 1.46743 6.41094 1.89713C6.3929 2.05994 6.40242 2.226 6.40234 2.39058C6.40178 3.42522 6.40205 4.45989 6.40205 5.49456C6.40203 6.26826 6.40205 7.04196 6.40205 7.81568C6.34834 7.83945 6.29464 7.86321 6.24093 7.88698C5.92991 7.57713 5.61851 7.26759 5.30789 6.95733C4.65912 6.30921 4.01878 5.65241 3.35862 5.01612C3.06057 4.72883 2.71507 4.72411 2.47775 4.94995C2.22196 5.19336 2.23097 5.48315 2.50955 5.82429C2.5688 5.89681 2.63959 5.96005 2.70606 6.02657Z" fill="white"/>
                            </svg>
                            <div >{'Export'}</div>
                            </Space>
                            </Button> 
                    }
                     {(this.state.genre ==="g3") &&
                             <Button type="primary" className="export-btn" onClick={this.handleExportClick}>
                            <Space size={12}style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.5749 9.77643C12.5592 9.40245 12.3148 9.19592 11.9922 9.20359C11.6725 9.21117 11.4617 9.42137 11.4317 9.80363C11.4097 10.0844 11.4285 10.3683 11.4225 10.6506C11.4072 11.3592 11.2538 11.523 10.5454 11.5369C9.86304 11.5504 9.18021 11.5413 8.49759 11.5414C6.92053 11.5415 5.34343 11.5427 3.76637 11.5405C2.68027 11.539 2.58614 11.4452 2.58095 10.3893C2.58001 10.201 2.5895 10.0116 2.57221 9.82473C2.5354 9.42705 2.34897 9.22014 2.03333 9.20229C1.69262 9.183 1.44429 9.41466 1.41824 9.82429C1.39441 10.1995 1.4078 10.5772 1.41028 10.9538C1.41835 12.1729 1.95846 12.72 3.17797 12.7269C4.44899 12.7342 5.7201 12.7286 6.99118 12.7288C7.36779 12.7292 7.74443 12.7293 8.12102 12.7291C9.08612 12.7288 10.0514 12.7422 11.0162 12.7238C11.8667 12.7075 12.4887 12.2155 12.5605 11.4693C12.6144 10.9094 12.5983 10.34 12.5749 9.77643Z" fill="white"/>
                            <path d="M2.70606 6.02657C3.91953 7.24073 5.13316 8.45473 6.34678 9.66874C6.39665 9.71863 6.44743 9.7676 6.49696 9.81779C6.69225 10.0158 6.92007 10.1274 7.19606 10.0228C7.28609 9.98872 7.35301 9.9373 7.41023 9.87896C7.448 9.85281 7.48502 9.82403 7.51864 9.79135C8.14256 9.18465 10.8013 6.51738 11.4155 5.90069C11.4815 5.83444 11.5449 5.76324 11.5969 5.68589C11.7639 5.43755 11.741 5.19426 11.543 4.97695C11.3404 4.75468 11.0852 4.74535 10.8338 4.86901C10.7117 4.92905 10.6111 5.03938 10.5117 5.13798C10.0983 5.54801 8.60294 7.04199 7.60169 8.04476C7.60221 6.47851 7.60238 4.91227 7.60207 3.34601C7.60198 2.87571 7.61698 2.40457 7.59366 1.9354C7.57196 1.49957 7.36044 1.27723 7.01987 1.26606C6.67052 1.25461 6.45857 1.46743 6.41094 1.89713C6.3929 2.05994 6.40242 2.226 6.40234 2.39058C6.40178 3.42522 6.40205 4.45989 6.40205 5.49456C6.40203 6.26826 6.40205 7.04196 6.40205 7.81568C6.34834 7.83945 6.29464 7.86321 6.24093 7.88698C5.92991 7.57713 5.61851 7.26759 5.30789 6.95733C4.65912 6.30921 4.01878 5.65241 3.35862 5.01612C3.06057 4.72883 2.71507 4.72411 2.47775 4.94995C2.22196 5.19336 2.23097 5.48315 2.50955 5.82429C2.5688 5.89681 2.63959 5.96005 2.70606 6.02657Z" fill="white"/>
                            </svg>
                            <div >{'Export MP4'}</div>
                            </Space>
                            </Button> 
                    }
                    {(this.state.genre ==='g2')&&
                        <svg width="93" height="32" viewBox="0 0 93 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.368 10.808C5.488 10.808 6.384 11.06 7.028 11.578C7.7 12.11 8.078 12.908 8.176 13.958H7.042C6.916 13.23 6.636 12.698 6.202 12.348C5.754 11.984 5.124 11.816 4.312 11.816C3.57 11.816 2.996 11.928 2.576 12.18C2.1 12.46 1.862 12.88 1.862 13.454C1.862 13.958 2.142 14.364 2.716 14.672C2.968 14.812 3.584 15.022 4.55 15.302C5.866 15.694 6.734 16.016 7.154 16.268C7.98 16.772 8.4 17.472 8.4 18.382C8.4 19.25 8.05 19.95 7.35 20.454C6.65 20.944 5.712 21.196 4.522 21.196C3.346 21.196 2.422 20.944 1.75 20.44C0.966 19.838 0.532 18.928 0.448 17.696H1.582C1.68 18.564 1.988 19.208 2.492 19.614C2.954 19.978 3.626 20.174 4.522 20.174C5.334 20.174 6.006 20.02 6.51 19.712C7.014 19.404 7.266 18.984 7.266 18.452C7.266 17.822 6.93 17.332 6.272 16.982C5.992 16.814 5.278 16.576 4.158 16.254C2.954 15.89 2.184 15.61 1.862 15.442C1.092 14.994 0.714 14.35 0.714 13.51C0.714 12.642 1.078 11.956 1.82 11.48C2.478 11.032 3.332 10.808 4.368 10.808ZM9.7137 10.808H10.8337V14.952C11.0857 14.49 11.4217 14.14 11.8417 13.902C12.2337 13.678 12.6677 13.566 13.1577 13.566C13.9977 13.566 14.6557 13.804 15.1037 14.308C15.5517 14.798 15.7757 15.512 15.7757 16.436V21H14.6557V16.604C14.6557 15.932 14.4877 15.414 14.1797 15.05C13.8437 14.686 13.3817 14.504 12.7797 14.504C12.2197 14.504 11.7577 14.728 11.3937 15.176C11.0157 15.624 10.8337 16.198 10.8337 16.87V21H9.7137V10.808ZM20.643 13.566C21.679 13.566 22.435 13.832 22.939 14.378C23.359 14.854 23.583 15.512 23.583 16.352V21H22.533V19.782C22.253 20.174 21.875 20.496 21.427 20.748C20.895 21.042 20.293 21.196 19.621 21.196C18.893 21.196 18.319 21.014 17.885 20.65C17.437 20.272 17.213 19.782 17.213 19.194C17.213 18.368 17.535 17.752 18.207 17.332C18.795 16.94 19.635 16.73 20.727 16.716L22.463 16.688V16.31C22.463 15.092 21.833 14.49 20.573 14.49C20.041 14.49 19.607 14.588 19.271 14.812C18.893 15.036 18.655 15.386 18.543 15.848L17.437 15.764C17.591 15.008 17.969 14.434 18.557 14.07C19.089 13.734 19.775 13.566 20.643 13.566ZM22.463 17.528L20.797 17.556C19.173 17.584 18.361 18.116 18.361 19.166C18.361 19.502 18.487 19.768 18.767 19.992C19.047 20.202 19.411 20.314 19.859 20.314C20.545 20.314 21.147 20.09 21.679 19.642C22.197 19.208 22.463 18.704 22.463 18.144V17.528ZM28.4913 13.566C28.8833 13.566 29.2193 13.622 29.4853 13.734V14.854C29.1213 14.742 28.7573 14.7 28.4073 14.7C27.8473 14.7 27.3713 14.938 26.9933 15.442C26.6013 15.918 26.4193 16.492 26.4193 17.164V21H25.3133V13.762H26.4193V15.022C26.6153 14.602 26.8673 14.266 27.1753 14.028C27.5533 13.72 27.9873 13.566 28.4913 13.566ZM33.4086 13.566C34.5706 13.566 35.4526 13.958 36.0406 14.742C36.5726 15.442 36.8526 16.436 36.8806 17.696H31.1686C31.2246 18.508 31.4346 19.138 31.8266 19.586C32.2186 20.034 32.7646 20.258 33.4506 20.258C34.0386 20.258 34.5286 20.104 34.8926 19.81C35.2006 19.558 35.4386 19.18 35.6206 18.676H36.7406C36.5726 19.376 36.2506 19.936 35.7606 20.384C35.1586 20.916 34.3886 21.196 33.4506 21.196C32.4146 21.196 31.5746 20.846 30.9586 20.174C30.3146 19.474 30.0066 18.55 30.0066 17.374C30.0066 16.31 30.3006 15.414 30.9166 14.7C31.5326 13.944 32.3586 13.566 33.4086 13.566ZM33.4366 14.504C32.7926 14.504 32.2746 14.714 31.8826 15.134C31.4906 15.554 31.2666 16.114 31.1966 16.828H35.7186C35.5786 15.274 34.8086 14.504 33.4366 14.504ZM42.9943 11.004H44.1283V20.006H49.9103V21H42.9943V11.004ZM52.0088 11.032C52.2468 11.032 52.4428 11.102 52.6108 11.27C52.7788 11.41 52.8628 11.606 52.8628 11.858C52.8628 12.096 52.7788 12.292 52.6108 12.46C52.4428 12.614 52.2468 12.698 52.0088 12.698C51.7708 12.698 51.5748 12.614 51.4068 12.46C51.2388 12.292 51.1688 12.096 51.1688 11.858C51.1688 11.606 51.2388 11.41 51.4068 11.27C51.5748 11.102 51.7708 11.032 52.0088 11.032ZM51.4488 13.762H52.5688V21H51.4488V13.762ZM58.0548 13.566C59.8468 13.566 60.7568 14.56 60.7568 16.548V21H59.6368V16.632C59.6368 15.218 58.9928 14.518 57.7328 14.518C57.2288 14.518 56.7948 14.7 56.4308 15.064C56.0388 15.456 55.8288 15.974 55.7868 16.632V21H54.6668V13.762H55.7868V14.826C56.0388 14.42 56.3608 14.112 56.7528 13.902C57.1448 13.678 57.5788 13.566 58.0548 13.566ZM62.4871 10.808H63.6071V17.122L67.2331 13.762H68.7171L65.5251 16.674L69.0251 21H67.5831L64.7551 17.402L63.6071 18.438V21H62.4871V10.808Z" fill="black"/>
                        <path d="M83.9207 21.1137H77.0164C76.125 21.1137 75.4004 20.3877 75.4004 19.4977V12.0164C75.4004 11.125 76.125 10.4004 77.0164 10.4004H83.9221C84.8135 10.4004 85.5381 11.125 85.5381 12.0164V19.4963C85.5367 20.3877 84.8121 21.1137 83.9207 21.1137ZM77.0164 11.3314C76.6377 11.3314 76.3301 11.6391 76.3301 12.0178V19.4977C76.3301 19.8764 76.6377 20.184 77.0164 20.184H83.9221C84.3008 20.184 84.6084 19.8764 84.6084 19.4977V12.0164C84.6084 11.6377 84.3008 11.3301 83.9221 11.3301H77.0164V11.3314Z" fill="#333333"/>
                        <g clip-path="url(#clip0_3563_9903)">
                        <rect width="8.4" height="8.4" transform="translate(78.9004 13.9004)" fill="white"/>
                        <path d="M84.0092 17.0514L83.9832 17.0279C83.8168 16.8826 83.5665 16.9011 83.4212 17.0665C83.2759 17.232 83.2944 17.4874 83.4607 17.6335L83.4674 17.6394C83.4842 17.6537 83.4993 17.6688 83.5153 17.6848C84.0302 18.1997 84.0302 19.0372 83.5153 19.5521L82.2309 20.8373C81.716 21.3522 80.8785 21.3522 80.3636 20.8373C79.8487 20.3224 79.8487 19.4849 80.3636 18.97L81.0121 18.3215C81.1683 18.1653 81.1683 17.9124 81.0121 17.7562C80.8558 17.5999 80.603 17.5999 80.4468 17.7562L79.7983 18.4047C78.9709 19.2321 78.9709 20.5777 79.7983 21.4035C80.2107 21.8159 80.7534 22.0234 81.2968 22.0234C81.8403 22.0234 82.383 21.8167 82.7962 21.4026L84.0798 20.1191C84.9072 19.2917 84.9072 17.946 84.0798 17.1203C84.0546 17.0943 84.0302 17.0699 84.0092 17.0514Z" fill="black"/>
                        <path d="M86.3992 14.8002C85.5718 13.9728 84.2261 13.9728 83.4004 14.8002L82.1169 16.0838C81.717 16.4836 81.4961 17.0162 81.4961 17.5832C81.4961 18.1502 81.717 18.6827 82.1169 19.0826C82.1412 19.1069 82.1673 19.1321 82.1967 19.159L82.2059 19.1674C82.2059 19.1674 82.2118 19.1724 82.2118 19.1733C82.2865 19.2405 82.3806 19.2732 82.473 19.2732C82.5831 19.2732 82.6923 19.2279 82.7721 19.138C82.9191 18.9734 82.9023 18.718 82.7368 18.571L82.7284 18.5626C82.7116 18.5475 82.6956 18.5324 82.6805 18.5172C82.431 18.2678 82.2933 17.9368 82.2933 17.5832C82.2933 17.2295 82.4302 16.8994 82.6805 16.6491L83.9657 15.3656C84.4806 14.8506 85.3181 14.8506 85.833 15.3656C86.3479 15.8805 86.3479 16.718 85.833 17.2329L85.1845 17.8814C85.0283 18.0376 85.0283 18.2904 85.1845 18.4467C85.3408 18.6029 85.5936 18.6029 85.7499 18.4467L86.3983 17.7982C87.2266 16.9733 87.2266 15.6276 86.3992 14.8002Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_3563_9903">
                        <rect width="8.4" height="8.4" fill="white" transform="translate(78.9004 13.9004)"/>
                        </clipPath>
                        </defs>
                        </svg>

                    }
                        </Space>

                    </div>
                </div>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>

                        {this.state.genre === "g1" && this.state.template === "t1" &&
                            // <div style={{ width: 420, height: 555, ...borderStyle }}>
                            <G1T1 {...this.props} imgSrc={this.props.imageFileList1.length > 0 ? this.props.imageFileList1[0] : ""} />
                            // </div>
                        }
                        {this.state.genre === "g1" && this.state.template === "t2" &&
                            // <div style={{ width: 420, height: 580, ...borderStyle }}>
                            <G1T2 {...this.props} mainChartIndex={this.props.mainChartIndex1} />
                            // </div>
                        }
                        {this.state.genre === "g1" && this.state.template === "t3" &&
                            // <div style={{ width: 420, height: 570, ...borderStyle }}>
                            <G1T3 {...this.props} />
                            // </div>
                        }
                        {this.state.genre === "g1" && this.state.template === "t4" &&
                            // <div style={{ width: 420, height: 570, ...borderStyle }}>
                            <G1T4 {...this.props} />
                            //</div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t1" &&
                            <div style={{ width: 1000, height: 1500, ...borderStyle }}>
                            <G2T1  {...this.props} style={shrinkStyle} imgSrc={this.props.imageFileList2.length > 0 ? this.props.imageFileList2[0] : ""} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t2" &&
                            <div style={{ width: 1000, height: 1500, ...borderStyle }}>
                                <G2T2  {...this.props} style={shrinkStyle} mainChartIndex={this.props.mainChartIndex2} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t3" &&
                            <div style={{ width: 1000, height: 1500, ...borderStyle }}>
                                <G2T3  {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t4" &&
                            <div style={{ width: 1000, height: 1500, ...borderStyle }}>
                                <G2T4  {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t1" &&
                            <div>
                                <div style={{ width: 1000, height: 650, ...borderStyle }}>
                                    <G3T1 {...this.props} style={shrinkStyle} imgSrc={this.props.imageFileList3.length > 0 ? this.props.imageFileList3[0] : ""} />
                                </div>
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t2" &&
                            <div style={{ width: 1000, height: 650, ...borderStyle }}>
                                <G3T2 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t3" &&
                            <div style={{ width: 1000, height: 650, ...borderStyle }}>
                                <G3T3 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t4" &&
                            <div style={{ width: 1000, height: 650, ...borderStyle }}>
                                <G3T4 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g4"  &&
                            <div style={{ width: 1000, height: 450, display:'flex',justifyContent:'center',alignItems:'center',...borderStyle,}}>
                                <G4T1 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}