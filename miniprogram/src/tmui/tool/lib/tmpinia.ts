import { defineStore} from 'pinia';
import themeColor from '../theme/theme'
import * as u from '../function/util'
import { tmVuetify,wxshareConfig } from './interface'
let pdefault_cookies_color = u.getCookie('setTmVuetifyColor')||"";
let pdefault_cookies_black = u.getCookie('setTmVuetifyBlack')
let pdefault_cookies_local = u.getCookie('setTmVuetifyLocal')||'zh-Hans';
let dark = typeof pdefault_cookies_black === 'boolean' ? pdefault_cookies_black : false;
let themeObj = new themeColor.themeColors();
const colorArray = themeObj.colors;
const os = uni.getSystemInfoSync().platform

// 为 store state 声明类型
export interface State {
	tmVuetify: tmVuetify
  }

export const useTmpiniaStore = defineStore('tmpinia', {
	state: () => {
		return {
			tmStore: {
				color: pdefault_cookies_color,
				dark: dark,
				tmVueTifly_pages: '',
				tmVueTifly_pagesIndex: '',
				os:os,
				//这里是微信小程序和微信H5的配置资料。
				wxshareConfig_miniMp: {
					title: '', // 分享标题
					desc: '', // 描述
					imageUrl: '', // 分享图片
					path: '', // 分享路径
					copyLink: '', // 复制链接
					query: {}, // 分享参数
				},
				//当前存储存的主题对象。
				colorList: colorArray,
				//当前的语言
				local:pdefault_cookies_local
			}
		}
	},
	actions: {
		setPageNow(url:string) {
            this.tmStore = {
				...this.tmStore,
				tmVueTifly_pages: url
			}
		},
		setPageNowIndex( index:string) {
			this.tmStore = {
				...this.tmStore,
				tmVueTifly_pagesIndex: index
			}
		},
		setTmVuetifyDark(dark:boolean) {
			dark = typeof dark !=='boolean'?false:dark;
			this.tmStore = {
				...this.tmStore,
				dark: dark
			}
			u.setCookie('setTmVuetifyBlack', dark)
		},
		setWxShare(cfg:wxshareConfig) {
			let pcf = cfg || {};
			if (typeof pcf !== 'object' || Array.isArray(cfg)) pcf = {};
			this.tmStore = {
				...this.tmStore,
				wxshareConfig_miniMp: {
					...this.tmStore.wxshareConfig_miniMp,
					...pcf
				}
			}
		},
		setTmVuetifyTheme(color:string) {
			let defaultColorName = color
			if (!defaultColorName || defaultColorName == ""||themeColor.isCssColor(defaultColorName)) {
				defaultColorName = 'primary';
				console.error('不支持自定义组件上的颜色值，请在theme/theme.js中添加自定义的颜色值为主题。当前已切换为primary主题。');
			}
			this.tmStore = {...this.tmStore,color:defaultColorName};
			u.setCookie('setTmVuetifyColor', defaultColorName)
		},
		setTmLocal(language:string){
			language = language || 'zh-Hans';
			u.setCookie('setTmVuetifyLocal', language);
			this.tmStore = {
				...this.tmStore,
				local: language
			}
		}
	},
});