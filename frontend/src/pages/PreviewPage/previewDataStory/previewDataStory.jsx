// 编辑数据故事页面
import React from 'react'
import { Link } from 'react-router-dom';
import "./previewDataStory.css"
import { Button } from 'antd';
import OperationType from '../../../constant/OperationType';
import { ArrowLeftOutlined } from '@ant-design/icons';
import RightEditPanel from './components/rightEditPanel';
import G1T1 from '../../InfoCmponents/infographic/infographic';
import G1T2 from '../../InfoCmponents/seinfographic/infographic'
import G1T3 from '../../InfoCmponents/thinfographic/infographic'
import G1T4 from '../../InfoCmponents/foinfographic/infographic'
import G2T1 from '../../InfoCmponents/interaction/interaction'
import G2T2 from '../../InfoCmponents/seinteraction/interaction'
import G2T3 from '../../InfoCmponents/thinteraction/interaction'
import G2T4 from '../../InfoCmponents/fointeraction/interaction'
import G3T1 from '../../InfoCmponents/animation/animation'
import G3T2 from '../../InfoCmponents/seanimation/animation'
import G3T3 from '../../InfoCmponents/thanimation/animation'
import G3T4 from '../../InfoCmponents/foanimation/animation'
import G4T1 from '../../../componentsSys/StoryoutlineCard/storyoutlineCard'

