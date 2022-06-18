<template>
	<tm-sheet 
	no-level
	:_style="[{opacity:isclickOn||_disabled?0.7:1}]" 
	:round="props.round" 
	:width="btnSize.w" 
	:height="btnSize.h" 
	:padding="props.padding" 
	:margin="props.margin"
	:color="props.color" 
	:shadow="props.shadow"
	:transprent="props.transprent"
	:linear="props.linear"
	:linear-deep="props.linearDeep"
	:text="props.text"
	:outlined="props.outlined"
	:dark="props.dark"
	:follow-dark="props.followDark"
	:follow-theme="props.followTheme"
	:border-direction="props.borderDirection"
	:border-style="props.borderStyle"
	:border="props.border"
	_class="flex flex-row flex-center">
		<button 
		@click="onclick"
		@touchstart="touchstart" 
		@touchend="touchend" 
		@longpress="emits('longpress',$event)"
		@touchcancel="isclickOn=false;emits('touchcancel',$event)"
		@touchmove="emits('touchmove',$event)"
		@getphonenumber="emits('getphonenumber',$event)"
		@getuserinfo="emits('getuserinfo',$event)"
		@error="emits('error',$event)"
		@opensetting="emits('opensetting',$event)"
		@launchapp="emits('launchapp',$event)"
		@contact="emits('contact',$event)"
		
		:form-type="props.formType"
		:openType="props.openType"
		:appParameter="props.appParameter"
		:sessionFrom="props.sessionFrom"
		:sendMessageTitle="props.sendMessageTitle"
		:sendMessagePath="props.sendMessagePath"
		:sendMessageImg="props.sendMessageImg"
		:sendMessageCard="props.sendMessageCard"
		:loading="_load"
		:disabled="_disabled"
		:hover-start-time="10000000" 
		hover-stop-propagation hover-class="buttonHover" 
		class="button flex-1  flex-center" 
		:class="[customClass]"
		:style="[{height:btnSize.h+'rpx'},customCSSStyle]" 
		style="border: 0px solid rgba(0, 0, 0, 0);background: rgba(0, 0, 0, 0);border-radius: 0px;">
			<slot>
				<tm-icon :userInteractionEnabled="false" :_class="_label?'pr-10':''" :fontSize="btnSize.fontSize*0.9" :name="_icon"></tm-icon>
				<tm-text :userInteractionEnabled="false" :fontSize="btnSize.fontSize" :label="_label"></tm-text>
			</slot>
		</button>
	</tm-sheet>
</template>

<script lang="ts" setup>
/**
 * 按钮
 * @description 属性与原生按钮一致，对于微信登录授权进行了便捷封装。
 * @slot default 默认插槽。
 */
import {computed,PropType,ref,getCurrentInstance } from "vue"
import tmSheet from "../tm-sheet/tm-sheet.vue"
import tmText from "../tm-text/tm-text.vue"
import tmIcon from "../tm-icon/tm-icon.vue";
import {custom_props,computedClass,computedStyle} from "../../tool/lib/minxs";
/**
 * 事件说明
 * @description 事件属性与原生 一 致
 * @links 见官网：https://uniapp.dcloud.io/component/button.html
 */
