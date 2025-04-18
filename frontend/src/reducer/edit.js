import ActionType from '../action/type';
import test from '../constant/firstGenerate4Test'
import Action from '../narrative-chart/src/vis/actions/action';

const initialState = {
    //edit panel
    editingFactIndex: 0,
    chartmode: 'Light',
    breakdownField: '',
    measureField: '',
    measureAgg: '',

    //visualization
    visualizationGenre: 'g1',
    visualizationTemplate: "t1",
    changeFileList: [],
    imageFileList1: [],
    imageFileList2: [],
    imageFileList3: [],
    mainChartIndex1: 0,
    mainChartIndex2: 0,
    mainChartIndex3: 0,

    csv_file_paths: [
        "uploads/fd0107ab-a8d8-470b-be01-91e1521b3cee/Member.csv",
    "uploads/fd0107ab-a8d8-470b-be01-91e1521b3cee/NumberofPeople.csv",
    "uploads/fd0107ab-a8d8-470b-be01-91e1521b3cee/Destination.csv"],
    txt_file_path: "uploads/fd0107ab-a8d8-470b-be01-91e1521b3cee/hiking.txt",

    isDraged:false,
}


export default (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        //--------------- init edit pannel-----------
        case ActionType.SET_FACT_INDEX:
            newState.editingFactIndex = action.editingFactIndex;
            //console.log('redux reducer action.type:', action.type)
            break;
        case ActionType.SET_EDITING_CHARTMODE:
            newState.chartmode = action.chartmode;
            break;
        case ActionType.SET_EDITING_BREAKDOWN:
            newState.breakdownField = action.breakdown;
            break;
        case ActionType.SET_EDITING_MEASURE:
            newState.measureField = action.measureField;
            newState.measureAgg = action.measureAgg
            break;
        case ActionType.SET_VISUALIZE_GENRE:
            newState.visualizationGenre = action.genre;
            break
        case ActionType.SET_VISUALIZE_TEMPLATE:
            newState.visualizationTemplate = action.template
            break
        case ActionType.CHANGEDFILE_LIST:
            newState.changeFileList = action.changeFileList
            break;
        case ActionType.IMAGE_LIST1:
            newState.imageFileList1 = action.fileList
            break;
        case ActionType.IMAGE_LIST2:
            newState.imageFileList2 = action.fileList
            break;
        case ActionType.IMAGE_LIST3:
            newState.imageFileList3 = action.fileList
            break;
        case ActionType.G1_MAIN_CHART:
            newState.mainChartIndex1 = action.index
            break;
        case ActionType.G2_MAIN_CHART:
            newState.mainChartIndex2 = action.index
            break;
        case ActionType.G3_MAIN_CHART:
            newState.mainChartIndex3 = action.index
            break;
        case ActionType.SET_FILEPATH:
            newState.csv_file_paths = action.csv_file_paths
            newState.txt_file_path = action.txt_file_path
            break;
        case ActionType.DRAGED_POINT:
            newState.isDraged = action.isDraged
            break;
        default:
            break;
    }
    console.log('newState: ',newState)
    return newState;
}