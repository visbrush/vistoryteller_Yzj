import { connect } from 'react-redux';
// import {editingFactIndex} from '../../selector/edit'
import { editingFactIndex } from '../../selector/edit';
import * as storyAction from '../../action/storyAction';
import EditPage from './EditPage';

const mapStateToProps = (state) =>{
    console.log('EdidPage mapstatetoprops State:', state);
    return {
        editingFactIndex: editingFactIndex(state),
    };
};




// const mapDispatchToProps = dispatch => {
//     return {
//         //data
//         uploadData: (fileName, schema, data,file_url) => dispatch(dataAction.uploadData(fileName, schema, data,file_url)),
//         //story
//         generateStory: (facts, relations, coverage) => dispatch(storyAction.generateStory(facts, relations, coverage)),
//         updateProgress: (totalLength, currentLength) => dispatch(storyAction.updateProgress(totalLength, currentLength)),
//         //user
//         updateCovertType: (covertType) => dispatch(userAction.updateCovertType(covertType)),
//         updateOperation: (operateState) => dispatch(userAction.updateOperation(operateState)),
//     }
// }

export default connect(mapStateToProps)(EditPage);
