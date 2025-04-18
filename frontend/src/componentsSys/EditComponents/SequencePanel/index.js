import { connect } from 'react-redux';
import {editingFactIndex,questionList,circleIndex,targetQuestion,isDraged,operateState,originFactList} from '../../../selector/edit.js'
import * as storyAction from '../../../action/storyAction'
import * as editAction from '../../../action/editAction';
import SequencePanel from './sequencepanel';

const mapStateToProps = (state) => {
    //console.log('SequencePanel mapStateToProp State:', state);
    return {
        editingFactIndex: editingFactIndex(state),
        questionList:questionList(state),
        circleIndex:circleIndex(state),
        targetQuestion:targetQuestion(state),
        // isDraged:isDraged(state),
        operateState:operateState(state),
        originFactList:originFactList(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //data
        deleteDatafact: (index) => dispatch(storyAction.deleteDatafact(index)),
        addDatafact: (index) => dispatch(storyAction.addDatafact(index)),
        changeFactList: (newFactItem,index) => dispatch(storyAction.changeFactList(newFactItem,index)),
        changeOriginFactList: (newOriginFactItem,index) => dispatch(storyAction.changeOriginFactList(newOriginFactItem,index)),
        changeFactTitle: (factTitle,index) => dispatch(storyAction.changeFactTitle(factTitle,index)),
        changeFactCaption: (factCaption,index) => dispatch(storyAction.changeFactCaption(factCaption,index)),
        redorderDataStory: (destinationIndex,sourceIndex)=>dispatch(storyAction.redorderDataStory(destinationIndex,sourceIndex)),
     

        setFactIndex: (editingFactIndex) => dispatch(editAction.setFactIndex(editingFactIndex)),
        setEditingBreakdown: (breakdown)=>dispatch(editAction.setEditingBreakdown(breakdown)),
        setEditingMeasure: (measureField,measureAgg)=>dispatch(editAction.setEditingMeasure(measureField,measureAgg)),
        setEditingSubspace: (subspace)=>dispatch(editAction.setEditingSubspace(subspace))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SequencePanel);
