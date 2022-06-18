"use strict";var e=require("../../../common/vendor.js"),t=require("./preview.js");function r(t,r){try{return e.index.setStorageSync(t,r),!0}catch(n){return!1}}function n(t){try{const n=e.index.getStorageSync(t);try{return JSON.parse(n)}catch(r){return n}}catch(r){return}}let o,i=null;var a=Object.freeze(Object.defineProperty({__proto__:null,default:t.preview,splitData:function(e=[],t=1){let r=[],n=[];return e.forEach((e=>{n.length===t&&(n=[]),0===n.length&&r.push(n),n.push(e)})),r},timeMuch:function(e){let t={d:"00",h:"00",m:"00",s:"00"};if(e>0){let r=Math.floor(e/86400),n=Math.floor(e/3600%24),o=Math.floor(e/60%60),i=Math.floor(e%60);t.d=r<10?"0"+r:r,t.h=n<10?"0"+n:n,t.m=o<10?"0"+o:o,t.s=i<10?"0"+i:i}return t},getDateToNewData:function(e=(new Date).getTime()){"string"==typeof e&&(e=new Date(e).getTime());for(var t=(e+"").split(""),r=0;r<13;r++)t[r]||(t[r]="0");e=1*Number(t.join(""));var n=36e5,o=24*n,i=(new Date).getTime()-e;if(i<0)return"不久前";var a,u=i/2592e6,c=i/(7*o),s=i/o,l=i/n,f=i/6e4,d=function(e){return e<10?"0"+e:e};return u>12?(a=new Date(e)).getFullYear()+"年"+d(a.getMonth()+1)+"月"+d(a.getDate())+"日":u>=1?parseInt(u+"")+"月前":c>=1?parseInt(c+"")+"周前":s>=1?parseInt(s+"")+"天前":l>=1?parseInt(l+"")+"小时前":f>=1?parseInt(f+"")+"分钟前":"刚刚"},callPhone:function(t=""){let r=t.toString();return new Promise(((t,n)=>{e.index.makePhoneCall({phoneNumber:r,success:()=>t(!0),fail:e=>n(e)})}))},scanCode:function(t=!0,r=["barCode","qrCode","datamatrix","datamatrix"]){return new Promise(((n,o)=>{e.index.scanCode({onlyFromCamera:t,scanType:r,success:e=>n(e),fail:e=>o(e)})}))},setClipboardData:function(t){return new Promise(((r,n)=>{e.index.setClipboardData({data:t,success:()=>r(!0),fail:e=>n(e)})}))},getClipboardData:function(){return new Promise(((t,r)=>{e.index.getClipboardData({success:e=>t(e.data),fail:e=>r(e)})}))},setCookie:r,delCookie:function(t){try{return e.index.removeStorageSync(t),!0}catch(r){return!1}},getCookie:n,httpUrlAddKey:function(e,t,r){if(!r)return e;var n=new RegExp("([?&])"+t+"=.*?(&|$)","i"),o=-1!==e.indexOf("?")?"&":"?";return e.match(n)?e.replace(n,"$1"+t+"="+r+"$2"):e+o+t+"="+r},getUid:function(e=12){return Number(Number(Math.random().toString().substr(3,e)+Date.now()).toString(8))},debounce:function(e,t=500,r=!1){if(null!==i&&clearTimeout(i),r){var n=!i;i=setTimeout((()=>{i=null}),t),n&&"function"==typeof e&&e()}else i=setTimeout((()=>{"function"==typeof e&&e()}),t)},throttle:function(e,t=500,r=!0){r?o||(o=!0,"function"==typeof e&&e(),setTimeout((()=>{o=!1}),t)):o||(o=!0,setTimeout((()=>{o=!1,"function"==typeof e&&e()}),t))},deepClone:function e(t){if([null,void 0,NaN,!1].includes(t))return t;if("object"!=typeof t&&"function"!=typeof t)return t;var r=Array.isArray(t)?[]:{};for(let n in t)t.hasOwnProperty(n)&&(r[n]="object"==typeof t[n]?e(t[n]):t[n]);return r},quereyDom:function(t,r){return new Promise(((n,o)=>{e.index.createSelectorQuery().in(t).select(r).boundingClientRect((e=>{n(e)})).exec()}))}},Symbol.toStringTag,{value:"Module"}));exports.getCookie=n,exports.setCookie=r,exports.util=a;