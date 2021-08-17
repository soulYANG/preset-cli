import axios from 'axios'

let headers = {};
headers['Content-Type'] = (window.location.href.indexOf('label_index') > -1) ? 'application/x-www-form-urlencoded' : 'application/json';
console.log(process.env.NODE_ENV);
let environment = process.env.NODE_ENV;
let baseUrl = '';
let authUrl = '';
let callBackUrl = '';
let webSiteUrl = (window.location.href.indexOf('label_index') > -1) ? 'label_index' : '';
switch (environment) {
  case 'test':
    //测试环境
    baseUrl = 'http://192.168.57.167:8030';
    authUrl = 'http://192.168.57.167:8190/cas';
    callBackUrl = 'http://192.168.57.167:8030';
    //验收环境
    // baseUrl = 'http://192.168.57.167:8030';
    // authUrl = 'http://192.168.57.167:8190/cas';
    // callBackUrl = 'http://192.168.57.167:8030';
    break;
  case 'gray':
    //验收环境
    // baseUrl = 'http://50.73.68.76:8001';
    // authUrl = 'http://50.73.70.90:8080/cas';
    // callBackUrl = window.location.origin;
    //测试环境
    baseUrl = 'http://50.73.68.76:8089';
    authUrl = 'http://50.73.70.90:8080/cas';
    callBackUrl = window.location.origin;
    break;
  case "prod":
    //生产环境
    baseUrl = 'http://fengren.zh.szh.js:8089';
    authUrl = 'http://tyyh.szh.js:9080/cas';
    callBackUrl = window.location.origin;
    break;
  default:
    //本地环境
    baseUrl = 'http://192.168.57.167:8030';
    authUrl = 'http://192.168.57.167:8190/cas';
    callBackUrl = window.location.origin;
}

var instance = axios.create({
  baseUrl: baseUrl,
  timeout: 5000,
  headers: headers
});

instance.defaults.withCredentials = true;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response && response.data.code == 601) {
    // 判断登录IP限制是否有权限（601无权限）请求CAS退出登录
    window.location.href = `${authUrl}/logout?service=${authUrl}/login?service=${baseUrl}/minor/single/gotoUrl?url=${callBackUrl}/${webSiteUrl}`;
  } else {
    return { ...response.data };
  }
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.location.href = `${authUrl}/login?service=${baseUrl}/minor/single/gotoUrl?url=${callBackUrl}/${webSiteUrl}`;
        return;
    }
  }
  return Promise.reject(error.response);
})

export {authUrl,baseUrl,callBackUrl,webSiteUrl}

//发送请求
export default function request(method, url, data, external) {
  url = external ? url : baseUrl + url;
  if (method == 'post') {
    return instance.post(url, data);
  } else if (method == 'get') {
    return instance.get(url, {
      params: data
    });
  } else if (method == 'delete') {
    return instance.delete(url, {
      params: data
    });
  } else if (method == 'put') {
    return instance.put(url, data);
  }
}