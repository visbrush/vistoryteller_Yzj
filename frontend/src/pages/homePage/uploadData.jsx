import React, { useEffect, useState } from "react";
import { Steps, message, Upload, Button, Row, Col } from 'antd';
import { FileOutlined, CloseOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './uploadData.css'
const { Dragger } = Upload;
const UploadData = () => {

    function handleRemove(file) {
        console.log(1111)
        const updatedFileList = csvFileList.filter((item) => item !== file);
        setCsvFileList(updatedFileList);
    }

    //csv文件列表
    const [csvFileList, setCsvFileList] = useState([]);
    useEffect(() => { }, [csvFileList])

    //txt文件列表
    const [txtFile, setTxtFile] = useState([]);
    useEffect(() => { }, [txtFile])

    //当前是上传csv还是txt
    const [tmpStep, setTmpStep] = useState(0);
    useEffect(() => { }, [tmpStep])

    const csvUploadProps = {
        name: 'file',
        multiple: true, // 支持多文件上传
        onRemove: (file) => {
            this.setState((state) => {
                const index = state.fileList.indexOf(file)
                const newFileList = state.fileList.slice()
                newFileList.splice(index, 1)
                return {
                    fileList: newFileList
                }
            })
        },
        //只能上传csv
        beforeUpload: (file) => {
            const { name } = file
            const fileExtension = name.substring(name.lastIndexOf('.') + 1)
            //截取文件格式
            if (fileExtension !== 'csv') {
                message.info('File format error!')
                return false
            }
            // 使用回调形式来更新 fileList
            setCsvFileList((prevFileList) => {
                return [...prevFileList, file]
            });
            return false; // 返回 false 防止自动上传

        },
    };

    const txtUploadProps = {
        name: 'file',
        onRemove: (file) => {
            this.setState((state) => {
                const index = state.fileList.indexOf(file)
                const newFileList = state.fileList.slice()
                newFileList.splice(index, 1)
                return {
                    fileList: newFileList
                }
            })
        },
        //只能上传csv
        beforeUpload: (file) => {
            const { name } = file
            const fileExtension = name.substring(name.lastIndexOf('.') + 1)
            //截取文件格式
            if (fileExtension !== 'txt') {
                message.info('File format error!')
                return false
            }

            setTxtFile([file]);

            return false; // 返回 false 防止自动上传

        },
    };

    //点击生成按钮
    const navigate = useNavigate();
    const generateBtnClick = () => {
        navigate('/preview/csv', { state: { csvFileList: csvFileList, txtFile: txtFile } });
    };
    const titleDiv = {
        display: "flex", // 使用 Flexbox 布局
        alignItems: "center", // 垂直居中
        justifyContent: "flex-start", // 左对齐
        color: "black",
        fontSize: "20px",
        fontWeight: "bolder",
        height: "40px",
        marginTop: "20px",
        paddingInline: "100px"
    }
    const descriptionDiv = {
        marginLeft: "10px",
    }
    const stepsDiv = {
        display: "flex", // 使用 Flexbox 布局
        justifyContent: "center", // 将内容水平居中
        textAlign: "center",
        alignItems: "center",
        height: "60px",
        marginTop: "10px",
    }
    const stepsBorderDiv = {
        border: "1px solid #3E7AFF", // 设置2像素宽度的蓝色边框
        borderRadius: "8px", // 设置圆角的大小
        height: "50px", // 设置高度
        padding: "0px 100px",
        width: "65%",
        display: "flex", // 使用 Flexbox 布局
        alignItems: "center",

    }
    const uploadDiv = {
        display: "flex", // 使用 Flexbox 布局
        alignItems: "center", // 垂直居中
        justifyContent: "center", // 左对齐
        height: "300px",
        marginTop: "20px",
        paddingInline: "90px",
    }
    const draggerWrapper = {
        height: "100%",
        width: "100%",
    };
    const uploadBorderDiv = csvFileList.length === 0 ? {
        height: '100%',
        width: '100%',
        borderRadius: "5px", // 设置圆角的大小
        border: "3px dashed #4680FF", // 设置2像素宽度的蓝色边框
        backgroundColor: "#F0F6FF",
    } : {
        height: '100%',
        width: '100%',
        borderRadius: "5px", // 设置圆角的大小
        border: "3px dashed #4680FF", // 设置2像素宽度的蓝色边框
    }
    const uploadBtn = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "300px",
        height: "40px",
        fontSize: "15px",
        margin: "20px 0 4px 0"
    }
    const fileListDiv = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        maxHeight: "200px",
        overflowY: "auto",
        paddingLeft: "15px",
        marginTop: "15px",
        justifyContent: "flex-start", // 左对齐
        color: "black",
    }
    // 每个文件的样式
    const fileItemStyle = {
        display: 'flex',
        alignItems: 'center', // 垂直居中
        justifyContent: 'space-between', // 元素之间均匀分布
        margin: '4px',
        padding: '0 16px',
        height: "50px",
        backgroundColor: '#F5F5F5',
        borderRadius: "4px"
    };

    //文件后的删除按钮
    const deleteBtn = {
        fontSize: "16px",
        fontWeight: "bolder",
        color: "A0A0A0"
    }
    const nextBtn = {
        width: "150px",
        height: "40px",
        fontSize: "15px",
        marginRight: "20px",
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
        display: 'inline-block',

    }
    const generateBtn = {
        width: "200px",
        height: "35px",
        fontSize: "15px",
        marginTop: "50px",
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
        backgroundColor: "#4680FF"
    }
    const nextBtnDiv = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        marginTop: "20px",
        paddingLeft: "20px",
        color: "#898B8F"

    }
    //text文件div
    const textFileDiv = {
        height: "100%",
        width: "100%",
        display: 'flex',
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
        flexDirection: 'column', // 垂直排列
    }
    const textFileInnerDiv = {
        display: 'flex',
        alignItems: 'center', // 垂直居中
        justifyContent: 'center', // 水平居中
        flexDirection: 'column', // 垂直排列
        paddingTop: '20px',
        height: "150px",
        width: "450px",
        backgroundColor: '#F5F5F5',
        color: "black"
    }
    return (
        <div>
            <div style={titleDiv}>
                <svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_2766_2078)">
                        <circle cx="12.5" cy="12.5" r="9.5" fill="url(#paint0_linear_2766_2078)" />
                    </g>
                    <circle cx="21.5" cy="12.5" r="9.5" fill="url(#paint1_linear_2766_2078)" />
                    <defs>
                        <filter id="filter0_f_2766_2078" x="0" y="0" width="25" height="25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                            <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_2766_2078" />
                        </filter>
                        <linearGradient id="paint0_linear_2766_2078" x1="9" y1="20.5" x2="19" y2="6" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3E7AFF" />
                            <stop offset="1" stop-color="#7DD0FF" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_2766_2078" x1="18" y1="20.5" x2="28" y2="6" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3E7AFF" />
                            <stop offset="1" stop-color="#7DD0FF" />
                        </linearGradient>
                    </defs>
                </svg>
                <div style={descriptionDiv}>Upload your data for generation</div>
            </div>
            <div style={stepsDiv}>
                <div style={stepsBorderDiv}>
                    <Steps
                        size="small"
                        current={tmpStep}
                        items={[
                            {
                                title: 'Upload CSV files',
                            },
                            {
                                title: 'Upload Ontology Model',
                            }
                        ]}
                    />
                </div>

            </div>
            <div style={uploadDiv}>
                <div style={draggerWrapper}>
                    <div style={uploadBorderDiv}>
                        {/* 上传csv文件 */}
                        {tmpStep === 0 && <>
                            {
                                csvFileList.length === 0 && (<>
                                    <Dragger {...csvUploadProps} showUploadList={false}>
                                        <img src={require("../../assets/pagePics/images/csvIcon.png")} alt="csvIcon" ></img>
                                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', }}><Button type="primary" style={uploadBtn}>
                                            <div style={{ marginRight: "10px" }}>
                                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2260_8779)">
                                                        <path d="M13.1328 14.001H1.86719C1.50459 14.001 1.15684 13.857 0.90044 13.6006C0.644043 13.3442 0.5 12.9965 0.5 12.6339V8.72369C0.5 8.57865 0.557617 8.43955 0.660176 8.337C0.762735 8.23444 0.901835 8.17682 1.04688 8.17682C1.19192 8.17682 1.33102 8.23444 1.43357 8.337C1.53613 8.43955 1.59375 8.57865 1.59375 8.72369V12.6339C1.59375 12.7064 1.62256 12.7759 1.67384 12.8272C1.72512 12.8785 1.79467 12.9073 1.86719 12.9073H13.1328C13.2053 12.9073 13.2749 12.8785 13.3262 12.8272C13.3774 12.7759 13.4062 12.7064 13.4062 12.6339V8.72369C13.4062 8.57865 13.4639 8.43955 13.5664 8.337C13.669 8.23444 13.8081 8.17682 13.9531 8.17682C14.0982 8.17682 14.2373 8.23444 14.3398 8.337C14.4424 8.43955 14.5 8.57865 14.5 8.72369V12.6339C14.5 12.9965 14.356 13.3442 14.0996 13.6006C13.8432 13.857 13.4954 14.001 13.1328 14.001ZM11.2188 4.81354C11.0745 4.81148 10.9369 4.75252 10.8359 4.64948L7.5 1.32721L4.16406 4.64948C4.06072 4.75282 3.92056 4.81087 3.77441 4.81087C3.62827 4.81087 3.48811 4.75282 3.38477 4.64948C3.28142 4.54613 3.22337 4.40597 3.22337 4.25983C3.22337 4.11368 3.28142 3.97352 3.38477 3.87018L7.11719 0.165101C7.16807 0.11343 7.22873 0.0723954 7.29562 0.0443864C7.36252 0.0163774 7.43431 0.00195312 7.50684 0.00195312C7.57936 0.00195312 7.65115 0.0163774 7.71805 0.0443864C7.78494 0.0723954 7.8456 0.11343 7.89648 0.165101L11.6016 3.88385C11.6765 3.96029 11.7274 4.05704 11.7478 4.16211C11.7683 4.26718 11.7575 4.37596 11.7168 4.47494C11.676 4.57393 11.6071 4.65877 11.5186 4.71896C11.43 4.77915 11.3258 4.81204 11.2188 4.81354Z" fill="white" />
                                                        <path d="M7.5 10.7744C7.42818 10.7744 7.35707 10.7603 7.29072 10.7328C7.22437 10.7053 7.16408 10.665 7.1133 10.6142C7.06252 10.5635 7.02224 10.5032 6.99475 10.4368C6.96727 10.3705 6.95312 10.2994 6.95312 10.2275V0.780273C6.95312 0.635233 7.01074 0.496133 7.1133 0.393574C7.21586 0.291015 7.35496 0.233398 7.5 0.233398C7.64504 0.233398 7.78414 0.291015 7.8867 0.393574C7.98926 0.496133 8.04688 0.635233 8.04688 0.780273V10.2275C8.04688 10.2994 8.03273 10.3705 8.00525 10.4368C7.97776 10.5032 7.93748 10.5635 7.8867 10.6142C7.83592 10.665 7.77563 10.7053 7.70928 10.7328C7.64293 10.7603 7.57182 10.7744 7.5 10.7744Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2260_8779">
                                                            <rect width="14" height="14" fill="white" transform="translate(0.5 0.000976562)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="upload-btn">
                                                Upload file
                                            </div>
                                        </Button>
                                        </div>
                                        <div>or drag csv files here</div>
                                    </Dragger>
                                </>
                                )
                            }
                            <div style={{ height: "200px" }}>
                                <div style={fileListDiv}>
                                    {csvFileList.map((file) => (
                                        <div key={file.uid} style={{ flexBasis: `calc(25% - 5px)` }}>
                                            <Row style={fileItemStyle} >
                                                <Col>
                                                    <FileOutlined />
                                                </Col>
                                                <Col flex="auto">
                                                    <p style={{ textAlign: "left", marginLeft: "10px" }}>{file.name}</p>
                                                </Col>
                                                <Col>
                                                    <Button onClick={() => handleRemove(file)}
                                                        size="small"
                                                        type="text"
                                                        icon={<CloseOutlined />}
                                                        style={{ deleteBtn }} />
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {
                                csvFileList.length !== 0 && (
                                    <div style={nextBtnDiv}>
                                        <span>Uploaded {csvFileList.length} files</span>
                                        <div>
                                            <Upload {...csvUploadProps} showUploadList={false}>
                                                <Button style={nextBtn}>Upload more files</Button>
                                            </Upload>
                                            <Button type="primary"
                                                style={nextBtn}
                                                className="next-btn"
                                                onClick={() => setTmpStep(1)}>
                                                <span style={{ marginLeft: "10px" }} className="next-btn">Next</span>
                                                <ArrowRightOutlined style={{ fontSize: "12px", fontWeight: "bolder" }} />
                                            </Button>
                                        </div>

                                    </div>
                                )
                            }
                        </>}

                        {/* 上传txt文件 */}
                        {tmpStep === 1 && <>
                            {
                                txtFile.length === 0 && (<>
                                    <Dragger {...txtUploadProps} showUploadList={false}>
                                        <img src={require("../../assets/pagePics/images/textIcon.png")} alt="txtIcon" ></img>
                                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', }}><Button type="primary" style={uploadBtn}>
                                            <div style={{ marginRight: "10px" }}>
                                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2260_8779)">
                                                        <path d="M13.1328 14.001H1.86719C1.50459 14.001 1.15684 13.857 0.90044 13.6006C0.644043 13.3442 0.5 12.9965 0.5 12.6339V8.72369C0.5 8.57865 0.557617 8.43955 0.660176 8.337C0.762735 8.23444 0.901835 8.17682 1.04688 8.17682C1.19192 8.17682 1.33102 8.23444 1.43357 8.337C1.53613 8.43955 1.59375 8.57865 1.59375 8.72369V12.6339C1.59375 12.7064 1.62256 12.7759 1.67384 12.8272C1.72512 12.8785 1.79467 12.9073 1.86719 12.9073H13.1328C13.2053 12.9073 13.2749 12.8785 13.3262 12.8272C13.3774 12.7759 13.4062 12.7064 13.4062 12.6339V8.72369C13.4062 8.57865 13.4639 8.43955 13.5664 8.337C13.669 8.23444 13.8081 8.17682 13.9531 8.17682C14.0982 8.17682 14.2373 8.23444 14.3398 8.337C14.4424 8.43955 14.5 8.57865 14.5 8.72369V12.6339C14.5 12.9965 14.356 13.3442 14.0996 13.6006C13.8432 13.857 13.4954 14.001 13.1328 14.001ZM11.2188 4.81354C11.0745 4.81148 10.9369 4.75252 10.8359 4.64948L7.5 1.32721L4.16406 4.64948C4.06072 4.75282 3.92056 4.81087 3.77441 4.81087C3.62827 4.81087 3.48811 4.75282 3.38477 4.64948C3.28142 4.54613 3.22337 4.40597 3.22337 4.25983C3.22337 4.11368 3.28142 3.97352 3.38477 3.87018L7.11719 0.165101C7.16807 0.11343 7.22873 0.0723954 7.29562 0.0443864C7.36252 0.0163774 7.43431 0.00195312 7.50684 0.00195312C7.57936 0.00195312 7.65115 0.0163774 7.71805 0.0443864C7.78494 0.0723954 7.8456 0.11343 7.89648 0.165101L11.6016 3.88385C11.6765 3.96029 11.7274 4.05704 11.7478 4.16211C11.7683 4.26718 11.7575 4.37596 11.7168 4.47494C11.676 4.57393 11.6071 4.65877 11.5186 4.71896C11.43 4.77915 11.3258 4.81204 11.2188 4.81354Z" fill="white" />
                                                        <path d="M7.5 10.7744C7.42818 10.7744 7.35707 10.7603 7.29072 10.7328C7.22437 10.7053 7.16408 10.665 7.1133 10.6142C7.06252 10.5635 7.02224 10.5032 6.99475 10.4368C6.96727 10.3705 6.95312 10.2994 6.95312 10.2275V0.780273C6.95312 0.635233 7.01074 0.496133 7.1133 0.393574C7.21586 0.291015 7.35496 0.233398 7.5 0.233398C7.64504 0.233398 7.78414 0.291015 7.8867 0.393574C7.98926 0.496133 8.04688 0.635233 8.04688 0.780273V10.2275C8.04688 10.2994 8.03273 10.3705 8.00525 10.4368C7.97776 10.5032 7.93748 10.5635 7.8867 10.6142C7.83592 10.665 7.77563 10.7053 7.70928 10.7328C7.64293 10.7603 7.57182 10.7744 7.5 10.7744Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2260_8779">
                                                            <rect width="14" height="14" fill="white" transform="translate(0.5 0.000976562)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="upload-btn">
                                                Upload file
                                            </div>
                                        </Button>
                                        </div>
                                        <div>or drag a txt file here</div>
                                    </Dragger>
                                </>
                                )
                            }
                            {
                                txtFile.length > 0 && (<>
                                    <div style={textFileDiv}>
                                        <div style={textFileInnerDiv} key={txtFile[0].uid} >
                                            <img src={require("../../assets/pagePics/images/textIconDark.png")} alt="txtIconDark" ></img>
                                            <div style={{ marginTop: "5px" }} >{txtFile[0].name}</div>
                                            <Upload {...txtUploadProps} showUploadList={false}>
                                                <Button style={{ color: "#4680FF", marginTop: "10px" }} type="text">Replace</Button>
                                            </Upload>
                                        </div>
                                        <Button type="primary" style={generateBtn} onClick={generateBtnClick} >
                                            <span style={{ marginLeft: "10px" }} className="next-btn">Next</span>
                                            <ArrowRightOutlined style={{ fontSize: "12px", fontWeight: "bolder" }} />
                                        </Button>

                                    </div>
                                </>
                                )
                            }

                        </>}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UploadData;
