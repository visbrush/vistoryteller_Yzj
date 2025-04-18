import ActionType from './type'

export const setFactIndex = (editingFactIndex) => ({
    type: ActionType.SET_FACT_INDEX,
    editingFactIndex,
});
export const setEditingChartmode = (chartmode) => ({
    type: ActionType.SET_EDITING_CHARTMODE,
    chartmode,
})

export const setEditingBreakdown = (breakdown) => ({
    type: ActionType.SET_EDITING_BREAKDOWN,
    breakdown,
})

export const setEditingMeasure = (measureField, measureAgg) => ({
    type: ActionType.SET_EDITING_MEASURE,
    measureField,
    measureAgg
})

export const setEditingSubspace = (subspace) => ({
    type: ActionType.SET_EDITING_SUBSPACE,
    subspace
})


export const setVisualizationGenre = (genre) => ({
    type: ActionType.SET_VISUALIZE_GENRE,
    genre
})

export const setVisualizationTemplate = (template) => ({
    type: ActionType.SET_VISUALIZE_TEMPLATE,
    template
})

export const changedFileList = (fileList) => ({
    type: ActionType.CHANGEDFILE_LIST,
    fileList,
})

// genre==1 背景图片
export const imageFileList1 = (fileList) => ({
    type: ActionType.IMAGE_LIST1,
    fileList,
})

// genre==2 背景图片
export const imageFileList2 = (fileList) => ({
    type: ActionType.IMAGE_LIST2,
    fileList,
})

// genre==3 背景图片
export const imageFileList3 = (fileList) => ({
    type: ActionType.IMAGE_LIST3,
    fileList,
})

// 主图
export const changeG1MainChart = (index) => ({
    type: ActionType.G1_MAIN_CHART,
    index,
})

export const changeG2MainChart = (index) => ({
    type: ActionType.G2_MAIN_CHART,
    index,
})

export const changeG3MainChart = (index) => ({
    type: ActionType.G3_MAIN_CHART,
    index,
})



export const setFilePath = (csv_file_paths, txt_file_path) => ({
    type: ActionType.SET_FILEPATH,
    csv_file_paths,
    txt_file_path
})

export const dragedPoint=(isDraged)=>({
    type:ActionType.DRAGED_POINT,
    isDraged,
})