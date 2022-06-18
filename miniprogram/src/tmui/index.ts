import themeTool from './tool/theme/theme';
import preview,* as util from './tool/function/util';

const $tm = {
	isColor: themeTool.isCssColor,
	u: {...util,preview},
	// local:language
};
uni.$tm = $tm

// #ifndef APP-PLUS-NVUE
//配置国际化标准语言。
import en from './locale/en.json'
import zhHans from './locale/zh-Hans.json'


const messages  = {
	en,
	'zh-Hans':zhHans
}
let i18nConfig = {
  locale: uni.getLocale(),// 获取已设置的语言
  messages
}
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
// #endif

export default {
	install: (app:any, options:object) => {
		// #ifndef APP-PLUS-NVUE
		app.use(i18n)
		// #endif
		app.config.globalProperties.$tm = $tm;
	}
};