export default class PreviewDataStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.visualizationGenre,
            template: this.props.visualizationTemplate,
            fileList1: this.props.imageFileList1,
            fileList2: this.props.imageFileList2,
            fileList3: this.props.imageFileList3,
        }

    }

    componentDidMount() {
        console.log('PreviewDataStroyPage props:', this.props)
    }


    handleGenreTemplateChange = (genre, template) => {
        // 处理传递过来的 genre 和 template
        this.setState({
            genre: genre,
            template: template,
        });

        this.props.setVisualizationGenre(genre)
        this.props.setVisualizationTemplate(template)

    };

    //更改主图
    handleMainChartChange = (index) => {
        if (this.state.genre === "g1") {
            this.props.changeG1MainChart(index)
        } else if (this.state.genre === "g2") {
            this.props.changeG2MainChart(index)
        } else {
            this.props.changeG3MainChart(index)
        }
    }

    //获取当前  mainChartIndex
    getMainChartIndex() {
        if (this.state.genre === "g1") {
            return this.props.mainChartIndex1
        } else if (this.state.genre === "g2") {
            return this.props.mainChartIndex2
        } else {
            return this.props.mainChartIndex3

        }
    }

    //更改背景图片
    handleImageChange = (file) => {
        const { genre } = this.state
        if (genre === "g1") {
            this.setState({
                fileList1: file
            });
            this.props.changeImageFileList1(file)
        } else if (genre === "g2") {
            this.setState({
                fileList2: file
            });
            this.props.changeImageFileList2(file)
        } else if (genre === "g3") {
            this.setState({
                fileList3: file
            });
            this.props.changeImageFileList3(file)
        }
        console.log("111111111111111111",this.props)
    }

    getShrinkScale() {
        if (this.state.genre === "g1") return 0.4;
        else if (this.state.genre === "g2") {
            if (this.state.template === "t1") return 0.25
            else if (this.state.template === "t4") return 0.25
            else return 0.25;
        }
        else if (this.state.genre === "g3") return 0.5;
        else if (this.state.genre === "g4") return 0.5;
    }

    backToEditPage = () => {
        const {updateUserOperation} = this.props
        updateUserOperation(OperationType.GENERATED)
    };

    handlePublish = () => {
        // if(this.state.genre === "g3"){
        //     this.recordVideo()
        // }

    }



    render() {
        const shrinkStyle = {
            transform: `scale(${this.getShrinkScale()})`,
            transformOrigin: 'top', // 缩放的基准点为顶部
        };

        const borderStyle = {
            backgroundColor: "white",
            border: "1.4px solid #DCDEE1",
            justifyContent: 'center',
            display: 'flex',
            paddingTop: 10
        };
        //console.log('PreviewDataStory',...this.props)

        return (
            <div className='preview-body' >
                <div className='preview-body-left' style={{ height: '100%', width: '74%', borderRight: '1.5px solid #D4D4D4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <div>
                            <Link to="/edit">
                                <Button icon={< ArrowLeftOutlined />} //onClick={this.backToEditPage} 
                                    className='back-btn'
                                    onClick={this.backToEditPage}
                                    >Back</Button>
                            </Link>
                        </div>

                        {this.state.genre === "g1" && this.state.template === "t1" &&
                            <div style={{ width: 440, height: 555, ...borderStyle }}>
                                <G1T1 {...this.props} style={shrinkStyle} imgSrc={this.state.fileList1.length > 0 ? this.state.fileList1[0] : ""} />
                            </div>}
                        {this.state.genre === "g1" && this.state.template === "t2" &&
                            <div style={{ width: 440, height: 580, ...borderStyle }}>
                                <G1T2 {...this.props} style={shrinkStyle} mainChartIndex={this.getMainChartIndex()} />
                            </div>
                        }
                        {this.state.genre === "g1" && this.state.template === "t3" &&
                            <div style={{ width: 440, height: 570, ...borderStyle }}>
                                <G1T3 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g1" && this.state.template === "t4" &&
                            <div style={{ width: 440, height: 570, ...borderStyle }}>
                                <G1T4 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t1" &&
                            <div style={{ width: 420, height: 580, ...borderStyle }}>
                                <G2T1  {...this.props} style={shrinkStyle} imgSrc={this.state.fileList2.length > 0 ? this.state.fileList2[0] : ""} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t2" &&
                            <div style={{ width: 420, height: 580, ...borderStyle }}>
                                <G2T2  {...this.props} style={shrinkStyle} mainChartIndex={this.getMainChartIndex()} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t3" &&
                            <div style={{ width: 420, height: 580, ...borderStyle }}>
                                <G2T3  {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g2" && this.state.template === "t4" &&
                            <div style={{ width: 420, height: 580, ...borderStyle }}>
                                <G2T4  {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t1" &&
                            <div style={{ width: 810, height: 540, ...borderStyle }}>
                                <G3T1 {...this.props} style={shrinkStyle} imgSrc={this.state.fileList3.length > 0 ? this.state.fileList3[0] : ""} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t2" &&
                            <div style={{ width: 810, height: 540, ...borderStyle }}>
                                <G3T2 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t3" &&
                            <div style={{ width: 810, height: 540, ...borderStyle }}>
                                <G3T3 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g3" && this.state.template === "t4" &&
                            <div style={{ width: 810, height: 540, ...borderStyle }}>
                                <G3T4 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                        {this.state.genre === "g4" &&
                            <div style={{ width: 810, height: 540, display:'flex',alignItems:'center', ...borderStyle,overflowX:'scroll', }}>
                                <G4T1 {...this.props} style={shrinkStyle} />
                            </div>
                        }
                    </div>
                    <Link to="/preview/publish">
                        <Button type="primary" className='publish-btn' onClick={this.handlePublish}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                            <path d="M14.6753 2.95508L5.90625 10.7498V13.9246C5.90625 14.3185 6.44203 14.5159 6.75545 14.2373L8.29248 12.871L14.6753 2.95508Z" fill="#C6DDFF"/>
                            <path d="M5.90675 10.7495L10.3966 14.7406C10.9195 15.2055 11.81 15.0186 12.044 14.395L16.8486 1.5828C16.9782 1.23718 16.6083 0.908272 16.2193 1.02343L1.80577 5.29421C1.10405 5.50218 0.893819 6.29374 1.41694 6.75858L4.43845 9.44437L14.6759 2.95483L5.90675 10.7495Z" fill="white"/>
                            </svg>
                            <span style={{ marginLeft: 10 }}>Publish</span>
                        </Button>
                    </Link>
                </div>
                <div className='preview-body-right' style={{ height: '100%', width: '26%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <RightEditPanel  {...this.props} onGenreTemplateChange={this.handleGenreTemplateChange} onImageChange={this.handleImageChange} onMainChartChange={this.handleMainChartChange}></RightEditPanel>
                </div>

            </div>
        )
    }


}