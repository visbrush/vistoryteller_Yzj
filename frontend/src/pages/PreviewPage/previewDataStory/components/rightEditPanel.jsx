// 数据故事预览右边栏
import React from 'react'
import { Radio, Button, Upload, message, Grid } from 'antd';
import { PlusOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import NatuSmallComponent from "../../../../components/natuSmall/natuSmall";

import G1T1 from '../../../../assets/pagePics/G1T1.png';
import G1T2 from '../../../../assets/pagePics/G1T2.png';
import G1T3 from '../../../../assets/pagePics/G1T3.png';
import G1T4 from '../../../../assets/pagePics/G1T4.png';
import G2T1 from '../../../../assets/pagePics/interaction/top picture.png'
import G2T2 from '../../../../assets/pagePics/interaction/main chart.png'
import G2T3 from '../../../../assets/pagePics/interaction/four-section.png'
import G2T4 from '../../../../assets/pagePics/interaction/waterfall flow.png'
import G3T1 from '../../../../assets/pagePics/video/top picture.png'
import G3T2 from '../../../../assets/pagePics/video/mainchart-1.png'
import G3T3 from '../../../../assets/pagePics/video/foursection.png'
import G3T4 from '../../../../assets/pagePics/video/waterfall flow.png'
import G4T1 from '../../../../assets/pagePics/G4T1.png'

import './rightEditPanel.css'

export default class RightEditPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.visualizationGenre,
            template: this.props.visualizationTemplate,
            cardHeight: 145,//背景图片
            fileList1: this.props.imageFileList1,
            fileList2: this.props.imageFileList2,
            fileList3: this.props.imageFileList3,
            factList: this.props.factList,
            animationFactList: this.props.animationFactList,
            captionList: this.props.captionList,
            titleList: this.props.titleList,
            mainChartIndex1: this.props.mainChartIndex1,
            mainChartIndex2: this.props.mainChartIndex2,
            mainChartIndex3: this.props.mainChartIndex3,
            hoverBg: false
        }
    }

    componentDidMount() {
        console.log('PreviewDataStroyPage props:', this.props)
    }

    handleGenreChange = (e) => {
        this.setState({ genre: e.target.value }, () => {
            this.props.onGenreTemplateChange(this.state.genre, this.state.template);
        });
        if (e.target.value === "g3") {
            this.setState({ cardHeight: 100 });
        } else {
            this.setState({ cardHeight: 155 });

        }

        if(e.target.value === "g4") {
            this.setState({ template: 't1' }, () => {
                this.props.onGenreTemplateChange(this.state.genre, 't1');
            });
        } 
    };

    handleTemplateChange = (e) => {
        this.setState({ template: e.target.value }, () => {
            this.props.onGenreTemplateChange(this.state.genre, this.state.template);
        });
    };

    //上传文件前检查文件格式
    beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error(`${file.name} is not an image file`);
        }
        return isImage || Upload.LIST_IGNORE;
    }

    //更换背景图片
    handleFileChange = (info) => {
        const { genre } = this.state;
        // 根据 genre 的值替换对应的 fileList 值
        if (genre === "g1") {
            let fileList1 = [...info.fileList];
            this.setState({ fileList1 });
        } else if (genre === "g2") {
            let fileList2 = [...info.fileList];
            this.setState({ fileList2 });
        } else if (genre === "g3") {
            let fileList3 = [...info.fileList];
            this.setState({ fileList3 });
        }
        this.props.onImageChange([...info.fileList]);
    }


    //切换主图的函数
    handleLeftClick = () => {
        const factLength = this.state.genre === "g3" ? this.state.animationFactList.length : this.state.factList.length
        // 点击左滑动，mainChartIndex 减一
        const { genre } = this.state;
        // 根据 genre 的值替换对应的 fileList 值
        if (genre === "g1") {
            this.setState((prevState) => ({ mainChartIndex1: (prevState.mainChartIndex1 - 1 + factLength) % factLength }), () => {
                this.props.onMainChartChange(this.state.mainChartIndex1);
            });
        } else if (genre === "g2") {
            this.setState((prevState) => ({ mainChartIndex2: (prevState.mainChartIndex2 - 1 + factLength) % factLength }), () => {
                this.props.onMainChartChange(this.state.mainChartIndex2);
            });
        } else if (genre === "g3") {
            this.setState((prevState) => ({ mainChartIndex3: (prevState.mainChartIndex3 - 1 + factLength) % factLength }), () => {
                this.props.onMainChartChange(this.state.mainChartIndex3);
            });
        }

    };

    handleRightClick = () => {
        // 点击右滑动，mainChartIdex 加一,
        const factLength = this.state.genre === "g3" ? this.state.animationFactList.length : this.state.factList.length
        const { genre } = this.state;
        if (genre === "g1") {
            this.setState((prevState) => ({ mainChartIndex1: (prevState.mainChartIndex1 + 1 + factLength) % factLength }), () => {
                this.props.onMainChartChange(this.state.mainChartIndex1);
            });
        } else if (genre === "g2") {
            this.setState((prevState) => ({ mainChartIndex2: (prevState.mainChartIndex2 + 1 + factLength) % factLength }), () => {
                this.props.onMainChartChange(this.state.mainChartIndex2);
            });
        } else if (genre === "g3") {
            this.setState((prevState) => ({ mainChartIndex3: (prevState.mainChartIndex3 + 1 + factLength) % factLength }), () => {
                this.props.onMainChartChange(this.state.mainChartIndex3);
            });
        }
    };

    //获取当前  mainChartIndex
    getMainChartIndex() {
        if (this.state.genre === "g1") {
            return this.state.mainChartIndex1
        } else if (this.state.genre === "g2") {
            return this.state.mainChartIndex2
        } else {
            return this.state.mainChartIndex3
        }
    }

    render() {
        const borderStyle = {
            margin: '12px 0 8px 0',
            width: 'calc(50% - 2px)', // Two items in a row
        };
        const cardStyle = {
            borderRadius: "4px",
            width: '40.5%', // Two items in a row
            height: `${this.state.cardHeight}px`,
            justifyContent: 'center',
            display: 'flex',
            overflow: "hidden",
            alignItems: 'center'
        }
        const cardDefaultBorderStyle = {
            border: "1.4px solid #DCDEE1",
        }
        const cardFocusBorderStyle = {
            border: "1.4px solid #4680FF",
        }

        return (
            <div style={{ height: "100%" }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', margin: '5% 5% 0 5%', height: '100%' }}>
                    <div className='genre-div'>
                        <div style={{ position: 'absolute', left: '-6%' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                                <path d="M0 0C2.20914 0 4 1.79086 4 4V16C4 18.2091 2.20914 20 0 20V0Z" fill="#4680FF" />
                            </svg>
                        </div>

                        <span style={{ color: "#585858", fontSize: "16px", fontFamily: "PingFang SC", fontWeight: "500" }}>Genre</span>

                        <div className='genre-btn-group-div'>
                            <Radio.Group size='small' value={this.state.genre} onChange={this.handleGenreChange}>
                                <Radio.Button value="g4">Storyline</Radio.Button>
                                <Radio.Button value="g1">Infographic</Radio.Button>
                                <Radio.Button value="g2">Scrollytelling</Radio.Button>
                                <Radio.Button value="g3">Video</Radio.Button>
                                
                            </Radio.Group>
                        </div>
                    </div>

                    <div className='template-div'>
                        <div style={{ position: 'absolute', left: '-6%' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="20" viewBox="0 0 4 20" fill="none">
                                <path d="M0 0C2.20914 0 4 1.79086 4 4V16C4 18.2091 2.20914 20 0 20V0Z" fill="#4680FF" />
                            </svg>
                        </div>
                        <span style={{ color: "#585858", fontSize: "16px", fontFamily: "PingFang SC", fontWeight: "500" }}>Template</span>
                        {this.state.genre !== "g4" &&
                            <div className='template-btn-group-div'>
                                <Radio.Group value={this.state.template} onChange={this.handleTemplateChange} style={{ display: 'flex', flexWrap: 'wrap', textAlign: "left" }}>
                                    <Radio value={"t1"} style={borderStyle}>Topic Picture
                                    </Radio>
                                    <Radio value={"t2"} style={borderStyle}>Main Chart</Radio>
                                    <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
                                        <div style={{ ...cardStyle, ...(this.state.template === "t1" ? cardFocusBorderStyle : cardDefaultBorderStyle) }}>
                                            {this.state.genre === "g1" &&
                                                <img
                                                    src={G1T1} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g2" &&
                                                <img
                                                    src={G2T1} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g3" &&
                                                <img
                                                    src={G3T1} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }

                                        </div>
                                        <div style={{ marginLeft: "15px", ...cardStyle, ...(this.state.template === "t2" ? cardFocusBorderStyle : cardDefaultBorderStyle) }}>
                                            {this.state.genre === "g1" &&
                                                <img
                                                    src={G1T2} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g2" &&
                                                <img
                                                    src={G2T2} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g3" &&
                                                <img
                                                    src={G3T2} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                        </div>
                                    </div>
                                    <Radio value={"t3"} style={borderStyle}>Four-Section</Radio>
                                    <Radio value={"t4"} style={borderStyle}>
                                        {this.state.genre === 'g1' && <div>Grid</div>}
                                        {this.state.genre === 'g2' && <div>Waterfall Flow</div>}
                                        {this.state.genre === 'g3' && <div>Slideshow</div>}
                                    </Radio>
                                    <div style={{ display: "flex", width: "100%", justifyContent: "flex-start", marginBottom: "10px" }}>
                                        <div style={{ ...cardStyle, ...(this.state.template === "t3" ? cardFocusBorderStyle : cardDefaultBorderStyle) }}>
                                            {this.state.genre === "g1" &&
                                                <img
                                                    src={G1T3} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g2" &&
                                                <img
                                                    src={G2T3} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g3" &&
                                                <img
                                                    src={G3T3} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }

                                        </div>
                                        <div style={{ marginLeft: "15px", ...cardStyle, ...(this.state.template === "t4" ? cardFocusBorderStyle : cardDefaultBorderStyle) }}>
                                            {this.state.genre === "g1" &&
                                                <img
                                                    src={G1T4} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g2" &&
                                                <img
                                                    src={G2T4} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                            {this.state.genre === "g3" &&
                                                <img
                                                    src={G3T4} logo='alt' style={{ width: '80%', height: '90%' }}
                                                ></img>
                                            }
                                        </div>
                                    </div>

                                </Radio.Group>
                            </div>}
                        {this.state.genre === "g4" &&
                            <div className='template-btn-group-div'>
                                <Radio.Group value={this.state.template} onChange={this.handleTemplateChange} style={{ display: 'flex', flexDirection:'column',lexWrap: 'wrap', textAlign: "left" }}>
                                    <Radio value={"t1"} style={borderStyle}>Topic Picture
                                    </Radio>
                                    <div style={{ ...cardStyle,width:'90%',height:'100px', ...(this.state.template === "t1" ? cardFocusBorderStyle : cardDefaultBorderStyle) }}>
                                    <img
                                        src={G4T1} logo='alt' style={{ width: '90%', height: '88%' }}
                                    ></img>
                                    </div>
                                </Radio.Group>
                            </div>}


                        <div className='custom-div'>
                            {
                                this.state.template === "t1" && this.state.genre !== 'g4' && <>
                                    <div className='divide-line-div'>
                                        <hr></hr>
                                    </div>
                                    <div className="main-chart-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: "#898B8F", height: "30px" }}>
                                        <div style={{ textAlign: 'left' }}>Set theme background</div>
                                    </div>
                                    <div className='upload-div'>
                                        <Upload
                                            // style={{ width: 200, height: 200 }}
                                            showUploadList={false}
                                            beforeUpload={this.beforeUpload}
                                            maxCount={1}
                                            onChange={this.handleFileChange} >

                                            {/* 展示背景图界面 */}
                                            {this.state.fileList1.length > 0 && this.state.genre === "g1" &&
                                                <div className='uploaded-thumbnail'>
                                                    <img
                                                        src={URL.createObjectURL(
                                                            this.state.fileList1[0].originFileObj
                                                        )}
                                                        alt='background'
                                                        style={{ height: '135px', maxWidth: "210px", objectFit: 'contain' }}
                                                    />
                                                    <Button className="replace-btn">Replace</Button>
                                                </div>
                                            }
                                            {this.state.fileList2.length > 0 && this.state.genre === "g2" &&
                                                <div className='uploaded-thumbnail'>
                                                    <img
                                                        src={URL.createObjectURL(
                                                            this.state.fileList2[0].originFileObj
                                                        )}
                                                        alt='background'
                                                        style={{ height: '135px', maxWidth: "210px", objectFit: 'contain' }}
                                                    />
                                                    <Button className="replace-btn ">Replace</Button>

                                                </div>
                                            }
                                            {this.state.fileList3.length > 0 && this.state.genre === "g3" &&
                                                <div className='uploaded-thumbnail'>
                                                    <img
                                                        src={URL.createObjectURL(
                                                            this.state.fileList3[0].originFileObj
                                                        )}
                                                        alt='background'
                                                        style={{ height: '135px', maxWidth: "210px", objectFit: 'contain' }}
                                                    />
                                                    <Button className="replace-btn-g3">Replace</Button>
                                                </div>
                                            }
                                            {/* 上传背景图界面 */}
                                            {this.state.fileList1.length === 0 && this.state.genre === "g1" &&
                                                <div className='upload-bg-btn'
                                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1.5px solid #D4D4D4", borderRadius: "4px", color: this.state.hoverGenre === true ? "blue" : "#D4D4D4" }}>
                                                    <Button type="text" icon={<PlusOutlined style={{ marginRight: "5px" }} />}> Upload background image</Button>
                                                </div>
                                            }
                                            {this.state.fileList2.length === 0 && this.state.genre === "g2" &&
                                                <div className='upload-bg-btn' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1.5px solid #D4D4D4", borderRadius: "4px" }}>
                                                    <Button type="text" icon={<PlusOutlined style={{ marginRight: "5px" }} />}> Upload background image</Button>

                                                </div>
                                            }
                                            {this.state.fileList3.length === 0 && this.state.genre === "g3" &&
                                                <div className='upload-bg-btn' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1.5px solid #D4D4D4", borderRadius: "4px" }}>
                                                    <Button type="text" icon={<PlusOutlined style={{ marginRight: "5px" }} />}> Upload background image</Button>
                                                </div>
                                            }

                                        </Upload>
                                    </div>
                                </>

                            }

                            {/* 选择主图 */}
                            {
                                this.state.template === "t2" && this.state.genre != 'g4' &&
                                <>
                                    <div className='divide-line-div'>
                                        <hr></hr>
                                    </div>
                                    <div className="main-chart-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: "#898B8F", height: "30px" }}>
                                        <div style={{ textAlign: 'left' }}>Set the Main Chart</div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                            <div onClick={this.handleLeftClick} style={{ cursor: 'pointer', marginRight: 5 }}>
                                                <CaretLeftOutlined style={{ fontSize: '25px' }} />
                                            </div>
                                            {this.state.genre === "g3" &&
                                                <div style={{ marginTop: '10px' }}>
                                                    <NatuSmallComponent
                                                        yourSpec={this.state.animationFactList[this.getMainChartIndex()]}
                                                        CardStyle={{ width: '200px', height: '200px', marginBottom: '12px' }}
                                                        Title={this.state.titleList[this.getMainChartIndex()]}
                                                        Intro={this.state.captionList[this.getMainChartIndex()]}
                                                        Index={this.getMainChartIndex() + 1} name={'main_chart'}
                                                        IndexStyle={{
                                                            width: '60px',
                                                            height: '24px'
                                                        }}
                                                        Bluestyle={{ borderRadius: '0px 20px 20px 20px' }}
                                                        NarboxStyle={{ borderRadius: '0px 20px 20px 20px' }}
                                                    />
                                                </div>}
                                            {this.state.genre !== "g3" &&
                                                <div style={{ marginTop: '10px' }}>
                                                    <NatuSmallComponent
                                                        yourSpec={this.state.factList[this.getMainChartIndex()]}
                                                        CardStyle={{ width: '200px', height: '200px', marginBottom: '12px' }}
                                                        Title={this.state.titleList[this.getMainChartIndex()]}
                                                        Intro={this.state.captionList[this.getMainChartIndex()]}
                                                        Index={this.getMainChartIndex() + 1} name={'main_chart'}
                                                        IndexStyle={{
                                                            width: '60px',
                                                            height: '24px'
                                                        }}
                                                        FactStyle={{ fontSize: '12px' }}
                                                        IntroStyle={{ fontSize: '12px' }}
                                                        Bluestyle={{ borderRadius: '0px 20px 20px 20px' }}
                                                        NarboxStyle={{ borderRadius: '0px 20px 20px 20px' }}
                                                    />
                                                </div>}
                                            <div onClick={this.handleRightClick} style={{ cursor: 'pointer', marginLeft: 5 }}>
                                                <CaretRightOutlined style={{ fontSize: '25px' }} />
                                            </div>
                                        </div>
                                    </div>

                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}