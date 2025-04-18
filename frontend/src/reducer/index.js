import { combineReducers } from 'redux';
import story from './story';
import edit from './edit';
import user from './user'

// import user from './user';

export default combineReducers({
    user,
    edit,
    story,
});
//export default edit;