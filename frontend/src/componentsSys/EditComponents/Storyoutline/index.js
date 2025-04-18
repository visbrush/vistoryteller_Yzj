import { connect } from 'react-redux';
import { editingFactIndex, chartmode, factList, captionList, titleList, originFactList, datasetSchema, csv_file_paths, txt_file_path, keyPoint, questionList, outlineCurve, explanation, conversation } from '../../../selector/edit.js'

import * as storyAction from '../../../action/storyAction'
import * as editAction from '../../../action/editAction';
import * as userAction from '../../../action/userAction';
import DrawingOutline from './storyoulineEdit.js';
import edit from '../../../reducer/edit.js';

const mapStateToProps = (state) => {
    console.log("Explanation: ", explanation)
    return {
        // chartmode: chartmode(state),
        editingFactIndex: editingFactIndex(state),
        factList: factList(state),
        captionList: captionList(state),
        titleList: titleList(state),
        originFactList: originFactList(state),
        datasetSchema: datasetSchema(state),
        questionList: questionList(state),
        outlineCurve: outlineCurve(state),

        explanation: explanation(state),
        conversation: conversation(state),

        csv_file_paths: csv_file_paths(state),
        txt_file_path: txt_file_path(state),
        keyPoint: keyPoint(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //data
        deleteDatafact: (index) => dispatch(storyAction.deleteDatafact(index)),
        changeFactList: (newFactItem, index) => dispatch(storyAction.changeFactList(newFactItem, index)),
        changeOriginFactList: (newOriginFactItem, index) => dispatch(storyAction.changeOriginFactList(newOriginFactItem, index)),
        changeAniFactList: (newAniFactList, index) => dispatch(storyAction.changeAniFactList(newAniFactList, index)),
        setCircleIndex: (circleIndex, targetQuestion) => dispatch(storyAction.setCircleIndex(circleIndex, targetQuestion)),
        generateStory: (factList, captionList, originFactList, keyPoint, infoTitle, schema, animation, questionList, uniqueResult, outlineCurve, explanation, conversation) => dispatch(storyAction.generateStory(factList, captionList, originFactList, keyPoint, infoTitle, schema, animation, questionList, uniqueResult, outlineCurve, explanation, conversation)),

        setFactIndex: (editingFactIndex) => dispatch(editAction.setFactIndex(editingFactIndex)),
        setEditingBreakdown: (breakdown) => dispatch(editAction.setEditingBreakdown(breakdown)),
        setEditingMeasure: (measureField, measureAgg) => dispatch(editAction.setEditingMeasure(measureField, measureAgg)),
        setEditingSubspace: (subspace) => dispatch(editAction.setEditingSubspace(subspace)),
        updateUserOperation: (operateState) => dispatch(userAction.updateUserOperation(operateState)),
        // dragedPoint:(isDraged)=>dispatch(editAction.dragedPoint(isDraged)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingOutline);