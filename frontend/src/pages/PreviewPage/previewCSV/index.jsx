import { connect } from 'react-redux';
import { operateState } from '../../../selector/edit.js';
import * as storyAction from '../../../action/storyAction';
import * as editAction from '../../../action/editAction'
import * as userAction from '../../../action/userAction.js'
import PreviewCSV from './previewCSV.jsx'

const mapStateToProps = (state) => {
    // console.log('PreviewPage mapstatetoprops State:', state);
    return {
        operateState: operateState(state),
    };
};




const mapDispatchToProps = dispatch => {
    return {
        //story
        generateStory: (factList, captionList, originFactList, keyPoint, infoTitle, schema, animation, questionList, uniqueResult, outlineCurve) => dispatch(storyAction.generateStory(factList, captionList, originFactList, keyPoint, infoTitle, schema, animation, questionList, uniqueResult, outlineCurve)),
        setFilePath: (csv_file_paths, txt_file_path) => dispatch(editAction.setFilePath(csv_file_paths, txt_file_path)),
        updateUserOperation: (operateState) => dispatch(userAction.updateUserOperation(operateState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewCSV);