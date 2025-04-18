import { connect } from 'react-redux';
import {editingFactIndex,csv_file_paths,txt_file_path,operateState,isDraged, conversation} from '../../../selector/edit'
import { infoTitle, factList,keyPoint,captionList,titleList,datasetSchema,originFactList,chartmode,breakdownField,measureField,measureAgg} from '../../../selector/edit';
import * as storyAction from '../../../action/storyAction';
import * as editAction from '../../../action/editAction';
import * as userAction from '../../../action/userAction'
import EditMainPage from './EditMainPage';

const mapStateToProps = (state) => {
    console.log('EditMainPage mapStateToProp State:', state);
    return {
        editingFactIndex: editingFactIndex(state),
        infoTitle:infoTitle(state),  
        factList:factList(state),
        keyPoint:keyPoint(state),
        captionList:captionList(state),
        titleList:titleList(state),
        schema:datasetSchema(state),
        originFactList:originFactList(state),
        conversation:conversation(state),
        
        chartmode:chartmode(state),
        breakdownField:breakdownField(state),
        measureField:measureField(state),
        measureAgg:measureAgg(state),

        operateState:operateState(state),

        csv_file_paths: csv_file_paths(state),
        txt_file_path: txt_file_path(state)
    };
};





const mapDispatchToProps = dispatch => {
    return {
        //data
        // uploadData: (fileName, schema, data,file_url) => dispatch(dataAction.uploadData(fileName, schema, data,file_url)),
        // //story
        // generateStory: (facts, relations, coverage) => dispatch(storyAction.generateStory(facts, relations, coverage)),
        // updateProgress: (totalLength, currentLength) => dispatch(storyAction.updateProgress(totalLength, currentLength)),
        // //user
        // updateCovertType: (covertType) => dispatch(userAction.updateCovertType(covertType)),
        // updateOperation: (operateState) => dispatch(userAction.updateOperation(operateState)),
        //edit
        changeStoryTitle: (storyTitle)  => dispatch(storyAction.changeStoryTitle(storyTitle)),
        changeStoryKeypoint: (storyKeypoint) => dispatch(storyAction.changeStoryKeypoint(storyKeypoint)),
        changeFactTitle: (factTitle,index) => dispatch(storyAction.changeFactTitle(factTitle,index)),
        changeFactCaption: (factCaption,index) => dispatch(storyAction.changeFactCaption(factCaption,index)),
        
        updateUserOperation:(operateState) => dispatch(userAction.updateUserOperation(operateState)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditMainPage);
