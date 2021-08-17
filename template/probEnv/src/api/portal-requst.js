import request from '../utils/http'

//获取用户信息
export const apiGetCurrentUser = params => {
  return request('get', '/minor/portal/getCurrentUser', params);
}
//查询实时预警
export const apiGetQueryssyj = params => {
  return request('get', '/minor/portal/queryssyj', params);
}
//查询通知通报
export const apiGetQuerytztb = params => {
  return request('get', '/minor/portal/querytztb', params);
}
//统计
export const apiGetStatistics = params => {
  return request('get', '/minor/itemSummary/queryByParentId', params);
}
//数据看板 今日态势
export const apiGetChartToday = params => {
  return request('get', '/minor/itemSummary/queryByParentId', params);
}
//数据看板 季度态势
export const apiGetChartQuarter = params => {
  return request('get', '/minor/itemSummary/queryjqjdts', params);
}
//重要指令
export const apiGetGagezyzl = params => {
  return request('get', '/minor/itemSummary/pagezyzl', params);
}
//获取主题信息
export const apiGetTopic = params => {
  return request('get', '/minor/portal/getTopic', params);
}
//查询应用URL
export const apiGetQueryApplicationUrl = params => {
  return request('get', '/minor/portal/queryApplicationUrl', params);
}
//查询实时情报
export const apiGetQueryssqb = params => {
  return request('get', '/minor/itemSummary/queryssqb', params);
}
//查询风险日历
export const apiGetQueryRiskCalendar = params => {
  return request('get', '/minor/itemSummary/queryRiskCalendar', params);
}
//查询情报预判
export const apiGetQueryqbypCount = params => {
  return request('get', '/minor/itemSummary/queryqbypCount', params);
}
//获取用户模块配置信息
export const apiGetQueryUserModule = params => {
  return request('get', '/minor/portal/queryUserModule', params);
}
//更新模块配置信息
export const apiInsertUserModule = params => {
  return request('post', '/minor/portal/insertUserModule', params);
}
//获取用户模块配置信息
export const apiGetQueryByParentId = params => {
  return request('get', '/minor/itemSummary/queryByParentId', params);
}
//获取词域监控数据
export const apiGetCyjkData = params => {
  return request('get', '/minor/itemSummary/queryPortal?type=monitor', params);
}
//获取数据1
export const apiGetDsqyData = params => {
  return request('get', '/minor/itemSummary/queryPortal?type=bigEvent', params);
}
//获取热点情报数据
export const apiGetRdqbData = params => {
  return request('get', '/minor/itemSummary/queryPortal?type=intelligence', params);
}