<template>
	<tm-sheet 
	:no-level="!_value"
	:followTheme="props.followTheme"
	:followDark="props.followDark"
	:dark="props.dark"
	:shadow="props.shadow"
	:outlined="props.outlined"
	:borderStyle="props.borderStyle"
	:borderDirection="props.borderDirection"
	:linearDeep="props.linearDeep"
	:linear="_value?props.linear:''" :round="viewSize.round" 
	:color="_value?props.color:props.unCheckedColor" 
	:height="viewSize.height" 
	:width="viewSize.width" 
	:_class="['flex relative flex-col',props.disabled?'opacity-4':'']" 
	:text="_value?false:props.text"
	:padding="[4,4]" :margin="props.margin">
		<view class="flex flex-row flex-betwwen" :style="[{width:viewSize.coenteWidth+'rpx',height:viewSize.innerHeight+'rpx'}]">
			<view class="flex-1 flex-row flex-row-center-center"><tm-text :font-size="viewSize.fontSize" :label="props.label[0]"></tm-text></view>
			<view class="flex-1 flex-row flex-row-center-center"><tm-text :font-size="viewSize.fontSize" :label="props.label[1]"></tm-text></view>
		</view>
		<view :class="['absolute base',_value?'on':'off',]" 
		ref="switch"
		:style="[
		{
			width:viewSize.innerWidth+'rpx',
			'transition-duration':'0.200s',
			'transition-timing-function':'ease',
			'transition-property':'transform,width, height, background-color,',
			
		}]" 
		class="flex flex-col">
		
			<tm-sheet
			@click="switchClick"
			:padding="[0,0]"
			:margin="[0,0]"
			:height="viewSize.innerHeight"
			:color="props.barColor"
			:follow-dark="false"
			:round="viewSize.round"
			_class="flex flex-center"
			>
				
			   <tm-icon v-if="_load" :font-size="viewSize.fontSize" :color="props.color" :userInteractionEnabled="false" name="tmicon-loading" spin></tm-icon>
			   <tmTranslate name="zoom" v-if="!_load&&_value">
				   <tm-icon :font-size="viewSize.fontSize" :color="props.color"  :userInteractionEnabled="false" :name="props.barIcon"></tm-icon>
			   </tmTranslate>
			</tm-sheet>
		</view>
	</tm-sheet>
</template>

<script lang="ts" setup>
/**
 * 开关
 * @description 便捷的选择框。可以加载中，异步开关。
 */
import { computed,ref,getCurrentInstance,onMounted,onUnmounted, watchEffect, watch, nextTick ,inject, PropType} from 'vue';
import { custom_props } from '../../tool/lib/minxs';
import tmSheet from '../tm-sheet/tm-sheet.vue';
import tmText from '../tm-text/tm-text.vue';
import tmIcon from '../tm-icon/tm-icon.vue';
import tmTranslate from '../tm-translate/tm-translate.vue';
// #ifdef APP-PLUS-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
/**
 * 事件说明
 * update:modelValue v-model双向绑定数据。
 */
const emits = defineEmits(['update:modelValue','change','click'])
const {proxy} = getCurrentInstance();
const props = defineProps({
	...custom_props,
	margin:{
		type:Array as PropType<Array<number>>,
		default:()=>[0,0]
	},
	transprent:{
		type:Boolean,
		default:false
	},
	defaultValue:{
		type:Boolean,
		default:false
	},
	modelValue:{
		type:Boolean,
		default:false
	},
	width:{
		type:Number,
		default:0
	},
	height:{
		type:Number,
		default:0
	},
	size:{
		type:String,
		default:'normal' //mini,normal,large
	},
	//激活后的主题色
	color:{
		type:String,
		default:'primary'
	},
	//未激活的背景色
	unCheckedColor:{
		type:String,
		default:'grey-3'
	},
	// 小圆球冒的背景色。
	barColor:{
		type:String,
		default:'white'
	},
	round:{
		type:Number,
		default:10
	},
	load:{
		type:Boolean,
		default:false
	},
	beforeChecked:{
		type:[Function,Boolean,String],
		default:()=>false
	},
	/**
	 * 自定义打开成功后的bar上的小图标。
	 */
	barIcon:{
		type:String,
		default:'tmicon-check'
	},
	disabled:{
		type:Boolean,
		default:false
	},
	label:{
		type:Array as PropType<Array<string>>,
		default:()=>["",""]
	}
})

