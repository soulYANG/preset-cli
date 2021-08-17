export function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

export function formatTime(str) {
  var date = '';
  if (str) {
    if (typeof (str) == 'object') {
      date = str
    } else {
      date = new Date(str)
    }
  } else {
    date = new Date();
  }
  var tempStr = '';
  tempStr += date.getFullYear();
  if (date.getMonth() < 9) {
    tempStr += '-0' + (date.getMonth() + 1);
  } else {
    tempStr += '-' + (date.getMonth() + 1);
  }
  tempStr += '-' + date.getDate();
  tempStr += ' ' + date.getHours();
  tempStr += ':' + date.getMinutes();
  tempStr += ':' + date.getSeconds();

  return tempStr
}

/**
 * 将数值四舍五入后格式化.
 *
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatNumber(num, cent, isThousand) {
  if (typeof num == 'string') {
    num = num.replace(/\$|\,/g, '');
  }
  // 检查传入数值为数值类型
  if (isNaN(num)) {
    num = "0";
  }
  // 获取符号(正/负数)
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
  let cents = num % Math.pow(10, cent); // 求出小数位数值
  num = Math.floor(num / Math.pow(10, cent)).toString(); // 求出整数位数值
  cents = cents.toString(); // 把小数位转换成字符串,以便求小数位长度

  // 补足小数位到指定的位数
  while (cents.length < cent)
    cents = "0" + cents;
  if (isThousand) {
    // 对整数部分进行千分位格式化.
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }

  if (cent > 0)
    return (((sign) ? '' : '-') + num + '.' + cents);
  else
    return (((sign) ? '' : '-') + num);
}
//封装localStorage
export const storage = {
  get(key) {
    if (key == null || typeof key !== "string") {
      return ""
    }
    try {
      return JSON.parse(localStorage.getItem(key)) || "";
    } catch (e) {
      return ""
    }
  },
  set(key, value) {
    if (value == null) {
      return localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }
}
//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//获取url参数
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}
//导出
export function excelOut(url) {
  window.open(url);
}