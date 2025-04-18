
import React, { useRef, useState, createRef, useEffect } from 'react';
import './storyoutlineEdit.css';
import * as d3 from 'd3';
import Anta from '../../../assets/pagePics/Antagonistic.png';
import Supporting from '../../../assets/pagePics/Supporting.svg';
import StoryoutlineClear from '../../../assets/pagePics/storyoutlineClear.png';
import { Layout, Divider, Button, Space, Input, ConfigProvider } from "antd";
import { ReactComponent as GenerateAgain } from '../../../assets/pagePics/editGenerateAgain.svg';
import storyoutlineIcon from '../../../assets/pagePics/storyOutlineIcon.png'
import StoryoutlineTip from '../../../assets/pagePics/storyoutlineTip.png';
import * as api from '../../../axios/api'
import { message } from 'antd';
import OperationType from '../../../constant/OperationType';

const normalizeYCoordinates = (points) => {
  const minY = 30;
  const maxY = 231;
  const range = maxY - minY;
  // 归一化每个点的 y 值到 -1 到 1 的范围
  const normalizedPoints = points.map((point) => -((2 * (point.y - minY) / range) - 1));
  return normalizedPoints;
};


const DrawingOutline = (props) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const imgRef = useRef(null)
  const clearimgRef = useRef(null)
  const scrollRef = useRef(null)

  const [divisionLines, setDivisionLines] = useState([]);
  const [divisionWidths, setDivisionWidths] = useState([])
  const [divisionMoveLineWidths, setDivisionMoveLineWidths] = useState([])

  const [isClick, setIsClick] = useState(false)
  const [clickedIndex, setClickedIndex] = useState(null);
  const [targetQuestion, setTargetQuestion] = useState('')
  const [matchingQuestionCount, setMatchingQuestionCount] = useState(null)

  const [isDrag, setIsDrag] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)

  const [isClear, setIsClear] = useState(false);
  const [intersectionPoints, setIntersectionPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [transformedPointsSet, setTransformedPointsSet] = useState([]);

  const [textStyle, setTextStyle] = useState({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#898B8F', fontWeight: 400, fontSize: '10px' });
  const [supportOrChallenge, setSupportOrChallenge] = useState('1111');
  const [supportiveExplanation, setSupportiveExplanation] = useState('xxx');

  const [explanation,setExplanation] = useState('');
  const [conversation,setConversation] = useState('');

  // let readExplanation = '333' ;

  let Yaxis = [ -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999, -999 ];


  const divisionLine = 6;
  const divisionLineColor = '#DCDEE1';
  //[1,-1,0.5],[0, 0.5, 1, -1]
  const initialYaxis = [130, 80, 30, 230]


  const abs = (x) => {return (x >= 0) ? x : -x;}

  const Xtrans = (x) => {
    const divisionWidth = svgRef.current.clientWidth / divisionLine;

    for (let i = 0; i < 7; i++) {
      const xPoint = i * divisionWidth;
      if (abs(xPoint - x) <= 0.001) {
        // setSupportOrChallenge('+' + abs(xPoint - x));
        return i;
      }
    }
  }



  const drawDivisionLines = () => {
    const divisionWidth = svgRef.current.clientWidth / divisionLine;
    const lines = []
    const widths = []
    const moveLineWidths = []

    for (let i = 0; i < divisionLine; i++) {
      const x = i * divisionWidth;
      if (i == 0) {
        lines.push(
          <line
            key={i}
            x1={3}
            y1="0"
            x2={x}
            y2={svgRef.current.clientHeight}
            stroke={divisionLineColor}
            strokeWidth="2"
          />
        );
      }
      else {
        lines.push(
          <line
            key={i}
            x1={x}
            y1="30"
            x2={x}
            y2={svgRef.current.clientHeight - 30}
            stroke={divisionLineColor}
            strokeWidth="1"
          />
        );
      }
      widths.push(x)
      moveLineWidths.push(x / 4)
      moveLineWidths.push(x / 2)
      moveLineWidths.push(x / 4 * 3)
      moveLineWidths.push(x)
    }
    setDivisionLines(lines);
    setDivisionWidths(widths)
    setDivisionMoveLineWidths(moveLineWidths)
    return lines;
  };


  const drawIntersectionDots = () => {
    const svg = svgRef.current;
    const g = gRef.current;
    let previousClickedIndex = null; // 用于保存上一个点击的索引

    let flag = 0;
    for (let i = 0; i < transformedPointsSet.length; i++) {
      if (Yaxis[i] !== -999) flag = 1;
    }
    if (flag === 0) {
      for (let i = 0; i < transformedPointsSet.length; i++) {
        Yaxis[i] = transformedPointsSet[i].y;
      }
    }

    // 移除旧的 circles
    d3.select(g).selectAll('circle').remove();

    // 为每个点创建 circle
    // intersectionPoints.forEach(point => {
    transformedPointsSet.forEach((point, index) => {
      d3.select(g)
        .append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', index === 0 && isDrawing === false ? 7.5 : 4) // 设置半径
        .attr('fill', index === 0 && isDrawing === false ? '#252931' : 'white') // 设置颜色
        .attr('stroke', index === 0 && isDrawing === false ? '#F8F9FA' : '#898B8F')
        .attr('stroke-width', index === 0 && isDrawing === false ? 3 : 2)
        .style('cursor', 'pointer')

        .on('click', function () {
        if (Yaxis[Xtrans(point.x)] <= 130) {
          setTextStyle({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#94DD4D', fontWeight: 400, fontSize: '10px' });
          // explanation = readExplanation
          setSupportOrChallenge('The plot supports the theme as ' + explanation)
        } else if(Yaxis[Xtrans(point.x)] > 130) {
          setTextStyle({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#FF6828', fontWeight: 400, fontSize: '10px' });
          // explanation = readExplanation
          setSupportOrChallenge('The plot challenges the theme as ' + explanation)
        }

          console.log('in click')
          d3.event.preventDefault();
          d3.event.stopPropagation();

          const clickedPoint = point
          //console.log('clickedPoint',clickedPoint)
          const circleIndex = intersectionPoints.findIndex(p => p === clickedPoint);
          setIsClick(true)
          if (previousClickedIndex === circleIndex && d3.select(this).attr('fill') === '#252931') {
            d3.select(this)
              .attr('r', 4) // 设置半径
              .attr('fill', 'white')
              .attr('stroke-width', 2)
              .attr('stroke', '#898B8F');
            setClickedIndex(null)
            previousClickedIndex = circleIndex

          }
          else {
            setClickedIndex(circleIndex)
            previousClickedIndex = circleIndex
            // 在点击事件中更新所有 circle 的样式
            d3.select(g).selectAll('circle')
              .attr('r', 4) // 设置半径
              .attr('fill', 'white')
              .attr('stroke-width', 2)
              .attr('stroke', '#898B8F');
            // 更新点击的 circle 的样式
            d3.select(this)
              .attr('r', 7.5) // 设置半径
              .attr('fill', '#252931')
              .attr('stroke-width', 3)
              .attr('stroke', '#F8F9FA');
            
          }
          
        })
        .call(createDragHandler(point))
    });
  };

  const findDistinctQuestion = (questionList, circleIndex) => {
    const uniqueQuestions = [...new Set(questionList)]; // 获取不同的 questions
    if (circleIndex < uniqueQuestions.length) {
      return uniqueQuestions[circleIndex];
    } else {
      // 处理索引越界的情况
      console.error('Circle index is out of bounds.');
      return null;
    }
  };

  const countMatchingQuestions = (questionList, circleIndex) => {
    const targetQuestion = findDistinctQuestion(questionList, circleIndex);
    if (targetQuestion !== null) {
      const matchingQuestions = questionList.filter(question => question === targetQuestion);
      console.log('matchingQuestions', targetQuestion, matchingQuestions.length)
      return {
        targetQuestion: targetQuestion,
        matchingQuestionsCount: matchingQuestions.length
      };
    } else {
      return {
        targetQuestion: null,
        matchingQuestionsCount: 0
      };
    }
  };

  const findMatchingQuestionIndex = (questionList, circleIndex) => {
    const targetQuestion = findDistinctQuestion(questionList, circleIndex);
    const matchingIndex = questionList.findIndex(question => question === targetQuestion);

    if (targetQuestion !== null) {
      if (matchingIndex !== -1) {
        return matchingIndex;
      } else {
        // 如果找不到匹配的元素
        console.error('Matching question not found in questionList.');
        return null;
      }
    }
    else {
      return null
    }

  };

  const findDistinctExplanation = (explanation, circleIndex) => {
    // const uniqueExplanation = [...new Set(explanation)]; // 获取不同的 questions
    const uniqueExplanation = explanation; // 获取不同的 questions
    if (circleIndex < uniqueExplanation.length) {
      return uniqueExplanation[circleIndex];
    } else {
      // 处理索引越界的情况
      console.error('Circle index is out of bounds.');
      return null;
    }
  };

  const countMatchingExplanation = (explanation, circleIndex) => {
    const targetExplanation = findDistinctExplanation(explanation, circleIndex);
    if (targetExplanation !== null) {
      const matchingExplanations = explanation.filter(explanation => explanation === targetExplanation);
      console.log('matchingExplanation', targetExplanation, matchingExplanations.length)
      return {
        targetExplanation: targetExplanation,
        matchingExplanationsCount: matchingExplanations.length
      };
    } else {
      return {
        targetExplanation: null,
        matchingExplanationsCount: 0
      };
    }
  };

  const createDragHandler = (point) => {
    let dragStartY = null;
    return d3.drag()
      .on('start', function () {

        setIsDrag(true)
        dragStartY = parseFloat(d3.select(this).attr('cy'));
      })
      .on('drag', function (d) {

        const [newX, newY] = d3.mouse(this.parentNode);
        // 更新 circle 的位置
        d3.select(this)
          .attr('cy', newY);
      })
      .on('end', function () {
        // 拖拽结束时更新 transformedPointsSet
        const newY = parseFloat(d3.select(this).attr('cy'));
        const distance = Math.abs(newY - dragStartY);
        if (distance > 5) {
          setTransformedPointsSet((prevPoints) => {
            const updatedPoints = prevPoints.map(p => {
              if (p.x === point.x) {
                Yaxis[Xtrans(p.x)] = newY;
                // if (newY <= 130) {
                //   setTextStyle({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#94DD4D', fontWeight: 400, fontSize: '10px' });
                //   // explanation = readExplanation
                //   setSupportOrChallenge('The plot supports the theme as ' + explanation)
                // } else if (newY > 130) {
                //   setTextStyle({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#FF6828', fontWeight: 400, fontSize: '10px' });
                //   // explanation = readExplanation
                //   setSupportOrChallenge('The plot challenges the theme as ' + explanation)
                // }
                return { x: p.x, y: newY };
              } else {
                return p;
              }
            });
            return updatedPoints;
          });

          const clickedPoint = point
          const circleIndex = intersectionPoints.findIndex(p => p === clickedPoint);
          setDragIndex(circleIndex)

          
        }

      });
  };

  const startDrawing = (e) => {
    if (transformedPointsSet) {
      // 如果 path 不为空，不重新绘制
      setIsDrawing(true);
      return;
    }
    setIsDrawing(true);
    const { clientX, clientY } = e.nativeEvent;
    const point = svgRef.current.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const transformedPoint = point.matrixTransform(svgRef.current.getScreenCTM().inverse())

    const mouseX = transformedPoint.x
    const nearestX = findNearestX(mouseX)
    // 计算距离并检查是否小于 10px
    const distance = Math.abs(mouseX - nearestX);

    const svgElement = svgRef.current;
    const svgPoint = svgElement.createSVGPoint();
    svgPoint.x = nearestX
    svgPoint.y = transformedPoint.y;

    if (distance < 10) {
      // 更新 transformedPoint
      setTransformedPointsSet((prevPoints) => {
        const isXAlreadyExists = prevPoints.some((point) => point.x === svgPoint.x);
        if (!isXAlreadyExists) {
          return [...prevPoints, svgPoint];
        }
        return prevPoints; // 不添加重复的 x
      });

      setIntersectionPoints((prevPoints) => {
        const isXAlreadyExists = prevPoints.some((point) => point.x === svgPoint.x);
        if (!isXAlreadyExists) {
          return [...prevPoints, svgPoint];
        }
        return prevPoints; // 不添加重复的 x
      });
    }
  };
  const drawLine = (e) => {
    if (!isDrawing) return;
    const { clientX, clientY } = e
    const point = svgRef.current.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const transformedPoint = point.matrixTransform(svgRef.current.getScreenCTM().inverse());
    // console.log(transformedPoint)
    const mouseX = transformedPoint.x
    const nearestX = findNearestX(mouseX);

    // 计算距离并检查是否小于 10px
    const distance = Math.abs(mouseX - nearestX);
    const svgElement = svgRef.current;
    const svgPoint = svgElement.createSVGPoint();
    svgPoint.x = nearestX
    svgPoint.y = transformedPoint.y;

    Yaxis[Xtrans(svgPoint.x)] = svgPoint.y;

    if (distance < 10) {
      // 更新 transformedPoint
      setTransformedPointsSet((prevPoints) => {
        const isXAlreadyExists = prevPoints.some((point) => point.x === svgPoint.x);
        if (!isXAlreadyExists) {
          return [...prevPoints, svgPoint];
        }
        return prevPoints; // 不添加重复的 x
      });

      setIntersectionPoints((prevPoints) => {
        const isXAlreadyExists = prevPoints.some((point) => point.x === svgPoint.x);
        if (!isXAlreadyExists) {
          return [...prevPoints, svgPoint];
        }
        return prevPoints; // 不添加重复的 x
      });
    }
    if (Yaxis[svgPoint.x] <= 130) {
      setTextStyle({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#94DD4D', fontWeight: 400, fontSize: '10px' });
      // explanation = readExplanation
      setSupportOrChallenge('The plot supports the theme as ' + explanation)
    } else if(Yaxis[svgPoint.x] > 130) {
      setTextStyle({ position: 'absolute', bottom: '12px', width: 'fit-content', borderRadius: '4px', padding: '1px 8px', background: '#F8F9FA', color: '#FF6828', fontWeight: 400, fontSize: '10px' });
      // explanation = readExplanation
      setSupportOrChallenge('The plot challenges the theme as ' + explanation)
    }
  };
  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };
  // 找到最近的 x
  const findNearestX = (mouseX) => {
    return divisionWidths.reduce((nearestX, currentX) => {
      return Math.abs(currentX - mouseX) < Math.abs(nearestX - mouseX)
        ? currentX
        : nearestX;
    }, divisionWidths[0]);

    

  };

  useEffect(() => {
    // 当 intersectionPoints 发生变化时执行 drawIntersectionDots
    drawIntersectionDots();
    return () => {
      // 在组件卸载时清除事件处理程序
      const g = gRef.current;
      d3.select(g).selectAll('circle').on('.drag', null);
    };
  }, [intersectionPoints]); // 在这里指定依赖项，以便 useEffect 只有在 intersectionPoints 变化时才触发



  useEffect(() => {
    const { questionList, setCircleIndex } = props
    console.log(props)
    console.log(props)
    console.log(props)
    console.log(props)
    console.log(props)
    if (clickedIndex === null) {
      setCircleIndex(null, null)
      return
    }

    const result = countMatchingQuestions(questionList, clickedIndex)
    setTargetQuestion(result.targetQuestion)
    setMatchingQuestionCount(result.matchingQuestionsCount)
    setCircleIndex(clickedIndex, result.targetQuestion)

    console.log(props.explanation)
    const explanation = props.explanation
    // const explanationListValues = Object.values(explanation);
    const explanationListValues = explanation;
    const explanationResult = countMatchingExplanation(explanationListValues, clickedIndex)
    console.log("clickedIndex", clickedIndex)
    console.log(explanationResult.targetExplanation)
    setExplanation(explanationResult.targetExplanation)
    console.log("conversation", props.conversation)

    setIsClick(false)
    // if(clickedIndex!=null && dragIndex===true ){
    //   const { questionList, setCircleIndex } = props
    //   const {dragedPoint}=props
    //   dragedPoint(true)  
    //   //这里访问genereate
    //   const normalizedPoints = normalizeYCoordinates([intersectionPoints[clickedIndex]]);
    //   console.log('normalizedPoints',normalizedPoints)
    // }
  }, [clickedIndex]);

  useEffect(() => {
    if (dragIndex === null) {
      return
    }
    const { questionList, setCircleIndex } = props
    const { updateUserOperation } = props
    //updateUserOperation(OperationType.GENERATING_OUTLINE)

    //这里访问genereate
    const normalizedPoints = normalizeYCoordinates(transformedPointsSet);
    const { csv_file_paths, txt_file_path, keyPoint } = props
    // generateStoryAsync(csv_file_paths, txt_file_path, keyPoint, normalizedPoints);

  }, [dragIndex])

  useEffect(() => {
    if (isDrawing === true) {
      setIsClear(false)
    }
  }, [isDrawing])

  async function generateStoryAsync(csvFilePaths, txtFilePath, keyPoint, outlineCurve) {
    console.log("csvFilePaths", csvFilePaths)
    const pathParts = txtFilePath.split('/');
    const uploadUuid = pathParts[pathParts.length - 2]; // 获取倒数第二部分
    const { updateUserOperation } = props
    setDragIndex(null)
    try {
      // 调用生成故事的接口
      updateUserOperation(OperationType.GENERATING_OUTLINE);
      const generateResponse = await api.generate(csvFilePaths, txtFilePath, keyPoint, uploadUuid, outlineCurve);
      console.log('ingenerate')
      if (generateResponse) {
        console.log('Generated data:', generateResponse.data);
        const { generateStory } = props;

        const factList = generateResponse.data['factList'];
        const captionList = generateResponse.data['captionList'];
        const originFactList = generateResponse.data['originFactList'];
        const schema = generateResponse.data['schema'];
        const animationFactList = generateResponse.data['animationFactList'];
        let infoTitle = generateResponse.data['infoTitle'];
        const questionList = generateResponse.data['questionList'];
        const uniqueResult = generateResponse.data['uniqueResult'];
        // const conversation = generateResponse.data['conversation'];
        const explanation = generateResponse.data['explanation'];
        // readExplanation = infoTitle;
        
        // setConversation(generateResponse.data['conversation']);
        // setExplanation('');

        // 将转义的双引号替换为普通的双引号
        const correctedArray = factList.map((item) => item.replace(/\\"/g, '"'));
        const correctedAniArray = animationFactList.map((item) => item.replace(/\\"/g, '"'));

        // 解析 JSON 字符串为 JSON 对象数组
        const jsonArray = correctedArray.map((item) => JSON.parse(item));
        const jsonAniArray = correctedAniArray.map((item) => JSON.parse(item));

        generateStory(jsonArray, captionList, originFactList, keyPoint, infoTitle, schema, jsonAniArray, questionList, uniqueResult, outlineCurve, explanation);
        setDragIndex(null)

        updateUserOperation(OperationType.GENERATED_OUTLINE);
      } else {
        console.log('dd')
        updateUserOperation(OperationType.GENERATED_FAILED_OUTLINE);
        console.error('Generate failed');
        message.error('Generate failed!');
      }
    } catch (error) {
      updateUserOperation(OperationType.GENERATED_FAILED_OUTLINE);
      console.error('Error:', error);
      message.error('Generate failed!');
    }
    
    const generateResponse = await api.generate(csvFilePaths, txtFilePath, keyPoint, uploadUuid, outlineCurve);
      console.log('ingenerate')
      if (generateResponse) {
        console.log('Generated data:', generateResponse.data);
        const { generateStory } = props;

        const factList = generateResponse.data['factList'];
        const captionList = generateResponse.data['captionList'];
        const originFactList = generateResponse.data['originFactList'];
        const schema = generateResponse.data['schema'];
        const animationFactList = generateResponse.data['animationFactList'];
        let infoTitle = generateResponse.data['infoTitle'];
        const questionList = generateResponse.data['questionList'];
        const uniqueResult = generateResponse.data['uniqueResult'];
        
        const explanation = generateResponse.data['explanation'];
        // setConversation(generateResponse.data['conversation']);
        // setExplanation('777');

        // 将转义的双引号替换为普通的双引号
        const correctedArray = factList.map((item) => item.replace(/\\"/g, '"'));
        const correctedAniArray = animationFactList.map((item) => item.replace(/\\"/g, '"'));

        // 解析 JSON 字符串为 JSON 对象数组
        const jsonArray = correctedArray.map((item) => JSON.parse(item));
        const jsonAniArray = correctedAniArray.map((item) => JSON.parse(item));

        console.log("explanation", explanation)

        generateStory(jsonArray, captionList, originFactList, keyPoint, infoTitle, schema, jsonAniArray, questionList, uniqueResult, outlineCurve, explanation);
        setDragIndex(null)

        updateUserOperation(OperationType.GENERATED_OUTLINE);
      } else {
        console.log('dd')
        updateUserOperation(OperationType.GENERATED_FAILED_OUTLINE);
        console.error('Generate failed');
        message.error('Generate failed!');
      }
  }



  const clearSvg = () => {
    const { setCircleIndex } = props
    setIntersectionPoints([])
    setTransformedPointsSet([])
    setIsClear(true)
    setClickedIndex(null)
    setCircleIndex(null, null)
    //加一个让Drag
    setDragIndex(null)
    // for (let i = 0; i < transformedPointsSet.length; i++) {
    //   Yaxis[i] = transformedPointsSet[i].y;
    // }
  };


  const clickGenerateAgain = () => {
    // console.log(intersectionPoints)
    // 获取最小和最大的 y 坐标
    const normalizedPoints = normalizeYCoordinates(transformedPointsSet);
    const { csv_file_paths, txt_file_path, keyPoint } = props
    generateStoryAsync(csv_file_paths, txt_file_path, keyPoint, normalizedPoints);

    // console.log(normalizedPoints)
  }

  const handleScroll = () => {
    const svgElement = scrollRef.current;
    const imgElement = imgRef.current;
    const clearimgElement = clearimgRef.current

    if (svgElement && imgElement && clearimgElement) {
      const scrollLeft = svgElement.scrollLeft;
      // console.log('scrollLeft',scrollLeft)
      // console.log('imgElement.style.right',imgElement.style.right)
      //clearimgElement.style.right = `-${scrollLeft}px`;
      imgElement.style.right = `-${scrollLeft}px`;

    }
  };

  useEffect(() => {
    if (svgRef.current) {
      drawDivisionLines();
    }
  }, [svgRef]);

  useEffect(() => {
    if (transformedPointsSet.length === 0 && svgRef.current && divisionWidths.length != 0) {
      console.log(props)
      const { outlineCurve } = props
      let initialYaxis = []
      for (let i = 0; i < outlineCurve.length; i++) {
        if (outlineCurve[i] == 0) {
          initialYaxis.push(130)
        } else if (outlineCurve[i] == 1) {
          initialYaxis.push(30)
        } else if (outlineCurve[i] == 0.5) {
          initialYaxis.push(80)
        } else {
          initialYaxis.push(230)
        }
      }

      const svgElement = svgRef.current;
      // [1, -1, 0.5]
      for (let i = 0; i < initialYaxis.length; i = i + 1) {
        const svgPoint = svgElement.createSVGPoint();
        svgPoint.x = divisionWidths[i]
        svgPoint.y = initialYaxis[i]
        setIntersectionPoints((prevPoints) => [...prevPoints, svgPoint])
        setTransformedPointsSet((prevPoints) => [...prevPoints, svgPoint])
        // Yaxis[Xtrans(svgPoint.x)] = initialYaxis[i]
      }
    }
  }, [divisionWidths]);


  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5% 0 5% 5%' }}>
      <img ref={clearimgRef} src={StoryoutlineClear} style={{ width: '100px', height: '24px', position: 'absolute', top: '160px', right: '12px', zIndex: 5 }} onClick={clearSvg}></img>
      <div style={{ width: '100%' }}>
        {/* <Space direction='vertical'size={16}> */}
        <div style={{ paddingRight: '5%' }}>
          {clickedIndex != null ? (
            <div className='right-bottom-clicked'>
              <div style={{
                width: '86px', borderRadius: '0px 4px 4px 0px', padding: '1px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'black', color: 'white',
                fontSize: '14px',
                fontWeight: 500
              }}>
                {/* <Space size={4} style={{,}}> */}
                <img
                  src={storyoutlineIcon}
                  width='14px'
                  height='14px'
                >
                </img>
                <div>{'Plot'}</div>
                {/* <div style={{ width: '4px' }}></div> */}
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '3px',
                  border: '1px solid #FFF',
                  background: '#898B8F',
                  lineHeight: '15.5px',
                  textAlign: 'center',
                }}>{(clickedIndex + 1)}</div>

                {/* </Space> */}

              </div>
              <div style={{ padding: '8px', fontSize: '10px', fontWeight: 400 }}>
                {targetQuestion}</div>
              <div style = {textStyle}>
                {/* supportOrChallenge */}
                {/* The plot supports the theme by visualizing startup failures and key trends over time. */}
                { explanation }
              </div>
            </div>
          ) : (
            <div className='right-bottom-donotclick'>
              {isClear ? (
                <span>The story flow has been cleared, now you can press mouse to draw a new story flow.</span>
              ) : (
                <span>Select a point to view the plot of the story</span>
                // <span>The story flow has been cleared, now you can press mouse to draw a new story flow.</span>
              )}
            </div>
          )}
        </div>

        <div style={{ height: '16px' }}></div>

        {/* <div ref={scrollRef} className='storyoutlineEdit' onScroll={handleScroll} style={{ position: 'relative', width: '100%', maxWidth: '100%', height: '264px', overflowX: 'auto' }}> */}
        <div ref={scrollRef} className='storyoutlineEdit' onScroll={handleScroll} style={{ position: 'relative', width: '100%', maxWidth: '100%', height: '264px' }}>
          <img src={Anta} style={{ position: 'absolute', top: '246px' }} alt='anta pic' width={'68px'} height={'14px'} />
          <img src={Supporting} style={{ position: 'absolute' }} alt='supporting pic' width={'68px'} height={'14px'} />
          <img ref={imgRef} src={StoryoutlineTip} style={{ position: 'absolute', top: '117px', right: '0px' }} alt='supporting pic' width={'24px'} height={'24px'} />

          <svg
            ref={svgRef}
            width="350px"
            height="261px"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              borderRadius: '0px 8px 8px 0px',
              // borderLeft: '3px solid var(--text-text-icon-02, #BCBDC0)',
              background: 'var(--ux-bg-module, #F8F9FA)',
            }}
            onMouseDown={startDrawing}
            onMouseMove={drawLine}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          >
            {divisionLines}
            {/* 画一条横线，位于 SVG 的正中间 */}
            <line
              x1={0}
              y1={130}
              x2={350}
              y2={130}
              stroke={'#DCDEE1'}  // 设置线的颜色
              strokeWidth="2"  // 设置线的宽度
            />

            {/* if(setTransformedPointsSet.length) {
              <line
                x1={0}
                y1={intersectionPoints[1]}
                x2={350}
                y2={intersectionPoints[1]}
                stroke={'red'}  // 设置线的颜色
                strokeWidth="2"  // 设置线的宽度
              />
            } */}
            

            <g ref={gRef}>
              {/* Draw the path based on transformedPointsSet */}
              {transformedPointsSet.length > 1 && (
                <path
                  d={d3.line()
                    .x(d => d.x)
                    .y(d => d.y)
                    .curve(d3.curveCardinal.tension(0.3))(transformedPointsSet)}
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                />
              )}
            </g >
          </svg>
        </div>
        {/* </Space> */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px', paddingRight: '5%' }}>
        <GenerateAgain onClick={clickGenerateAgain} style={{ cursor: 'pointer' }}></GenerateAgain>
      </div>

    </div>
  );
};

export default DrawingOutline;

