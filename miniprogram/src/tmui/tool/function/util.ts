
// #ifdef H5
// var clipboardJS = require( from ''./clipboardJS'');
// import clipboardJS from './clipboardJS'
// #endif
import {ComponentInternalInstance} from 'vue'
/**
 * 预览图片。
 @param {Object} url 必填 当前预览的图片链接。
 @param {Object} list 可以是url数组，也可以是对象，数据比如：["http:url"] or [{url:"https:url",...}]
 @param {Object} rangKey 如果list是对象数组，需要提供url字段。
 */
import {preview} from "./preview.js"
export default preview;
/**
* 数据分组
* @param {Array} oArr - 原数组列表
* @param {Number} length - 单个数组长度
* @return {Array}  arr - 分组后的新数组
*/
export function splitData(oArr = [], length = 1) {
	let arr:Array<any> = [];
	let minArr:Array<any> = [];
	oArr.forEach(c => {
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

/**
* 剩余时间格式化
* @param {Number} t - 剩余多少秒
* @return {Object}  format - 格式后的天时分秒对象
*/
export function timeMuch(t:number) {
	let format:any = {
		d: '00',
		h: '00',
		m: '00',
		s: '00'
	};
	if (t > 0) {
		let d = Math.floor(t / 86400);
		let h = Math.floor((t / 3600) % 24);
		let m = Math.floor((t / 60) % 60);
		let s = Math.floor(t % 60);
		format.d = d < 10 ? '0' + d : d;
		format.h = h < 10 ? '0' + h : h;
		format.m = m < 10 ? '0' + m : m;
		format.s = s < 10 ? '0' + s : s;
	}
	return format;
}
//获取时间距离当前时间
export function getDateToNewData(timestamp:number|string|Date = new Date().getTime()){
	if(typeof timestamp == 'string'){
		timestamp = new Date(timestamp).getTime();
	}
	
	 // 补全为13位
	 var arrTimestamp:Array<string> = (timestamp + '').split('');
	 for (var start = 0; start < 13; start++) {
		 if (!arrTimestamp[start]) {
			 arrTimestamp[start] = '0';
		 }
	 }
	 timestamp = Number(arrTimestamp.join(''))* 1;
 
	 var minute = 1000 * 60;
	 var hour = minute * 60;
	 var day = hour * 24;
	 var halfamonth = day * 15;
	 var month = day * 30;
	 var now = new Date().getTime();
	 var diffValue = now - timestamp;
 
	 // 如果本地时间反而小于变量时间
	 if (diffValue < 0) {
		 return '不久前';
	 }
	 // 计算差异时间的量级
	 var monthC = diffValue / month;
	 var weekC = diffValue / (7 * day);
	 var dayC = diffValue / day;
	 var hourC = diffValue / hour;
	 var minC = diffValue / minute;
 
	 // 数值补0方法
	 var zero = function (value:number) {
		 if (value < 10) {
			 return '0' + value;
		 }
		 return value;
	 };
 
	 // 使用
	 if (monthC > 12) {
		 // 超过1年，直接显示年月日
		 return (function () {
			 var date = new Date(timestamp);
			 return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
		 })();
	 } else if (monthC >= 1) {
		 return parseInt(monthC+'') + "月前";
	 } else if (weekC >= 1) {
		 return parseInt(weekC+'') + "周前";
	 } else if (dayC >= 1) {
		 return parseInt(dayC+'') + "天前";
	 } else if (hourC >= 1) {
		 return parseInt(hourC+'') + "小时前";
	 } else if (minC >= 1) {
		 return parseInt(minC+'') + "分钟前";
	 }
	 return '刚刚'; 
}

/**
* 打电话
* @param {String<Number>} phoneNumber - 数字字符串
* @return {Promise}
*/
export function callPhone(phoneNumber = '') {
	let num = phoneNumber.toString()
	return new Promise((rs,rj)=>{
		uni.makePhoneCall({
			phoneNumber: num,
			success:()=> rs(true),
			fail:(err)=> rj(err)
		});
	})
}

/**
 * 调起客户端相机扫码。
 * @param {Boolean} onlyFromCamera true 是否只允许相机扫码识别
 * @param {Array<string>} scanType ['barCode', 'qrCode', 'datamatrix','datamatrix']
 * @returns Promise 成功返回相关数据结构
 */
 export function scanCode(onlyFromCamera = true, scanType = ['barCode', 'qrCode', 'datamatrix','datamatrix']){
	// #ifdef H5
	return Promise.reject('不支持H5');
	// #endif
	return new Promise((rs,rj)=>{
		uni.scanCode({
			onlyFromCamera: onlyFromCamera,
			scanType: scanType,
			success: (res) => rs(res),
			fail:(error)=>rj(error)
		});
	})
}

/**
 * 设置剪切板内容。
 * @param {String} data 
 * @returns Promise true/false
 */
 export function setClipboardData(data:string){

	// #ifndef H5
	return new Promise((rs,rj)=>{
		uni.setClipboardData({
			data: data,
			success:()=>rs(true),
			fail:(error)=>rj(error)
		});
	})
	// #endif
	// #ifdef H5
	return new Promise((rs,rj)=>{
		let btn = document.createElement('button');
		btn.style.display = 'none';
		btn.className='hi-test-hi';
		document.body.appendChild(btn);
		clipboardJS = clipboardJS.bind(window);
		let cb = new clipboardJS('.hi-test-hi', {
			text: () => data
		})
		
		cb.on('success', function (res) {
			rs(true);
		})
		cb.on('error', function (err) {
			rj(err)
		})
		btn.click = btn.click.bind(window.document.body.querySelector('.hi-test-hi'))
		btn.click()
	})
	// #endif
}
/**
 * 获取剪切板内容
 * @returns Promise 剪切板内容
 */
 export function getClipboardData(){
	// #ifndef H5
	return new Promise((rs, rj) => {
		uni.getClipboardData({
			success: (res) => rs(res.data),
			fail: (error) => rj(error)
		});
	})
	// #endif
	// #ifdef H5
	return Promise.reject('H5无法获取剪切板内容')
	// #endif
}

/**
 * 设置cookie数据
 * @param {String} key 键值
 * @param {String} data 值
 * @returns Boolean
 */
 export function setCookie(key:string, data:any) {
	try {
		uni.setStorageSync(key, data);
		return true;
	} catch (e) {
		return false;
	}
}
/**
 * 删除一个本地cookie
 * @param {String} key 键值
 * @returns Boolean
 */
 export function delCookie(key:string) {
	try {
		uni.removeStorageSync(key);
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * 获取一个cookie数据
 * 如果存入的是对象，返回的也是对象。如果是string返回的也是字符串。
 * @param {String} key 键
 * @returns json/string
 */
 export function getCookie(key:string) {
	try {
		const value = uni.getStorageSync(key);
		try {
			let val = JSON.parse(value)
			return val;
		} catch (e) {
			return value;
		}
	} catch (e) {
		return undefined;
	}
}


/**
 * 向地址连接追加参数。
 * @param {string} uri 网址
 * @param {string} key 字段
 * @param {string} value 字段值
 * @returns 
 */
 export function httpUrlAddKey(uri:string, key:string, value:string) {
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
export function getUid (length=12){
	
	return Number(Number(Math.random().toString().substr(3,length) + Date.now()).toString(8));
}

/*
防抖
防抖原理：在一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
	@param {Function} func 要执行的回调函数
	@param {Number} wait 延迟的时间
	@param{Boolean} immediate 是否要立即执行
*/
let timeout:number|null = null;
export function debounce(func:Function, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === "function" && func();
    }, wait);
  }
}

/**
 * 节流
	节流原理：在一定时间内，只能触发一次
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timer:number|null, flag:boolean;
export function throttle(func:Function, wait = 500, immediate = true) {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}
		
	}
};


// 深度克隆
export function deepClone (obj:any) {
	// 对常见的“非”值，直接返回原来值
	if([null, undefined, NaN, false].includes(obj)) return obj;
    if(typeof obj !== "object" && typeof obj !== 'function') {
		//原始类型直接返回
        return obj;
    }
    var o:any = Array.isArray(obj) ? [] : {};
    for(let i in obj) {
        if(obj.hasOwnProperty(i)){
            o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
        }
    }
    return o;
}

export function quereyDom(t:ComponentInternalInstance,node:string){
	// #ifdef APP-NVUE
	const dom:any = uni.requireNativePlugin('dom')
	return new Promise((res,rej)=>{
		setTimeout(function(){
			node = node.replace(/#\./g,'')
			
			dom.getComponentRect(t.refs[node], function(el:any) {
				res(el.size);
			})
		},60)
	})
	// #endif
	// #ifndef APP-NVUE
	return new Promise((res,rej)=>{
		const query = uni.createSelectorQuery().in(t);
		query.select(node).boundingClientRect(el => {
			res(el);
		}).exec();
	})
	// #endif
}

