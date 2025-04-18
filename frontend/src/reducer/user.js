import ActionType from '../action/type';
import OperationType from '../constant/OperationType'

const initialState = {
    //operate
    // operateState: OperationType.BEFORE_UPLOAD,
    operateState:OperationType.GENERATED
}


export default (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        //--------------- init data-----------
        case ActionType.UPDATE_USER_OPERATION:
            newState.operateState = action.operateState
            return newState;
        default:
            break;
    }
    return newState;
}