// csv文件预览界面
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Space, Input, Menu, Table, Pagination, message, Button, Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import "./previewCSV.css"
import config from "../../../axios/config";
import * as api from '../../../axios/api'
import axios from 'axios';
import OperationType from "../../../constant/OperationType";

const { Content } = Layout;
const PreviewCSV = (props) => {
    // 处理传递过来的文件列表
    const location = useLocation();
    const { csvFileList, txtFile } = location.state;

    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [current, setCurrent] = useState(csvFileList.length > 0 ? csvFileList[0].name : '');
    const [totalDataSource, setTotalDataSource] = useState([]);//所有的数据
    const [dataSource, setDataSource] = useState([]);//分页后的数据
    const [columns, setColumns] = useState([]);
    const [isFocused, setIsFocused] = useState(false);//书否在输入keypoint
    const inputRef = useRef(null);
    const defaultCurve = [
        [-1, 0, 0.5, 1],
        [1, 0.5, 0, -1],
        [1, -1, 1]
    ]

    const initData = async (file) => {
        var fileContent;
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                fileContent = e.target.result;
                await parseCSV(fileContent);
            };
            reader.readAsText(file);
        }
    };
    const parseCSV = async (csv) => {
        const lines = csv.split('\n');
        const headers = lines[0].replace(/\r$/, '').split(',');
        const cols = headers.map(key => ({
            title: key,
            dataIndex: key,
            key: key,
            width: 200
        }));
        setColumns(cols);
        console.log(cols)
        const result = [];
        //数据较多时只展示前50条
        let showedLength = lines.length - 1;
        if (lines.length > 51) {
            showedLength = 51
        }
        for (let i = 1; i < showedLength; i++) {
            const currentLine = lines[i].replace(/\r$/, '').split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentLine[j].trim().replace(/"/g, '');
            }
            result.push(obj);
        }
        setTotalDataSource(result);
        setDataSource(result)
    };

    //自定义分页器改变页码分割表格数据
    const changePage = (page) => {
        setCurrentPage(page);
        // Fetch and update data for the selected page
        const startIdx = (page - 1) * 10;
        const endIdx = startIdx + 10;
        const newData = totalDataSource.slice(startIdx, endIdx);
        setDataSource(newData);
    }

    //改变展示的表格
    const changeMenu = (e) => {
        setCurrent(e.key);
        const file = csvFileList.find(file => file.name === e.key)
        initData(file)
    }

    //判断是否在输入key point
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };


    //点击suffix
    const navigate = useNavigate();
    const generateSuffixClick = async () => {
        setIsFocused(true)
        const { updateUserOperation } = props
        const inputElement = inputRef.current && inputRef.current.input;   // 获取原生的 input 元素
        var keyPoint = ""
        if (inputElement) {
            keyPoint = inputElement.value;  // 获取输入值
        }
        if (keyPoint === "") {
            message.error('Please enter keywords before generating !');
            return
        }
        updateUserOperation(OperationType.GENERATING)

        // console.log('inputElement', inputElement)
        // 构造 FormData 对象，用于上传文件
        let formData = new FormData();
        console.log("txtFile", txtFile)
        console.log("csvfiles", csvFileList)
        // formData.append("txt", txtFile);
        formData.append(`txt`, txtFile[0]);
        // 遍历文件数组并添加到 FormData
        csvFileList.forEach((file, index) => {
            formData.append(`csv`, file); // 使用不同的键名为每个文件
        });

        console.log('upload')
        //发送文件上传请求
        try {
            // 先调用上传文件的接口
            const uploadResponse = await api.uploadFile(formData);

            if (uploadResponse) {
                let csv_file_paths = uploadResponse['csv_file_paths']
                let txt_file_path = uploadResponse['txt_file_path']
                let upload_uuid = uploadResponse['uuid']
                // const randomCurveIndex = Math.floor(Math.random() * 3)
                const randomCurveIndex = 0
                let outline_curve = defaultCurve[randomCurveIndex]
                const { setFilePath } = props
                setFilePath(csv_file_paths, txt_file_path)

                console.log('uploadResponse', uploadResponse, 'csv_file_paths', csv_file_paths, 'txt_file_path', txt_file_path)
                //调用生成故事的接口
                const generateResponse = await api.generate(csv_file_paths, txt_file_path, keyPoint, upload_uuid, outline_curve);

                if (generateResponse) {
                    console.log(props)
                    const { generateStory } = props
                    console.log('Generated data:', generateResponse.data)

                    const factList = generateResponse.data["factList"]
                    const captionList = generateResponse.data["captionList"]
                    const originFactList = generateResponse.data["originFactList"]
                    const schema = generateResponse.data["schema"]
                    const animationFactList = generateResponse.data["animationFactList"]
                    let infoTitle = generateResponse.data["infoTitle"]
                    const questionList = generateResponse.data["questionList"]
                    const uniqueResult = generateResponse.data["uniqueResult"]
                    console.log('uniqueResult', uniqueResult)
                    const explanation = generateResponse.data["explanation"]
                    const conversation = generateResponse.data["conversation"]
                    console.log('explanation ', explanation)
                    console.log('conversation ', conversation)
                    //console.log('animationFactList',animationFactList)
                    // 将转义的双引号替换为普通的双引号
                    const correctedArray = factList.map(item => item.replace(/\\"/g, '"'));
                    const correctedAniArray = animationFactList.map(item => item.replace(/\\"/g, '"'));
                    // 解析 JSON 字符串为 JSON 对象数组
                    const jsonArray = correctedArray.map(item => JSON.parse(item));
                    const jsonAniArray = correctedAniArray.map(item => JSON.parse(item));

                    navigate('/edit');
                    generateStory(jsonArray, captionList, originFactList, keyPoint, infoTitle, schema, jsonAniArray, questionList, uniqueResult, outline_curve, explanation, conversation)
                    
                    console.log('explanation ', explanation)
                    updateUserOperation(OperationType.GENERATED)
                    
                    console.log('explanation ', explanation)

                } else {
                    updateUserOperation(OperationType.GENERATE_FAILED)
                    console.error('Generate failed');
                    message.error('Generate failed!')

                }
            } else {
                updateUserOperation(OperationType.GENERATE_FAILED)
                console.error('Upload failed');
                message.error('Generate failed!')
            }
        } catch (error) {
            updateUserOperation(OperationType.GENERATE_FAILED)
            console.error('Error:', error);
            message.error('Generate failed!')
        }
        //navigate('/edit');
        //generate接口
    };

    //useEffect
    useEffect(() => {
        initData(csvFileList.length > 0 ? csvFileList[0] : '');
    }, [csvFileList]);

    useEffect(() => {
        console.log(current)
    }, [current, totalDataSource, columns]); // Add dependencies to the useEffect


    useEffect(() => {
    }, [currentPage, isFocused]);



    const contentStyle = {
        textAlign: 'center',
        height: "680px",
        color: '#fff',
        backgroundColor: 'white',
        paddingInline: "100px"
    };

    const tableDiv = {
        marginTop: '20px',
        height: '487px',
        border: '1px solid #DCDEE1',
        borderRadius: "10px"
    }

    const inputDiv = {
        border: `2px solid #C6DDFF`,
        marginTop: '30px',
        height: '50px',
        width: '80%',
        borderRadius: "10px"
    }
    const paginationDiv = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "0 10px",
        alignItems: 'center',
    }

    const { operateState } = props;
    return (
        <div style={{ position: 'relative' }}>
            {operateState === OperationType.GENERATING ? (
                // 如果 operateState 是 'Generating'，显示 Spin 组件
                <div className="generatingInfo" style={{ position: 'absolute', top: '55px', zIndex: 5 }}>
                    <Space size={8}>
                        <Spin size="small"></Spin>
                        <span>{'Generating, please wait a moment...'}</span>
                    </Space>
                </div>
            ) : null}

            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}
                size={[0, 48]}
            >
                <Layout>
                    <Content style={contentStyle}>
                        <Menu
                            mode="horizontal"
                            selectedKeys={[current]}
                            onClick={changeMenu}
                            items={[...csvFileList].map((file) => ({
                                key: file.name,
                                label: file.name
                            }))}
                        />
                        <div className='table-div' style={tableDiv}>
                            <div style={{ height: "450px" }}>
                                <Table dataSource={dataSource} columns={columns}
                                    size="small"
                                    bordered
                                    pagination={{
                                        position: ['none'],
                                    }}
                                    scroll={{
                                        y: 380,
                                    }}
                                />
                            </div>

                            <div style={paginationDiv}>
                                <div style={{ color: "#898B8F", display: "flex", alignItems: "center" }}>Total &nbsp;
                                    <div style={{ fontWeight: "bold", color: "black" }}>{totalDataSource.length}</div>
                                    <div style={{ marginLeft: "20px" }}></div>
                                    {totalDataSource.length >= 50 && <div>Only the first 50 data items are displayed</div>}
                                </div>
                                <Pagination
                                    total={totalDataSource.length}
                                    pageSize={10} // 你的每页显示的数据数量
                                    current={currentPage}
                                    onChange={(page) => {
                                        changePage(page)
                                    }}
                                    size="small"

                                />
                            </div>
                        </div>
                        <div>
                            <Input size="large"
                                ref={inputRef}
                                style={inputDiv}
                                placeholder="Enter theme"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                suffix={isFocused ?

                                    <div style={{ zIndex: '5', marginTop: "6px" }} onMouseDown={(e) => e.preventDefault()} onMouseUp={() => generateSuffixClick()}>
                                        <svg width="132" height="40" viewBox="0 0 132 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="132" height="40" rx="8" fill="url(#paint0_linear_2824_3512)" />
                                            <path d="M31.567 13.0625L19.875 23.7802V28.1456C19.875 28.6872 20.5894 28.9586 21.0073 28.5755L23.0566 26.6969L31.567 13.0625Z" fill="#C6DDFF" />
                                            <path d="M19.8757 23.7806L25.8621 29.2683C26.5593 29.9075 27.7467 29.6506 28.0586 28.7931L34.4648 11.1764C34.6375 10.7011 34.1444 10.2489 33.6257 10.4072L14.4077 16.2795C13.4721 16.5655 13.1918 17.6539 13.8893 18.2931L17.9179 21.986L31.5679 13.0629L19.8757 23.7806Z" fill="white" />
                                            <path d="M50.736 26.16C49.8613 26.16 49.056 26.0213 48.32 25.744C47.5947 25.456 46.96 25.056 46.416 24.544C45.872 24.0213 45.4507 23.408 45.152 22.704C44.8533 22 44.704 21.232 44.704 20.4C44.704 19.568 44.8533 18.8 45.152 18.096C45.4507 17.392 45.872 16.784 46.416 16.272C46.9707 15.7493 47.616 15.3493 48.352 15.072C49.088 14.784 49.8933 14.64 50.768 14.64C51.7173 14.64 52.5707 14.7947 53.328 15.104C54.096 15.4133 54.7413 15.8667 55.264 16.464L53.952 17.744C53.5147 17.3067 53.04 16.9867 52.528 16.784C52.0267 16.5707 51.472 16.464 50.864 16.464C50.2773 16.464 49.7333 16.56 49.232 16.752C48.7307 16.944 48.2987 17.216 47.936 17.568C47.5733 17.92 47.2907 18.336 47.088 18.816C46.896 19.296 46.8 19.824 46.8 20.4C46.8 20.9653 46.896 21.488 47.088 21.968C47.2907 22.448 47.5733 22.8693 47.936 23.232C48.2987 23.584 48.7253 23.856 49.216 24.048C49.7067 24.24 50.2507 24.336 50.848 24.336C51.4027 24.336 51.936 24.2507 52.448 24.08C52.9707 23.8987 53.4667 23.6 53.936 23.184L55.12 24.736C54.5333 25.2053 53.8507 25.5627 53.072 25.808C52.304 26.0427 51.5253 26.16 50.736 26.16ZM53.152 24.464V20.272H55.12V24.736L53.152 24.464ZM61.6874 26.112C60.738 26.112 59.906 25.9253 59.1914 25.552C58.4874 25.168 57.938 24.6453 57.5434 23.984C57.1594 23.3227 56.9674 22.5707 56.9674 21.728C56.9674 20.8747 57.154 20.1227 57.5274 19.472C57.9114 18.8107 58.434 18.2933 59.0954 17.92C59.7674 17.5467 60.53 17.36 61.3834 17.36C62.2154 17.36 62.9567 17.5413 63.6074 17.904C64.258 18.2667 64.77 18.7787 65.1434 19.44C65.5167 20.1013 65.7034 20.88 65.7034 21.776C65.7034 21.8613 65.698 21.9573 65.6874 22.064C65.6874 22.1707 65.682 22.272 65.6714 22.368H58.5514V21.04H64.6154L63.8314 21.456C63.842 20.9653 63.7407 20.5333 63.5274 20.16C63.314 19.7867 63.0207 19.4933 62.6474 19.28C62.2847 19.0667 61.8634 18.96 61.3834 18.96C60.8927 18.96 60.4607 19.0667 60.0874 19.28C59.7247 19.4933 59.4367 19.792 59.2234 20.176C59.0207 20.5493 58.9194 20.992 58.9194 21.504V21.824C58.9194 22.336 59.0367 22.7893 59.2714 23.184C59.506 23.5787 59.8367 23.8827 60.2634 24.096C60.69 24.3093 61.1807 24.416 61.7354 24.416C62.2154 24.416 62.6474 24.3413 63.0314 24.192C63.4154 24.0427 63.7567 23.808 64.0554 23.488L65.1274 24.72C64.7434 25.168 64.258 25.5147 63.6714 25.76C63.0954 25.9947 62.434 26.112 61.6874 26.112ZM72.4725 17.36C73.1552 17.36 73.7632 17.4933 74.2965 17.76C74.8405 18.0267 75.2672 18.4373 75.5765 18.992C75.8858 19.536 76.0405 20.24 76.0405 21.104V26H74.0405V21.36C74.0405 20.6027 73.8592 20.0373 73.4965 19.664C73.1445 19.2907 72.6485 19.104 72.0085 19.104C71.5392 19.104 71.1232 19.2 70.7605 19.392C70.3978 19.584 70.1152 19.872 69.9125 20.256C69.7205 20.6293 69.6245 21.104 69.6245 21.68V26H67.6245V17.456H69.5285V19.76L69.1925 19.056C69.4912 18.512 69.9232 18.096 70.4885 17.808C71.0645 17.5093 71.7258 17.36 72.4725 17.36ZM82.6093 26.112C81.6599 26.112 80.8279 25.9253 80.1133 25.552C79.4093 25.168 78.8599 24.6453 78.4653 23.984C78.0813 23.3227 77.8893 22.5707 77.8893 21.728C77.8893 20.8747 78.0759 20.1227 78.4493 19.472C78.8333 18.8107 79.3559 18.2933 80.0173 17.92C80.6893 17.5467 81.4519 17.36 82.3053 17.36C83.1373 17.36 83.8786 17.5413 84.5293 17.904C85.1799 18.2667 85.6919 18.7787 86.0653 19.44C86.4386 20.1013 86.6253 20.88 86.6253 21.776C86.6253 21.8613 86.6199 21.9573 86.6093 22.064C86.6093 22.1707 86.6039 22.272 86.5933 22.368H79.4733V21.04H85.5373L84.7533 21.456C84.7639 20.9653 84.6626 20.5333 84.4493 20.16C84.2359 19.7867 83.9426 19.4933 83.5693 19.28C83.2066 19.0667 82.7853 18.96 82.3053 18.96C81.8146 18.96 81.3826 19.0667 81.0093 19.28C80.6466 19.4933 80.3586 19.792 80.1453 20.176C79.9426 20.5493 79.8413 20.992 79.8413 21.504V21.824C79.8413 22.336 79.9586 22.7893 80.1933 23.184C80.4279 23.5787 80.7586 23.8827 81.1853 24.096C81.6119 24.3093 82.1026 24.416 82.6573 24.416C83.1373 24.416 83.5693 24.3413 83.9533 24.192C84.3373 24.0427 84.6786 23.808 84.9773 23.488L86.0493 24.72C85.6653 25.168 85.1799 25.5147 84.5933 25.76C84.0173 25.9947 83.3559 26.112 82.6093 26.112ZM88.5464 26V17.456H90.4504V19.808L90.2264 19.12C90.4824 18.544 90.8824 18.1067 91.4264 17.808C91.981 17.5093 92.669 17.36 93.4904 17.36V19.264C93.405 19.2427 93.325 19.232 93.2504 19.232C93.1757 19.2213 93.101 19.216 93.0264 19.216C92.269 19.216 91.6664 19.44 91.2184 19.888C90.7704 20.3253 90.5464 20.9813 90.5464 21.856V26H88.5464ZM99.8416 26V24.272L99.7296 23.904V20.88C99.7296 20.2933 99.5536 19.84 99.2016 19.52C98.8496 19.1893 98.3163 19.024 97.6016 19.024C97.1216 19.024 96.647 19.0987 96.1776 19.248C95.719 19.3973 95.3296 19.6053 95.0096 19.872L94.2256 18.416C94.6843 18.064 95.2283 17.8027 95.8576 17.632C96.4976 17.4507 97.159 17.36 97.8416 17.36C99.079 17.36 100.034 17.6587 100.706 18.256C101.388 18.8427 101.73 19.7547 101.73 20.992V26H99.8416ZM97.1536 26.112C96.5136 26.112 95.9536 26.0053 95.4736 25.792C94.9936 25.568 94.6203 25.264 94.3536 24.88C94.0976 24.4853 93.9696 24.0427 93.9696 23.552C93.9696 23.072 94.0816 22.64 94.3056 22.256C94.5403 21.872 94.919 21.568 95.4416 21.344C95.9643 21.12 96.6576 21.008 97.5216 21.008H100.002V22.336H97.6656C96.983 22.336 96.5243 22.448 96.2896 22.672C96.055 22.8853 95.9376 23.152 95.9376 23.472C95.9376 23.8347 96.0816 24.1227 96.3696 24.336C96.6576 24.5493 97.0576 24.656 97.5696 24.656C98.0603 24.656 98.4976 24.544 98.8816 24.32C99.2763 24.096 99.559 23.7653 99.7296 23.328L100.066 24.528C99.8736 25.0293 99.527 25.4187 99.0256 25.696C98.535 25.9733 97.911 26.112 97.1536 26.112ZM107.512 26.112C106.574 26.112 105.848 25.872 105.336 25.392C104.824 24.9013 104.568 24.1813 104.568 23.232V15.568H106.568V23.184C106.568 23.5893 106.67 23.904 106.872 24.128C107.086 24.352 107.379 24.464 107.752 24.464C108.2 24.464 108.574 24.3467 108.872 24.112L109.432 25.536C109.198 25.728 108.91 25.872 108.568 25.968C108.227 26.064 107.875 26.112 107.512 26.112ZM103.16 19.12V17.52H108.856V19.12H103.16ZM114.812 26.112C113.863 26.112 113.031 25.9253 112.316 25.552C111.612 25.168 111.063 24.6453 110.668 23.984C110.284 23.3227 110.092 22.5707 110.092 21.728C110.092 20.8747 110.279 20.1227 110.652 19.472C111.036 18.8107 111.559 18.2933 112.22 17.92C112.892 17.5467 113.655 17.36 114.508 17.36C115.34 17.36 116.082 17.5413 116.732 17.904C117.383 18.2667 117.895 18.7787 118.268 19.44C118.642 20.1013 118.828 20.88 118.828 21.776C118.828 21.8613 118.823 21.9573 118.812 22.064C118.812 22.1707 118.807 22.272 118.796 22.368H111.676V21.04H117.74L116.956 21.456C116.967 20.9653 116.866 20.5333 116.652 20.16C116.439 19.7867 116.146 19.4933 115.772 19.28C115.41 19.0667 114.988 18.96 114.508 18.96C114.018 18.96 113.586 19.0667 113.212 19.28C112.85 19.4933 112.562 19.792 112.348 20.176C112.146 20.5493 112.044 20.992 112.044 21.504V21.824C112.044 22.336 112.162 22.7893 112.396 23.184C112.631 23.5787 112.962 23.8827 113.388 24.096C113.815 24.3093 114.306 24.416 114.86 24.416C115.34 24.416 115.772 24.3413 116.156 24.192C116.54 24.0427 116.882 23.808 117.18 23.488L118.252 24.72C117.868 25.168 117.383 25.5147 116.796 25.76C116.22 25.9947 115.559 26.112 114.812 26.112Z" fill="white" />
                                            <defs>
                                                <linearGradient id="paint0_linear_2824_3512" x1="5.73913" y1="-8.28513e-06" x2="127.486" y2="50.8159" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#63ABFF" />
                                                    <stop offset="0.507627" stop-color="#4680FF" />
                                                    <stop offset="1" stop-color="#3452F3" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>

                                    :
                                    <Button type="text" style={{ marginTop: "-2px", marginRight: "-10px" }} disabled>
                                        <svg width="117" height="24" viewBox="0 0 117 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.1976 4.43262L8.53125 16.1246V20.8869C8.53125 21.4778 9.30516 21.7738 9.75787 21.3559L11.978 19.3065L21.1976 4.43262Z" fill="#F0F6FF" />
                                            <path d="M8.53197 16.1243L15.0172 22.1109C15.7726 22.8082 17.0589 22.5279 17.3969 21.5925L24.3369 2.37421C24.524 1.85577 23.9898 1.36241 23.4279 1.53514L2.60834 7.94131C1.59474 8.25327 1.29107 9.44061 2.0467 10.1379L6.41109 14.1665L21.1986 4.43225L8.53197 16.1243Z" fill="#C6DDFF" />
                                            <path d="M40.736 18.66C39.8613 18.66 39.056 18.5213 38.32 18.244C37.5947 17.956 36.96 17.556 36.416 17.044C35.872 16.5213 35.4507 15.908 35.152 15.204C34.8533 14.5 34.704 13.732 34.704 12.9C34.704 12.068 34.8533 11.3 35.152 10.596C35.4507 9.892 35.872 9.284 36.416 8.772C36.9707 8.24933 37.616 7.84933 38.352 7.572C39.088 7.284 39.8933 7.14 40.768 7.14C41.7173 7.14 42.5707 7.29467 43.328 7.604C44.096 7.91333 44.7413 8.36667 45.264 8.964L43.952 10.244C43.5147 9.80667 43.04 9.48667 42.528 9.284C42.0267 9.07067 41.472 8.964 40.864 8.964C40.2773 8.964 39.7333 9.06 39.232 9.252C38.7307 9.444 38.2987 9.716 37.936 10.068C37.5733 10.42 37.2907 10.836 37.088 11.316C36.896 11.796 36.8 12.324 36.8 12.9C36.8 13.4653 36.896 13.988 37.088 14.468C37.2907 14.948 37.5733 15.3693 37.936 15.732C38.2987 16.084 38.7253 16.356 39.216 16.548C39.7067 16.74 40.2507 16.836 40.848 16.836C41.4027 16.836 41.936 16.7507 42.448 16.58C42.9707 16.3987 43.4667 16.1 43.936 15.684L45.12 17.236C44.5333 17.7053 43.8507 18.0627 43.072 18.308C42.304 18.5427 41.5253 18.66 40.736 18.66ZM43.152 16.964V12.772H45.12V17.236L43.152 16.964ZM51.6874 18.612C50.738 18.612 49.906 18.4253 49.1914 18.052C48.4874 17.668 47.938 17.1453 47.5434 16.484C47.1594 15.8227 46.9674 15.0707 46.9674 14.228C46.9674 13.3747 47.154 12.6227 47.5274 11.972C47.9114 11.3107 48.434 10.7933 49.0954 10.42C49.7674 10.0467 50.53 9.86 51.3834 9.86C52.2154 9.86 52.9567 10.0413 53.6074 10.404C54.258 10.7667 54.77 11.2787 55.1434 11.94C55.5167 12.6013 55.7034 13.38 55.7034 14.276C55.7034 14.3613 55.698 14.4573 55.6874 14.564C55.6874 14.6707 55.682 14.772 55.6714 14.868H48.5514V13.54H54.6154L53.8314 13.956C53.842 13.4653 53.7407 13.0333 53.5274 12.66C53.314 12.2867 53.0207 11.9933 52.6474 11.78C52.2847 11.5667 51.8634 11.46 51.3834 11.46C50.8927 11.46 50.4607 11.5667 50.0874 11.78C49.7247 11.9933 49.4367 12.292 49.2234 12.676C49.0207 13.0493 48.9194 13.492 48.9194 14.004V14.324C48.9194 14.836 49.0367 15.2893 49.2714 15.684C49.506 16.0787 49.8367 16.3827 50.2634 16.596C50.69 16.8093 51.1807 16.916 51.7354 16.916C52.2154 16.916 52.6474 16.8413 53.0314 16.692C53.4154 16.5427 53.7567 16.308 54.0554 15.988L55.1274 17.22C54.7434 17.668 54.258 18.0147 53.6714 18.26C53.0954 18.4947 52.434 18.612 51.6874 18.612ZM62.4725 9.86C63.1552 9.86 63.7632 9.99333 64.2965 10.26C64.8405 10.5267 65.2672 10.9373 65.5765 11.492C65.8858 12.036 66.0405 12.74 66.0405 13.604V18.5H64.0405V13.86C64.0405 13.1027 63.8592 12.5373 63.4965 12.164C63.1445 11.7907 62.6485 11.604 62.0085 11.604C61.5392 11.604 61.1232 11.7 60.7605 11.892C60.3978 12.084 60.1152 12.372 59.9125 12.756C59.7205 13.1293 59.6245 13.604 59.6245 14.18V18.5H57.6245V9.956H59.5285V12.26L59.1925 11.556C59.4912 11.012 59.9232 10.596 60.4885 10.308C61.0645 10.0093 61.7258 9.86 62.4725 9.86ZM72.6093 18.612C71.6599 18.612 70.8279 18.4253 70.1133 18.052C69.4093 17.668 68.8599 17.1453 68.4653 16.484C68.0813 15.8227 67.8893 15.0707 67.8893 14.228C67.8893 13.3747 68.0759 12.6227 68.4493 11.972C68.8333 11.3107 69.3559 10.7933 70.0173 10.42C70.6893 10.0467 71.4519 9.86 72.3053 9.86C73.1373 9.86 73.8786 10.0413 74.5293 10.404C75.1799 10.7667 75.6919 11.2787 76.0653 11.94C76.4386 12.6013 76.6253 13.38 76.6253 14.276C76.6253 14.3613 76.6199 14.4573 76.6093 14.564C76.6093 14.6707 76.6039 14.772 76.5933 14.868H69.4733V13.54H75.5373L74.7533 13.956C74.7639 13.4653 74.6626 13.0333 74.4493 12.66C74.2359 12.2867 73.9426 11.9933 73.5693 11.78C73.2066 11.5667 72.7853 11.46 72.3053 11.46C71.8146 11.46 71.3826 11.5667 71.0093 11.78C70.6466 11.9933 70.3586 12.292 70.1453 12.676C69.9426 13.0493 69.8413 13.492 69.8413 14.004V14.324C69.8413 14.836 69.9586 15.2893 70.1933 15.684C70.4279 16.0787 70.7586 16.3827 71.1853 16.596C71.6119 16.8093 72.1026 16.916 72.6573 16.916C73.1373 16.916 73.5693 16.8413 73.9533 16.692C74.3373 16.5427 74.6786 16.308 74.9773 15.988L76.0493 17.22C75.6653 17.668 75.1799 18.0147 74.5933 18.26C74.0173 18.4947 73.3559 18.612 72.6093 18.612ZM78.5464 18.5V9.956H80.4504V12.308L80.2264 11.62C80.4824 11.044 80.8824 10.6067 81.4264 10.308C81.981 10.0093 82.669 9.86 83.4904 9.86V11.764C83.405 11.7427 83.325 11.732 83.2504 11.732C83.1757 11.7213 83.101 11.716 83.0264 11.716C82.269 11.716 81.6664 11.94 81.2184 12.388C80.7704 12.8253 80.5464 13.4813 80.5464 14.356V18.5H78.5464ZM89.8416 18.5V16.772L89.7296 16.404V13.38C89.7296 12.7933 89.5536 12.34 89.2016 12.02C88.8496 11.6893 88.3163 11.524 87.6016 11.524C87.1216 11.524 86.647 11.5987 86.1776 11.748C85.719 11.8973 85.3296 12.1053 85.0096 12.372L84.2256 10.916C84.6843 10.564 85.2283 10.3027 85.8576 10.132C86.4976 9.95067 87.159 9.86 87.8416 9.86C89.079 9.86 90.0336 10.1587 90.7056 10.756C91.3883 11.3427 91.7296 12.2547 91.7296 13.492V18.5H89.8416ZM87.1536 18.612C86.5136 18.612 85.9536 18.5053 85.4736 18.292C84.9936 18.068 84.6203 17.764 84.3536 17.38C84.0976 16.9853 83.9696 16.5427 83.9696 16.052C83.9696 15.572 84.0816 15.14 84.3056 14.756C84.5403 14.372 84.919 14.068 85.4416 13.844C85.9643 13.62 86.6576 13.508 87.5216 13.508H90.0016V14.836H87.6656C86.983 14.836 86.5243 14.948 86.2896 15.172C86.055 15.3853 85.9376 15.652 85.9376 15.972C85.9376 16.3347 86.0816 16.6227 86.3696 16.836C86.6576 17.0493 87.0576 17.156 87.5696 17.156C88.0603 17.156 88.4976 17.044 88.8816 16.82C89.2763 16.596 89.559 16.2653 89.7296 15.828L90.0656 17.028C89.8736 17.5293 89.527 17.9187 89.0256 18.196C88.535 18.4733 87.911 18.612 87.1536 18.612ZM97.5124 18.612C96.5737 18.612 95.8484 18.372 95.3364 17.892C94.8244 17.4013 94.5684 16.6813 94.5684 15.732V8.068H96.5684V15.684C96.5684 16.0893 96.6697 16.404 96.8724 16.628C97.0857 16.852 97.379 16.964 97.7524 16.964C98.2004 16.964 98.5737 16.8467 98.8724 16.612L99.4324 18.036C99.1977 18.228 98.9097 18.372 98.5684 18.468C98.227 18.564 97.875 18.612 97.5124 18.612ZM93.1604 11.62V10.02H98.8564V11.62H93.1604ZM104.812 18.612C103.863 18.612 103.031 18.4253 102.316 18.052C101.612 17.668 101.063 17.1453 100.668 16.484C100.284 15.8227 100.092 15.0707 100.092 14.228C100.092 13.3747 100.279 12.6227 100.652 11.972C101.036 11.3107 101.559 10.7933 102.22 10.42C102.892 10.0467 103.655 9.86 104.508 9.86C105.34 9.86 106.082 10.0413 106.732 10.404C107.383 10.7667 107.895 11.2787 108.268 11.94C108.642 12.6013 108.828 13.38 108.828 14.276C108.828 14.3613 108.823 14.4573 108.812 14.564C108.812 14.6707 108.807 14.772 108.796 14.868H101.676V13.54H107.74L106.956 13.956C106.967 13.4653 106.866 13.0333 106.652 12.66C106.439 12.2867 106.146 11.9933 105.772 11.78C105.41 11.5667 104.988 11.46 104.508 11.46C104.018 11.46 103.586 11.5667 103.212 11.78C102.85 11.9933 102.562 12.292 102.348 12.676C102.146 13.0493 102.044 13.492 102.044 14.004V14.324C102.044 14.836 102.162 15.2893 102.396 15.684C102.631 16.0787 102.962 16.3827 103.388 16.596C103.815 16.8093 104.306 16.916 104.86 16.916C105.34 16.916 105.772 16.8413 106.156 16.692C106.54 16.5427 106.882 16.308 107.18 15.988L108.252 17.22C107.868 17.668 107.383 18.0147 106.796 18.26C106.22 18.4947 105.559 18.612 104.812 18.612Z" fill="#C6DDFF" />
                                        </svg>
                                    </Button>


                                } />
                        </div>
                    </Content>
                </Layout>
            </Space>
        </div>
    );
};

export default PreviewCSV;
