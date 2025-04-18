import ActionType from './type';



export const uploadData = (schema, file_url_list, mergedfile_url) => ({
  type: ActionType.UPLOAD_DATA,
  schema,
  mergedfile_url,
})

export const generateStory = (factList, captionList, originFactList, keyPoint, infoTitle, schema, animation, questionList, uniqueResult, outlineCurve, explanation, conversation) => {
  console.log('generateStory explanation:', explanation);
  return {
    type: ActionType.GENERATE_STORY,
    factList,
    captionList,
    originFactList,
    keyPoint,
    infoTitle,
    schema,
    animation,
    questionList,
    uniqueResult,
    outlineCurve,
    explanation,
    conversation
  };
};

//--------------------left-single-fact edit---------------
export const changeStoryTitle = (storyTitle) => ({
  type: ActionType.CHANGE_STORY_TITLE,
  storyTitle,
})

export const changeStoryKeypoint = (storyKeypoint) => ({
  type: ActionType.CHANGE_STORY_KEYPOINT,
  storyKeypoint,
})

export const changeFactTitle = (factTitle, index) => ({
  type: ActionType.CHANGE_FACT_TITLE,
  factTitle,
  index
})

export const changeFactCaption = (factCaption, index) => ({
  type: ActionType.CHANGE_FACT_CAPTION,
  factCaption,
  index
})

export const changeFactList = (newFactItem, index) => ({
  type: ActionType.CHANGE_FACT_LIST,
  newFactItem,
  index
});

export const changeOriginFactList = (newOriginFactItem, index) => ({
  type: ActionType.CHANGE_ORIGIN_FACT_LIST,
  newOriginFactItem,
  index
});

export const changeAniFactList = (newAniFactList, index) => ({
  type: ActionType.CHANGE_ANI_FACT_LIST,
  newAniFactList,
  index
})

export const deleteDatafact = (index) => ({
  type: ActionType.DELETE_DATAFACT,
  index
})

export const addDatafact = (index) => ({
  type: ActionType.ADD_DATAFACT,
  index
})

export const redorderDataStory = (destinationIndex, sourceIndex) => ({
  type: ActionType.REORDER_DATASTORY,
  destinationIndex,
  sourceIndex
})

export const setCircleIndex = (circleIndex, targetQuestion) => ({
  type: ActionType.SET_CIRCLE_INDEX,
  circleIndex,
  targetQuestion
})


// export const   changeDatafact = (index, caption, title, fact, originFact) =>({
//   type: ActionType.CHANGE_DATAFACT,
//   index,
//   caption, 
//   title, 
//   fact, 
//   originFact
// })