import React from "react";
import G3T1 from '../InfoCmponents/animation/animation'
import G3T2 from '../InfoCmponents/seanimation/animation'
import G3T3 from '../InfoCmponents/thanimation/animation'
import G3T4 from '../InfoCmponents/foanimation/animation'

import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";

function GenerateAudio() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [animationFactList, setAnimationFactList] = useState([]);
    const [infoTitle, setInfoTitle] = useState('');
    const [keyPoint, setKeyPoint] = useState('');
    const [captionList, setCaptionList] = useState([]);
    const [genre, setGenre] = useState('g3');
    const [template, setTemplate] = useState('t1');


    // 获取前端传递的信息
    // const animationFactList = queryParams.get('animationFactList');
    // const infoTitle = queryParams.get('infoTitle');
    // const keyPoint = queryParams.get('keyPoint')
    // const captionList = queryParams.get('captionList')
    // const genre = queryParams.get('genre')
    // const template = queryParams.get('template')
    
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/getRecordData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            setAnimationFactList(data.animationFactList);
            setInfoTitle(data.infoTitle);
            setKeyPoint(data.keyPoint);
            setCaptionList(data.captionList);
            setGenre(data.genre);
            setTemplate(data.template);
        } catch (error) {
            console.error('错误:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // 空的依赖数组确保这个效果只在组件挂载时运行一次

    // 添加条件判断，确保 genre 和 template 有内容后再渲染
    if (animationFactList.length!=0 && captionList.length!=0) {
        return (
            <div id='recordpage-content-div' style={{ backgroundColor: 'white' }}>
                {genre === "g3" && template === "t1" &&
                    <G3T1 animationFactList={animationFactList} infoTitle={infoTitle} keyPoint={keyPoint} captionList={captionList} />
                }
                {genre === "g3" && template === "t2" &&
                    <G3T2  animationFactList={animationFactList} infoTitle={infoTitle} keyPoint={keyPoint} captionList={captionList} />
                }
                {genre === "g3" && template === "t3" &&
                    <G3T3 animationFactList={animationFactList} infoTitle={infoTitle} keyPoint={keyPoint} captionList={captionList} />
                }
                {genre === "g3" && template === "t4" &&
                    <G3T4 animationFactList={animationFactList} infoTitle={infoTitle} keyPoint={keyPoint} captionList={captionList} />
                }
            </div>
        );
    } else {
        return null; // 如果 genre 或 template 为空，返回 null 或其他你想要展示的内容
    }

}

export default GenerateAudio;


// export default class GenerateAudio extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             genre: this.props.visualizationGenre,
//             template: this.props.visualizationTemplate,
//             // genre: 'g3',
//             // template: 't1',
//             fileList: this.props.changedFileList
//         }

//     }

//     componentDidMount() {
//         console.log('GenerateAudio props:', this.props)
//     }





//     //back按钮 回到编辑页面
//     // backToEditPage = () => {
//     //     window.location.href = '/edit';
//     // }

//     // backToEditPage  = () => {
//     //     const navigate = useNavigate();
//     //     navigate('/edit');
//     // };

//     render() {
//         return (
//             <div id='recordpage-content-div' style={{ backgroundColor: 'white' }}>
//                 {/* {this.state.genre === "g3" && this.state.template === "t1" &&
//                                 // <G3T1 imgSrc={this.state.fileList.length > 0 ? this.state.fileList[0] : ""} />
//                                 <G3T1 {...this.props}/>
//                         }
//                         {this.state.genre === "g3" && this.state.template === "t2" &&
//                                 <G3T2  {...this.props}/>
//                         }
//                         {this.state.genre === "g3" && this.state.template === "t3" &&
//                                 <G3T3 {...this.props}/>
//                         }
//                         {this.state.genre === "g3" && this.state.template === "t4" &&
//                                 <G3T4 {...this.props}/>
//                         } */}
//             </div>

//         )
//     }

// }