const emits = defineEmits(
[
	"click",
	"touchstart",
	'touchmove',
	'touchcancel',
	'touchend',
	'tap',
	'longpress',
	'getphonenumber',
	'getuserinfo',
	'getUserProfile',
	'error',
	'opensetting',
	'launchapp',
	'contact'
])
const {proxy} = getCurrentInstance();
const props = defineProps({
	...custom_props,
	transprent:{
		type:Boolean,
		default:false
	},
	/**
	 * mini,normal,middle,large
	 */
	size:{
		type:String,
		default:'normal'
	},
	fontSize:{
		type:Number,
		default:0
	},
	margin:{
		type:Array as PropType<Array<number>>,
		default:()=>[0,16]
	},
	padding:{
		type:Array as PropType<Array<number>>,
		default:()=>[0,0]
	},
	
	shadow:{
		type:Number,
		default:2
	},
	width:{
		type:Number,
		default:0
	},
	height:{
		type:Number,
		default:0
	},
	//如果为true，采用块状flex布局，自动宽和高度。
	block:{
		type:Boolean,
		default:false
	},
	round:{
		type:Number,
		default:2
	},
	loading:{
		type:Boolean,
		default:false
	},
	disabled:{
		type:Boolean,
		default:false
	},
	//提供时，点击后会中转到对应页面。
	url:{
		type:String,
		default:''
	},
	label:{
		type:String,
		default:''
	},
	icon:{
		type:String,
		default:''
	},
	/**
	 * submit,reset 在tm-form中使用。
	 */
	formType:{
		type:String,
		default:''
	},
	//开放能力
	openType:{
		type:String,
		default:''
	},
	//打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
	appParameter:{
		type:String,
		default:''
	},
	sessionFrom:{
		type:String,
		default:''
	},
	sendMessageTitle:{
		type:String,
		default:''
	},
	sendMessagePath:{
		type:String,
		default:''
	},
	sendMessageImg:{
		type:String,
		default:''
	},
	sendMessageCard:{
		type:String,
		default:''
	}
})
/** -----------form专有------------ */
const formtype = computed(()=>props.formType)
//父级方法。
let FormParent = null;
if(formtype.value=='reset'||formtype.value=='submit'){
	FormParent = proxy.$parent
	while (FormParent) {
		if (FormParent?.tmFormComnameId == 'tmFormId' || !FormParent) {
			break;
		} else {
			FormParent = FormParent?.$parent ?? undefined
		}
	}
}
/** -----------end------------ */
//自定义样式：
const customCSSStyle = computed(()=>computedStyle(props));
//自定类
const customClass = computed(()=>computedClass(props));
const isclickOn = ref(false);
const _load = computed(()=>props.loading)
const _disabled = computed(()=>props.disabled)
const _label = computed(()=>props.label)
const _icon = computed(()=>props.icon)
const btnSize = computed(()=>{
	let fontSize = props.fontSize||0;
	
	if(props.block){
		return {w:0,h:props.height?props.height:88,fontSize:fontSize||30}
	}
	if(props.width||props.height){
		return {w:props.width,h:props.height,fontSize:fontSize||30}
	}
	if(props.size=='mini'){
		return {w:88,h:50,fontSize:fontSize||22}
	}
	if(props.size=='normal'){
		return {w:220,h:88,fontSize:fontSize||28}
	}
	if(props.size=='middle'){
		return {w:310,h:88,fontSize:fontSize||30}
	}
	if(props.size=='large'){
		return {w:500,h:100,fontSize:fontSize||34}
	}

	return {w:220,h:88,fontSize:fontSize||28}
})



function touchstart(e){
	isclickOn.value = true
	emits("touchstart",e)
}
function touchend(e){
	isclickOn.value = false
	emits("touchend",e)
}

function onclick(e){
		if(FormParent!=null && typeof FormParent !='undefined'&&formtype.value){
			FormParent[formtype.value]();
		}
		emits('click', e);
		if (props.url !== '' && typeof props.url === 'string') {
			let url = props.url;
			if (url[0] !== '/') url = '/' + url;
			uni.navigateTo({
				url: url
			});
			return;
		}
		if(props.openType=='getUserInfo' || props.openType == 'getUserProfile'){
			// #ifdef MP-WEIXIN
			uni.getUserProfile({
				desc: '需要获取用户信息',
				lang: 'zh',
				complete: function (userProfile) {
					if(userProfile.errMsg !='getUserProfile:ok'){
						
						uni.showToast({
							title:userProfile.errMsg,icon:'error',mask:true
						})
						return;
					}
					emits('getuserinfo', userProfile);
					emits('getUserProfile', userProfile);
				},
				fail: (error) => {
					uni.showToast({
						title:error
					})
				}
			});
			// #endif
		}
		
		
}





</script>

<style scoped>
.button{
	background: rgba(0, 0, 0, 0);
	border: 0px solid rgba(0, 0, 0, 0);
	padding: 0px;
}
.button::after{
	background: rgba(0, 0, 0, 0);
	border: 0px solid rgba(0, 0, 0, 0);
}
.buttonHover{
	background: rgba(0, 0, 0, 0);
}

.bhover{
	opacity: 0.7;
}

</style>
