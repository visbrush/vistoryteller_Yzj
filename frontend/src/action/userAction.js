import ActionType from './type';



export const updateUserOperation = (operateState) => ({
    type: ActionType.UPDATE_USER_OPERATION,
    operateState,
})