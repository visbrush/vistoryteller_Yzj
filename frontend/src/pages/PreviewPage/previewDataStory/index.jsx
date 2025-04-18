import { connect } from 'react-redux';
import { editingFactIndex, animationFactList, visualizationGenre, visualizationTemplate, imageFileList1, imageFileList2, imageFileList3, explanation, conversation } from '../../../selector/edit'
import { infoTitle, factList, keyPoint, captionList, titleList, datasetSchema, originFactList, chartmode, breakdownField, measureField, measureAgg,questionList } from '../../../selector/edit';
import { mainChartIndex1, mainChartIndex2, mainChartIndex3 } from '../../../selector/edit'

import * as storyAction from '../../../action/storyAction';
import * as editAction from '../../../action/editAction';
import * as userAction from '../../../action/userAction.js'
import PreviewDataStory from './previewDataStory.jsx';

const mapStateToProps = (state) => {
    //console.log('EditMainPage mapStateToProp State:', state);
    return {
        editingFactIndex: editingFactIndex(state),
        infoTitle: infoTitle(state),
        factList: factList(state),
        keyPoint: keyPoint(state),
        captionList: captionList(state),
        titleList: titleList(state),
        schema: datasetSchema(state),
        explanation: explanation(state),
        conversation: conversation(state),
        originFactList: originFactList(state),
        animationFactList: animationFactList(state),


        chartmode: chartmode(state),
        breakdownField: breakdownField(state),
        measureField: measureField(state),
        measureAgg: measureAgg(state),

        visualizationGenre: visualizationGenre(state),
        visualizationTemplate: visualizationTemplate(state),
        mainChartIndex1: mainChartIndex1(state),//genre1主图
        mainChartIndex2: mainChartIndex2(state),//genre2主图
        mainChartIndex3: mainChartIndex3(state),//genre3主图
        imageFileList1: imageFileList1(state),
        imageFileList2: imageFileList2(state),
        imageFileList3: imageFileList3(state),
        questionList: questionList(state),

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
        changeStoryTitle: (storyTitle) => dispatch(storyAction.changeStoryTitle(storyTitle)),
        changeStoryKeypoint: (storyKeypoint) => dispatch(storyAction.changeStoryKeypoint(storyKeypoint)),
        changeFactTitle: (factTitle, index) => dispatch(storyAction.changeFactTitle(factTitle, index)),
        changeFactCaption: (factCaption, index) => dispatch(storyAction.changeFactCaption(factCaption, index)),
        //visualization
        setVisualizationGenre: (genre) => dispatch(editAction.setVisualizationGenre(genre)),
        setVisualizationTemplate: (template) => dispatch(editAction.setVisualizationTemplate(template)),
        changedFileList: (fileList) => dispatch(editAction.changedFileList(fileList)),
        //background image  
        changeImageFileList1: (fileList) => dispatch(editAction.imageFileList1(fileList)),
        changeImageFileList2: (fileList) => dispatch(editAction.imageFileList2(fileList)),
        changeImageFileList3: (fileList) => dispatch(editAction.imageFileList3(fileList)),

        //main chart
        changeG1MainChart: (index) => dispatch(editAction.changeG1MainChart(index)),
        changeG2MainChart: (index) => dispatch(editAction.changeG2MainChart(index)),
        changeG3MainChart: (index) => dispatch(editAction.changeG3MainChart(index)),

        updateUserOperation:(operateState) => dispatch(userAction.updateUserOperation(operateState)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDataStory);
