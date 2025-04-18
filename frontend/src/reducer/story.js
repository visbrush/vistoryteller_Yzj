import ActionType from '../action/type';
import OperationType from '../constant/OperationType'
import test from '../constant/firstGenerate4Test'
import { yourSpec_0, yourSpec_1, yourSpec_4_1, yourSpec_2, yourSpec_3, yourSpec_4, yourSpec_5, yourSpec_6, yourSpec_7 } from '../pages/InfoCmponents/other/hikinginsight'
import { ayourSpec_0, ayourSpec_1, ayourSpec_2, ayourSpec_3, ayourSpec_4, ayourSpec_5, ayourSpec_6, ayourSpec_7 } from '../pages/InfoCmponents/other/hikinganimation'

const initialState = {
    //upload

    file_url_list: '',
    mergedfile_url: '',
    //generate
    factList: [],
    infoTitle: '',
    keyPoint: '',
    captionList: [],
    titleList: [],
    datasetSchema: '',
    animationFactList: [],
    uniqueResult: {
        "Goto": [
            "Sichuan",
            "Chongqing",
            "Hebei"
        ],
        "Age_range": [
            "31-40",
            "41-60",
            "over 60"
        ],
        "timestamp": {
            "max": "2019-07-05 20:05:35",
            "min": "2001-07-13 04:31:26"
        },
        "timestamp_tag": {
            "max": "2019-07-05 20:05:13",
            "min": "2006-04-18 18:29:03"
        },
        "Province": [
            "Sichuan",
            "Beijing",
            "Guangdong"
        ],
        "Gender": [
            "Female",
            "Male"
        ],
        "together": [
            "2 people",
            "1 prople"
        ]
    },
    animationFactList: [ayourSpec_0, ayourSpec_1, ayourSpec_2, ayourSpec_3, ayourSpec_4, ayourSpec_5, ayourSpec_6, ayourSpec_7],
    datasetSchema: test.schema,
    factList: [yourSpec_3, yourSpec_2, yourSpec_5, yourSpec_4_1, yourSpec_4, yourSpec_6,],
    infoTitle: 'Hiking',
    keyPoint: 'What are the characteristics of people who enjoy hiking?',
    captionList: [
        'First, we analyzed the age distribution of people who enjoy hiking',
        'Next, we analyzed the proportion of each age group.',
        'We also analyzed the average age of hikers departing from different provinces.',
        'The distribution of the number of hikers departing from different provinces.',
        'In the end, we would like to know which provinces have the highest number of hikers departing from different provinces.'],
    titleList: ['Distribution', 'Proportion', 'Rank', 'Distribution', 'Rank', 'Distribution', 'Proportion', 'Distribution'],
    originFactList: [
        { "type": "distribution ", "subspace": [], "breakdown": ["Age_amount"], "measure": [{ "field": "number", "aggregate": "count" }], "focus": [] },
        { "type": "proportion", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "together", "aggregate": "count" }], "focus": [{ "field": "together", "operator": "=", "value": "2 people" }] },
        { "type": "value", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "Age", "aggregate": "avg" }], "focus": [] },
        { "type": "proportion", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "together", "aggregate": "count" }], "focus": [{ "field": "together", "operator": "=", "value": "over 10 people" }] },
        { "type": "difference", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "Age", "aggregate": "avg" }], "focus": [{ "field": "together", "operator": "=", "value": "2 people" }, { "field": "together", "operator": "=", "value": "over 10 people" }] },
        { "type": "value", "subspace": [], "breakdown": [], "measure": [{ "field": "gender", "aggregate": "count" }], "focus": [] },
        { "type": "proportion", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "together", "aggregate": "count" }], "focus": [{ "field": "together", "operator": "=", "value": "2 people" }] },
        { "type": "value", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "Age", "aggregate": "avg" }], "focus": [] },
        { "type": "proportion", "subspace": [], "breakdown": ["together"], "measure": [{ "field": "together", "aggregate": "count" }], "focus": [{ "field": "together", "operator": "=", "value": "over 10 people" }] },

    ],
    questionList: ['The age characteristics of people who enjoy hiking.',
        'The age characteristics of people who enjoy hiking.',
        'test1', 'test2'],
    outlineCurve: [-1, 0, 0.5],
    circleIndex: null,
    targetQuestion: null,
    explanation: [
        'The plot challenges the theme as it redirects focus from broad trends to specific internal management issues.',
        'The plot supports the theme as it identifies external factors crucial for understanding trends in startup failures.', 
        'The plot supports the theme as it visually presents data on startup failures, highlighting key factors and trends over time.', 
        'The plot supports the theme as it visually identifies and categorizes primary reasons for startup failures, enhancing understanding of trends.'
    ],
    conversation: [
        'I\'ve been analyzing startup failure data, focusing on internal and external causes, calculating proportions, and identifying common failure reasons. I\'ve also grouped data by various attributes to understand different impacts on startup survival.', 
        'I\'ve analyzed startup failures, focusing on internal management issues, external influences, and common causes. I\'ve categorized and quantified these failures to understand trends and factors affecting startup survival.', 
        'I\'ve analyzed startup failures using the \'Dead Startups Dataset\', focusing on common causes, survival times, and trends over years and industries. I\'ve updated Data Facts to reflect these insights.'
    ]
    // conversation: [
    //     'I\'ve analyzed startup data to identify failure causes, calculated failure rates by industry, and examined survival times based on various factors. This involved categorizing, counting, and computing proportions and trends within the dataset.', 
    //     'I\'ve analyzed various aspects of startup failures, identifying internal and external causes, and highlighting industry-specific trends and survival times. I\'ve also categorized startups by failure reasons and locations.', 
    //     'I\'ve been refining Data Fact 5 to better analyze startup failures by industry and cause, using the \'Reveal\' strategy to gradually unfold complexities and enhance understanding of survival times.'
    // ]
}


