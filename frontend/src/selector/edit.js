// import { createSelector } from 'reselect';
export const editingFactIndex = state => state.edit.editingFactIndex;

//story upload
export const datasetSchema = state => state.story.datasetSchema
export const mergedfile_url = state => state.story.mergedfile_url
//story generate
export const captionList = state => state.story.captionList
export const titleList = state => state.story.titleList
export const originFactList = state => state.story.originFactList
export const infoTitle = state => state.story.infoTitle
export const keyPoint = state => state.story.keyPoint
export const factList = state => state.story.factList
export const animationFactList = state => state.story.animationFactList
export const questionList = state => state.story.questionList
export const circleIndex = state => state.story.circleIndex
export const targetQuestion = state => state.story.targetQuestion
export const uniqueResult = state => state.story.uniqueResult
export const outlineCurve = state => state.story.outlineCurve

export const explanation = state => state.story.explanation
export const conversation = state => state.story.conversation

//user
export const operateState = state => state.user.operateState

//edit
export const chartmode = state => state.edit.chartmode
export const breakdownField = state => state.edit.breakdownField
export const measureField = state => state.edit.measureField
export const measureAgg = state => state.edit.measureAgg

export const visualizationGenre = state => state.edit.visualizationGenre
export const visualizationTemplate = state => state.edit.visualizationTemplate
export const changedFileList = state => state.edit.changedFileList
export const mainChartIndex1 = state => state.edit.mainChartIndex1//genre1改变主图 
export const mainChartIndex2 = state => state.edit.mainChartIndex2//genre2改变主图 
export const mainChartIndex3 = state => state.edit.mainChartIndex3//genre3改变主图 

export const imageFileList1 = state => state.edit.imageFileList1
export const imageFileList2 = state => state.edit.imageFileList2
export const imageFileList3 = state => state.edit.imageFileList3


export const csv_file_paths = state => state.edit.csv_file_paths
export const txt_file_path = state => state.edit.txt_file_path

export const isDraged = state => state.edit.isDraged
