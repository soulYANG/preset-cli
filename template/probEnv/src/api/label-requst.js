import request from '../utils/http'
import  qs from 'qs'

//获取用户信息
export const apiGetCurrentUser = params => {
  return request('get', '/minor/portal/getCurrentUser', params);
}
//新增标签
export const apiInsertTag = params => {
  let args = qs.stringify(params,{arrayFormat:'repeat'});
  return request('post', '/minor/tag/insertTag', args);
}
//递归查询子标签
export const apiSelectChildren = params => {
  return request('get', '/minor/tag/selectChildren', params);
}
//根据ID查询标签
export const apiGetTagById = params => {
  return request('get', '/minor/tag/getTagById', params);
}
//更新标签
export const apiUpdateTag = params => {
  let args = qs.stringify(params,{arrayFormat:'repeat'});
  return request('put', '/minor/tag/updateTag', args);
}
//删除标签
export const apiDeleteTagById = params => {
  return request('delete', '/minor/tag/deleteTagById', params);
}