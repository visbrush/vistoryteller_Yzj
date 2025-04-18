import { connect } from 'react-redux';
import { editingFactIndex, visualizationGenre, visualizationTemplate, changedFileList, imageFileList1, imageFileList2, imageFileList3, explanation, conversation } from '../../selector/edit'
import { mainChartIndex1, mainChartIndex2, mainChartIndex3 } from '../../selector/edit'

import { infoTitle, factList, keyPoint, captionList, titleList, datasetSchema, originFactList, chartmode, breakdownField, measureField, measureAgg, animationFactList,questionList } from '../../selector/edit';
import * as storyAction from '../../action/storyAction';
import * as editAction from '../../action/editAction';
import InfoTest from './infotest.js';

const mapStateToProps = (state) => {
    console.log('infoTest mapStateToProp State:', state);
    return {
        editingFactIndex: editingFactIndex(state),
        infoTitle: infoTitle(state),
        factList: factList(state),
        keyPoint: keyPoint(state),
        captionList: captionList(state),
        titleList: titleList(state),
        schema: datasetSchema(state),
        originFactList: originFactList(state),
        animationFactList: animationFactList(state),


        visualizationGenre: visualizationGenre(state),
        visualizationTemplate: visualizationTemplate(state),
        changedFileList: changedFileList(state),
        mainChartIndex1: mainChartIndex1(state),//genre1主图
        mainChartIndex2: mainChartIndex2(state),//genre2主图
        mainChartIndex3: mainChartIndex3(state),//genre3主图

        imageFileList1: imageFileList1(state),
        imageFileList2: imageFileList2(state),
        imageFileList3: imageFileList3(state),

        questionList: questionList(state),
        explanation: explanation(state), 
        conversation: conversation(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoTest);