const viewSize = computed(()=>{
	let width = 0;
	let height = 0;
	let fontSize = 24;
	let gutter = 4;
	
	let round = props.round;
	if(props.width&&props.height){
		width = props.width;
		height = props.height;
		fontSize = height*0.45
		// #ifdef H5
		gutter=6
		// #endif
	}else{
		if(props.size == 'normal'){
			width = 100;
			height = 54
			fontSize = 26
		}else if(props.size == 'mini'){
			width = 60;
			height = 34
			fontSize = 22
		}else if(props.size == 'large'){
			width = 120;
			height = 64
			fontSize = 32
			round = 24;
		}
	}
	return {
		width:width,
		height:height,
		innerHeight:(height-gutter),
		innerWidth:(width)/2,
		coenteWidth:width-gutter,
		conentWidthPx:uni.upx2px(width-gutter-(width)/2),
		fontSize:fontSize,
		round:round
	}
})

const _value = ref(false);
if(props.defaultValue){
	_value.value = props.defaultValue;
	
}
let bindxToken:any = null;
const _load = ref(false)
watchEffect(()=>{
	_load.value = props.load;
})
async function switchClick(){
	emits('click')
	if(_load.value||props.disabled) return;
	 if (typeof props.beforeChecked === 'function') {
        _load.value=true;
        let p = await props.beforeChecked();
        if(typeof p === 'function'){
            p = await p();
        }
        _load.value=false;
        if (!p) return;
    }
	
	_value.value = !_value.value

	spinNvueAni(_value.value)
	
	emits('change',_value.value)
	emits('update:modelValue',_value.value)
}
watch(()=>props.modelValue,(newval:boolean)=>{
	_value.value = newval;
	spinNvueAni(newval);
})
onMounted(()=>{
	nextTick(()=>spinNvueAni(_value.value))
})

function spinNvueAni(reveser=false) {
	// #ifdef APP-PLUS-NVUE
	if (!proxy.$refs['switch']) return;
	var testEl = proxy.$refs.switch;
	animation.transition(testEl, {
		styles: {
			transform: reveser?`translateX(${viewSize.value.conentWidthPx}px)`:'translateX(0%)',
			transformOrigin: 'center center'
		},
		duration: 200, //ms
		timingFunction: 'ease-in-out',
		delay: 0 //ms
	},()=>{
		
	})
	// #endif

}


/** -----------form专有------------ */
//父级方法。
const rulesObj = inject("tmFormItemRules",computed<rulesItem>(()=>{
    return {
        message:"请选择",
        required:false,
        validator:false
    }
}))
//父级方法。
let parentFormItem = proxy.$parent
while (parentFormItem) {
    if (parentFormItem?.tmFormComnameFormItem == 'tmFormComnameFormItem' || !parentFormItem) {
        break;
    } else {
        parentFormItem = parentFormItem?.$parent ?? undefined
       
    }
}

async function pushFormItem(isCheckVail = true){
    if(parentFormItem){
        let isRe = false;
        if(isCheckVail&&rulesObj.value?.required===true){
            if(typeof rulesObj.value.validator == 'function'){
                isRe =await !rulesObj.value.validator(_value.value)
            }else if(typeof rulesObj.value.validator == 'boolean'){
                isRe =  rulesObj.value.validator;
            }
            
        }
        parentFormItem.pushCom({
            value:_value.value,
            isRequiredError:isRe,//true,错误，false正常 检验状态
            componentsName:'tm-switch',//表单组件类型。
            message:rulesObj.value.message,//检验信息提示语。
        })
    }
}
pushFormItem(false)

const tmFormFun = inject("tmFormFun",computed(()=>""))
watch(tmFormFun,()=>{
    if(tmFormFun.value=='reset'){
		_value.value = false
		emits('update:modelValue',_value.value)
		pushFormItem(false)
    }
})

/** -----------end------------ */
</script>
<style scoped>
	.base{
		transform:'translateX(0%)'
	}
	.on{
		/* #ifndef APP-NVUE */
		transform:translateX(calc(100% - 4rpx))
		/* #endif */
	}
	.off{
		
		/* #ifndef APP-NVUE */
		transform:translateX(0%)
		/* #endif */
	}
</style>