export default (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        //--------------- init story-----------
        case ActionType.UPLOAD_DATA:
            newState.schema = action.schema;
            newState.mergedfile_url = action.mergedfile_url;
            //console.log('redux reducer action.type:', action.type)
            break;
        case ActionType.GENERATE_STORY:
            console.log('reducer generate story', action)
            console.log('initial conversation', initialState.conversation)
            newState.factList = action.factList;
            newState.infoTitle = action.infoTitle;
            newState.keyPoint = action.keyPoint;
            newState.captionList = action.captionList;
            newState.originFactList = action.originFactList;
            newState.datasetSchema = action.schema
            newState.animationFactList = action.animation
            newState.titleList = action.originFactList.map(item => item.type);
            newState.uniqueResult = action.uniqueResult
            newState.outlineCurve = action.outlineCurve
            newState.questionList = action.questionList
            newState.explanation = (action.explanation == null ? initialState.explanation : action.explanation)
            newState.conversation = (action.conversation == null ? initialState.conversation : action.conversation)
            break;
        case ActionType.CHANGE_STORY_TITLE:
            newState.infoTitle = action.storyTitle;
            break;
        case ActionType.CHANGE_STORY_KEYPOINT:
            newState.keyPoint = action.storyKeypoint
            break;
        case ActionType.CHANGE_FACT_TITLE:
            newState.titleList = state.titleList.map((item, idx) => idx === action.index ? action.factTitle : item)
            break;
        case ActionType.CHANGE_FACT_CAPTION:
            newState.captionList = state.captionList.map((item, idx) => idx === action.index ? action.factCaption : item)
            break;
        case ActionType.CHANGE_FACT_LIST:
            newState.factList = state.factList.map((item, idx) => idx === action.index ? action.newFactItem : item);
            break;
        case ActionType.CHANGE_ORIGIN_FACT_LIST:
            newState.originFactList = state.originFactList.map((item, idx) => idx === action.index ? action.newOriginFactItem : item);
            break;
        case ActionType.CHANGE_ANI_FACT_LIST:
            newState.animationFactList = state.animationFactList.map((item, idx) => idx === action.index ? action.newAniFactList : item);
            break;
        case ActionType.DELETE_DATAFACT:
            newState.captionList = state.captionList.filter((_, i) => i !== action.index);
            newState.titleList = state.titleList.filter((_, i) => i !== action.index);
            newState.factList = state.factList.filter((_, i) => i !== action.index);
            newState.originFactList = state.originFactList.filter((_, i) => i !== action.index);
            newState.animationFactList = state.animationFactList.filter((_, i) => i !== action.index);
            newState.questionList = state.questionList.filter((_, i) => i !== action.index);
            newState.explanation = state.explanation.filter((_, i) => i !== action.index);
            newState.conversation = state.conversation.filter((_, i) => i !== action.index);
            break;
        case ActionType.ADD_DATAFACT:
            return addEmptyDataFact(state, action.index);

        case ActionType.REORDER_DATASTORY:
            return reorderAllStoryInfo(state, action.destinationIndex, action.sourceIndex)
        case ActionType.SET_CIRCLE_INDEX:

            newState.circleIndex = action.circleIndex;
            newState.targetQuestion = action.targetQuestion
            break;
        default:
            break;
    }
    console.log('newState: ', newState)
    return newState;
}

