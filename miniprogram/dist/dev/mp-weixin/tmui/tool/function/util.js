"use strict";
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_function_preview = require("./preview.js");
function splitData(oArr = [], length = 1) {
  let arr = [];
  let minArr = [];
  oArr.forEach((c) => {
    if (minArr.length === length) {
      minArr = [];
    }
    if (minArr.length === 0) {
      arr.push(minArr);
    }
    minArr.push(c);
  });
  return arr;
}
function timeMuch(t) {
  let format = {
    d: "00",
    h: "00",
    m: "00",
    s: "00"
  };
  if (t > 0) {
    let d = Math.floor(t / 86400);
    let h = Math.floor(t / 3600 % 24);
    let m = Math.floor(t / 60 % 60);
    let s = Math.floor(t % 60);
    format.d = d < 10 ? "0" + d : d;
    format.h = h < 10 ? "0" + h : h;
    format.m = m < 10 ? "0" + m : m;
    format.s = s < 10 ? "0" + s : s;
  }
  return format;
}
function getDateToNewData(timestamp = new Date().getTime()) {
  if (typeof timestamp == "string") {
    timestamp = new Date(timestamp).getTime();
  }
  var arrTimestamp = (timestamp + "").split("");
  for (var start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = "0";
    }
  }
  timestamp = Number(arrTimestamp.join("")) * 1;
  var minute = 1e3 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - timestamp;
  if (diffValue < 0) {
    return "\u4E0D\u4E45\u524D";
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var zero = function(value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };
  if (monthC > 12) {
    return function() {
      var date = new Date(timestamp);
      return date.getFullYear() + "\u5E74" + zero(date.getMonth() + 1) + "\u6708" + zero(date.getDate()) + "\u65E5";
    }();
  } else if (monthC >= 1) {
    return parseInt(monthC + "") + "\u6708\u524D";
  } else if (weekC >= 1) {
    return parseInt(weekC + "") + "\u5468\u524D";
  } else if (dayC >= 1) {
    return parseInt(dayC + "") + "\u5929\u524D";
  } else if (hourC >= 1) {
    return parseInt(hourC + "") + "\u5C0F\u65F6\u524D";
  } else if (minC >= 1) {
    return parseInt(minC + "") + "\u5206\u949F\u524D";
  }
  return "\u521A\u521A";
}
function callPhone(phoneNumber = "") {
  let num = phoneNumber.toString();
  return new Promise((rs, rj) => {
    common_vendor.index.makePhoneCall({
      phoneNumber: num,
      success: () => rs(true),
      fail: (err) => rj(err)
    });
  });
}
function scanCode(onlyFromCamera = true, scanType = ["barCode", "qrCode", "datamatrix", "datamatrix"]) {
  return new Promise((rs, rj) => {
    common_vendor.index.scanCode({
      onlyFromCamera,
      scanType,
      success: (res) => rs(res),
      fail: (error) => rj(error)
    });
  });
}
function setClipboardData(data) {
  return new Promise((rs, rj) => {
    common_vendor.index.setClipboardData({
      data,
      success: () => rs(true),
      fail: (error) => rj(error)
    });
  });
}
function getClipboardData() {
  return new Promise((rs, rj) => {
    common_vendor.index.getClipboardData({
      success: (res) => rs(res.data),
      fail: (error) => rj(error)
    });
  });
}
function setCookie(key, data) {
  try {
    common_vendor.index.setStorageSync(key, data);
    return true;
  } catch (e) {
    return false;
  }
}
function delCookie(key) {
  try {
    common_vendor.index.removeStorageSync(key);
    return true;
  } catch (e) {
    return false;
  }
}
function getCookie(key) {
  try {
    const value = common_vendor.index.getStorageSync(key);
    try {
      let val = JSON.parse(value);
      return val;
    } catch (e) {
      return value;
    }
  } catch (e) {
    return void 0;
  }
}
function httpUrlAddKey(uri, key, value) {
  if (!value) {
    return uri;
  }
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}
function getUid(length = 12) {
  return Number(Number(Math.random().toString().substr(3, length) + Date.now()).toString(8));
}
let timeout = null;
function debounce(func, wait = 500, immediate = false) {
  if (timeout !== null)
    clearTimeout(timeout);
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow)
      typeof func === "function" && func();
  } else {
    timeout = setTimeout(() => {
      typeof func === "function" && func();
    }, wait);
  }
}
let flag;
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func === "function" && func();
      setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func === "function" && func();
      }, wait);
    }
  }
}
function deepClone(obj) {
  if ([null, void 0, NaN, false].includes(obj))
    return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    return obj;
  }
  var o = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
function quereyDom(t, node) {
  return new Promise((res, rej) => {
    const query = common_vendor.index.createSelectorQuery().in(t);
    query.select(node).boundingClientRect((el) => {
      res(el);
    }).exec();
  });
}
var util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": tmui_tool_function_preview.preview,
  splitData,
  timeMuch,
  getDateToNewData,
  callPhone,
  scanCode,
  setClipboardData,
  getClipboardData,
  setCookie,
  delCookie,
  getCookie,
  httpUrlAddKey,
  getUid,
  debounce,
  throttle,
  deepClone,
  quereyDom
}, Symbol.toStringTag, { value: "Module" }));
exports.getCookie = getCookie;
exports.setCookie = setCookie;
exports.util = util;
