import { connect } from 'react-redux';
import {editingFactIndex,visualizationGenre,visualizationTemplate,changedFileList} from '../../selector/edit'
import { infoTitle, factList,keyPoint,captionList,titleList,datasetSchema,originFactList,chartmode,breakdownField,measureField,measureAgg} from '../../selector/edit';
import * as storyAction from '../../action/storyAction';
import * as editAction from '../../action/editAction';
import GenerateAudio from './generateAudio.js';

const mapStateToProps = (state) => {
    //console.log('infoTest mapStateToProp State:', state);
    return {
        editingFactIndex: editingFactIndex(state),
        infoTitle:infoTitle(state),  
        factList:factList(state),
        keyPoint:keyPoint(state),
        captionList:captionList(state),
        titleList:titleList(state),
        schema:datasetSchema(state),
        originFactList:originFactList(state),
        
        chartmode:chartmode(state),
        breakdownField:breakdownField(state),
        measureField:measureField(state),
        measureAgg:measureAgg(state),

        visualizationGenre:visualizationGenre(state),
        visualizationTemplate:visualizationTemplate(state),
        changedFileList: changedFileList(state)
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
        // changeStoryTitle: (storyTitle)  => dispatch(storyAction.changeStoryTitle(storyTitle)),
        // changeStoryKeypoint: (storyKeypoint) => dispatch(storyAction.changeStoryKeypoint(storyKeypoint)),
        // changeFactTitle: (factTitle,index) => dispatch(storyAction.changeFactTitle(factTitle,index)),
        // changeFactCaption: (factCaption,index) => dispatch(storyAction.changeFactCaption(factCaption,index)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GenerateAudio);