const addEmptyDataFact = (state, index) => {
    console.log('addEmptyDataFact', index)
    const emptyDataFact = {
        "type": "",
        "subspace": [],
        "breakdown": [],
        "measure": [{ "field": "", "aggregate": "" }],
        "focus": []
    }
    return {
        ...state,
        factList: [
            ...state.factList.slice(0, index),
            null,
            ...state.factList.slice(index)
        ],
        captionList: [
            ...state.captionList.slice(0, index),
            '', // Empty string for new caption
            ...state.captionList.slice(index)
        ],
        titleList: [
            ...state.titleList.slice(0, index),
            '', // Empty string for new title
            ...state.titleList.slice(index)
        ],
        originFactList: [
            ...state.originFactList.slice(0, index),
            emptyDataFact, // Assume the structure of originFactList is similar to factList
            ...state.originFactList.slice(index)
        ],
        questionList: [
            ...state.questionList.slice(0, index),
            '', // Empty string for new title
            ...state.questionList.slice(index)
        ],
        animationFactList: [
            ...state.animationFactList.slice(0, index),
            null,
            ...state.animationFactList.slice(index)
        ],
        explanation: [
            ...state.explanation.slice(0, index),
            '',
            ...state.explanation.slice(index)
        ],
        conversation: [
            ...state.conversation.slice(0, index),
            '',
            ...state.conversation.slice(index)
        ]
    };
}

const reorderAllStoryInfo = (state, destinationIndex, sourceIndex) => {
    const reorderList = (list) => {
        const reorderedList = Array.from(list);
        const [removed] = reorderedList.splice(sourceIndex, 1);
        reorderedList.splice(destinationIndex, 0, removed);
        return reorderedList;
    };

    const updatedFactList = reorderList(state.factList);
    const updatedCaptionList = reorderList(state.captionList);
    const updatedTitleList = reorderList(state.titleList);
    const updatedOriginFactList = reorderList(state.originFactList);
    const updatedAnimationFactList = reorderList(state.animationFactList);
    const updateQuestionList = reorderList(state.questionList)

    const updateExplanation = reorderList(state.explanation)
    const updateConversation = reorderList(state.conversation)

    // 返回更新后的参数
    return {
        ...state,
        factList: updatedFactList,
        captionList: updatedCaptionList,
        titleList: updatedTitleList,
        originFactList: updatedOriginFactList,
        animationFactList: updatedAnimationFactList,
        questionList: updateQuestionList,
        
        explanation: updateExplanation,
        conversation: updateConversation,
    };
};
