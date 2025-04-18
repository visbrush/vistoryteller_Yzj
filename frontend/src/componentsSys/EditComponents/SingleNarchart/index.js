import { connect } from 'react-redux';
import { editingFactIndex, chartmode, factList, animationFactList, captionList, titleList, originFactList, datasetSchema, csv_file_paths, txt_file_path, uniqueResult, operateState, outlineCurve } from '../../../selector/edit.js'

import * as storyAction from '../../../action/storyAction'
import * as editAction from '../../../action/editAction';
import SingleNarchart from './narchart.js';

const mapStateToProps = (state) => {
    return {
        chartmode: chartmode(state),
        editingFactIndex: editingFactIndex(state),
        factList: factList(state),
        animationFactList: animationFactList(state),
        captionList: captionList(state),
        titleList: titleList(state),
        originFactList: originFactList(state),
        datasetSchema: datasetSchema(state),
        uniqueResult: uniqueResult(state),
        outlineCurve: outlineCurve(state),

        csv_file_paths: csv_file_paths(state),
        txt_file_path: txt_file_path(state),

        operateState: operateState(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //data
        deleteDatafact: (index) => dispatch(storyAction.deleteDatafact(index)),
        changeFactList: (newFactItem, index) => dispatch(storyAction.changeFactList(newFactItem, index)),
        changeOriginFactList: (newOriginFactItem, index) => dispatch(storyAction.changeOriginFactList(newOriginFactItem, index)),
        changeAniFactList: (newAniFactList, index) => dispatch(storyAction.changeAniFactList(newAniFactList, index)),

        changeFactTitle: (factTitle, index) => dispatch(storyAction.changeFactTitle(factTitle, index)),
        changeFactCaption: (factCaption, index) => dispatch(storyAction.changeFactCaption(factCaption, index)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleNarchart);
