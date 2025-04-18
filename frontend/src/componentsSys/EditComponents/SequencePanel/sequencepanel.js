import React, { Component } from "react";
import './sequencepanel.css'
import { Space } from 'antd';
import editAddIcon from "../../../assets/pagePics/editAddIcon3.svg"
import SequenceNarChart from "../SequenceNarchart/sequence";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { DropTarget } from 'react-dnd'
import { isDraged, questionList, targetQuestion } from "../../../selector/edit";

export default class SequencePanel extends Component {
    constructor() {
        super()
        this.state = {
            ishoveredleft: false,
            isHoveredRight: false,
            hoveredIndex: null,
            isHoveredLast: false,
            isHovered: false,
            dragId: 0,
            factList: [],
            // clickedIndex:null,

            questionList:[],
            circleIndex:null,
            targetQuestion:null,
        }
    }
    componentDidMount() {
        //console.log('SequencePanel props:', this.props)
        this.setState({ 
            factList: this.props.factList, 
            questionList: this.props.questionList
        });
    }

    componentDidUpdate(prevProps){
        //console.log('componentdidupdate',this.props.circleIndex !== prevProps.circleIndex)
        if (this.props.circleIndex !== prevProps.circleIndex) {
            
            this.setState({
                circleIndex:this.props.circleIndex,
                targetQuestion:this.props.targetQuestion,
            })
        }
    
    }


    handleLastHover = () => {
        this.setState({ isHoveredLast: true });

    }
    handleLastHoverLeave = () => {
        this.setState({ isHoveredLast: false });

    }
    handleHover(index) {
        this.setState({ isHovered: true, hoveredIndex: index });
    }

    handleHoverLeave() {
        this.setState({ isHovered: false, hoveredIndex: null });
    }



    handleSequenceNarChartClick = (index) => {
        const { originFactList, setEditingBreakdown, setEditingMeasure, setEditingSubspace } = this.props
        const { editingFactIndex, setFactIndex } = this.props;
        // 修改 editingFactIndex
        setFactIndex(index)
        // if (editingFactIndex !== index) { setFactIndex(index); }
        // else {
        //     setFactIndex(null);
        // }
    }

    handleAddClick = (index) => {
        const { editingFactIndex, setFactIndex } = this.props;
        //console.log('handleAddClick')
        const { addDatafact } = this.props
        setFactIndex(-1)
        var addFactIndx = index
        addDatafact(addFactIndx)
        setFactIndex(index)
    }
    //拖拽开始
    onDragStart = (result) => {
        this.setState({ dragId: result.draggableId })
    }

    // 拖拽结束
    onDragEnd = (result) => {
        const { destination, source } = result;
        // 超出边界
        if (!destination) {
            return;
        }
        if (destination.index === source.index) {
            return;
        }
        console.log('destination', destination,source);
        const {redorderDataStory} = this.props
        redorderDataStory(destination.index,source.index)
    }


    render() {
        const { ishoveredleft, isHoveredRight, hoveredIndex, isHovered, isHoveredLast,targetQuestion,circleIndex } = this.state
        const { questionList,factList, captionList, titleList, editingFactIndex,operateState} = this.props
        const factListLength = factList.length
        //console.log("this.props.originFactList[editingFactIndex]['type']",this.props.originFactList[0]['type'])
        //console.log('questionList,targetQuestion',questionList[0]===targetQuestion)
        return (
            <div className='sequence-panel' style={{ width: 'calc(100%-18px)', overflowX: 'auto', display: 'flex', flexDirection: 'row' }}>
                <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="sequenceline" direction="horizontal" >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ display: 'flex', flexDirection: 'row' }}
                            >
                                {factList.map((fact, index) => (
                                    <div
                                        style={{ width: 'auto', display: 'flex', flexDirection: 'row' }}
                                        key={index}
                                    >
                                        <div
                                            style={{ width: '12px', position: 'relative' }}
                                            onMouseEnter={() => this.handleHover(index)}
                                            onMouseLeave={() => this.handleHoverLeave()}
                                            // className={`sequence-add ${isHovered && index === hoveredIndex ? 'active' : ''}`}
                                            className={isHovered && index === hoveredIndex ? 'sequence-add' : ''}
                                            onClick={isHovered && index === hoveredIndex ? () => this.handleAddClick(index) : undefined}
                                        >
                                            {isHovered && index === hoveredIndex && (
                                                <img
                                                    className="addnarchart"
                                                    src={editAddIcon}
                                                    alt="editAddIcon pic"
                                                    width={'auto'}
                                                    height={'auto'}
                                                />
                                            )}
                                        </div>
                                        <Draggable key={index} index={index} draggableId={index.toString()} isDragDisabled={false}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <div onClick={() => this.handleSequenceNarChartClick(index)}>
                                                        <SequenceNarChart
                                                            setFactIndex={this.props.setFactIndex}
                                                            deleteDatafact={this.props.deleteDatafact}
                                                            editingFactIndex={this.props.editingFactIndex}
                                                            index={index + 1}
                                                            yourSpec={fact}
                                                            Caption={captionList[index]}
                                                            Title={titleList[index]}
                                                            className={
                                                                editingFactIndex !== index && questionList[index] !== targetQuestion && targetQuestion!=''
                                                                    ? 'notedit-notoutline'
                                                                    : editingFactIndex === index && questionList[index] !== targetQuestion && targetQuestion!=''
                                                                        ? 'editing-notoutline'
                                                                        : editingFactIndex !== index && questionList[index] === targetQuestion && targetQuestion!=''
                                                                            ? 'notedit-outlining' // 设置情况三的边框颜色
                                                                            : editingFactIndex === index && questionList[index] === targetQuestion && targetQuestion!=''
                                                                                ? 'editing-outlining' // 设置情况四的边框颜色
                                                                                : 'notedit-notoutline' // 默认边框样式
                                                            }
                                                            question={questionList[index] === targetQuestion && targetQuestion!=''?true:false}
                                                            circleIndex={questionList[index] === targetQuestion && targetQuestion!=''?circleIndex:''}
                                                            isDraged={isDraged && questionList[index] === targetQuestion && targetQuestion!=''?true:false}
                                                            operateState={operateState}
                                                            isPreview={false}
                                                            factType={this.props.originFactList[index]['type']}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                        </Draggable>
                                    </div>
                                ))}


                                <div
                                    style={{ width: '12px', height: '220px' }}
                                    onMouseEnter={() => this.handleLastHover()}
                                    onMouseLeave={() => this.handleLastHoverLeave()}
                                    // className={`sequence-add ${isHovered && index === hoveredIndex ? 'active' : ''}`}
                                    className={isHoveredLast ? 'sequence-add' : ''}
                                    //className="sequence-add"
                                    onClick={isHoveredLast ? () => this.handleAddClick(factListLength) : undefined}
                                >
                                    {isHoveredLast && (
                                        <img
                                            className="addnarchart"
                                            src={editAddIcon}
                                            alt="editAddIcon pic"
                                            width={'auto'}
                                            height={'auto'}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}