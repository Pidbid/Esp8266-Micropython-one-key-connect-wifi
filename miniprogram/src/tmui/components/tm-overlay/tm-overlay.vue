<template>
	<view  v-if="showMask"
	ref="overlay"
	@click.stop="close" 
	:class="[bgColor_rp&&!props.transprent?'blurbg':'', align_rpx,'  flex flex-col  l-0  ',customClass,]" 
	:style="[bgColor_rp&&!props.transprent ? { backgroundColor: showMask?bgColor_rp:'' } : '',{ position:'fixed'},
		zIndex ? { zIndex: zIndex } : '', { width: width + 'px', height: height + 'px',top:top+'px' },customCSSStyle, ]" 
		:animation="animationData">
		<slot></slot>
	</view>
</template>
<script lang="ts" setup>
	/**
	 * 遮罩层
	 * @description 遮罩层全屏弹出。
	 */
	import {
		getCurrentInstance,
		computed,
		ref,
		provide,
		inject,
		onMounted,
		onUnmounted,
		nextTick,
		watch
	} from 'vue';
	import {
		cssstyle,
		tmVuetify
	} from '../../tool/lib/interface';
	import {
		custom_props,
		computedClass,
		computedStyle
	} from '../../tool/lib/minxs';
	// #ifdef APP-PLUS-NVUE
	const animation = uni.requireNativePlugin('animation')
	// #endif
	// 混淆props共有参数
	const props = defineProps({
		...custom_props,
		// 内容的对齐方式的类
		align:{
			type:String,
			default:'flex-center'
		},
		//当前组件的主题。可以是颜色值，也可以是主题名称。
		bgColor: {
			type: String,
			default: 'rgba(0,0,0,0.2)'
		},
		zIndex: {
			type: [Number, String],
			default: 120
		},
		show: {
			type: Boolean,
			default: false
		},
		overlayClick:{
			type: Boolean,
			default: true
		},
		transprent:{
			type: [Boolean,String],
			default: false
		},
		duration:{
			type:Number,
			default:300
		},
	});
	const emits = defineEmits(['click', 'open', 'close', 'update:show']);
	const {
		proxy
	} = getCurrentInstance();
	//自定义样式：
	const customCSSStyle = computedStyle(props);
	//自定类
	const customClass = computedClass(props);
	const width = ref(0);
	const height = ref(0);
	const top = ref(0);
	
	const {windowTop,windowWidth,windowHeight,safeArea,statusBarHeight} = uni.getSystemInfoSync();
	width.value = windowWidth;
	height.value = windowHeight+(windowTop||0);
	// #ifdef MP
	height.value = windowHeight
	// #endif
	// #ifdef H5
	top.value = windowTop
	// #endif
	// #ifdef APP 
	height.value = safeArea.height - Math.abs(statusBarHeight);
	// #endif
	const timeid = ref(uni.$tm.u.getUid(3));
	const animationData = ref(null)
	const showMask = ref(false)
	onUnmounted(()=>clearTimeout(timeid.value))
	const align_rpx = computed(()=>props.align)
	const bgColor_rp = computed(()=>{
		if(!props.bgColor|| props.transprent) return 'rgba(0,0,0,0)';
		return props.bgColor||'rgba(0,0,0,0.2)';
	})
	onMounted(()=>{
		if(!props.show) return;
		open(props.show)
	})

	
	function close(e) {
		e.stopPropagation()
		emits('click', e);
		if(!props.overlayClick) return;
		open(false)
	}
	function open(off) {
		let that = this;
		// #ifndef APP-PLUS-NVUE
		fadeInVue(off);
		// #endif
		// #ifdef APP-PLUS-NVUE
		fadeInNvue(off);
		// #endif
	}
	function getEl(el) {
		if (typeof el === 'string' || typeof el === 'number') return el;
		if (WXEnvironment) {
			return el.ref;
		} else {
			return el instanceof HTMLElement ? el : el.$el;
		}
	}
	function fadeInNvue(off:boolean = false) {
		if(off==false){
			if(showMask.value==off) return;
			uni.$tm.u.debounce(function(){
				var testEl = proxy.$refs.overlay;
				  animation.transition(testEl, {
					  styles: {
						  backgroundColor:bgColor_rp.value,
						  opacity:0
					  },
					  duration: props.duration, //ms
					  timingFunction: 'ease',
					  delay: 0 //ms
				  },()=>{
					  showMask.value = off;
					  emits('close');
					  
					  emits('update:show', false);
				  })
			},props.duration,true)
		}else{
			showMask.value = off;
			emits('open');
			nextTick(function(){
				var testEl = proxy.$refs.overlay;
				  animation.transition(testEl, {
					  styles: {
						  backgroundColor:bgColor_rp.value,
						  opacity:1
					  },
					  duration: props.duration, //ms
					  timingFunction: 'ease',
					  delay: 0 //ms
				  },()=>{
					  
				  })
			})
			
		}
		
	}
	function fadeInVue(off = false) {
		let animation = uni.createAnimation({
			duration: props.duration,
			timingFunction: 'ease',
			delay: 0
		});
		animation.opacity(off ? 1 : 0).step();
		animationData.value = animation.export();
		if(off==false){
			if(showMask.value==off) return;
			uni.$tm.u.debounce(function(){
				showMask.value = off;
				emits('close');
				emits('update:show', false);
			},props.duration,false)
		}else{
			showMask.value=off
			emits('open');
		}
	}
	watch(()=>props.show,(newval)=>open(newval))
	defineExpose({close:close,open:open})
</script>

<style scoped="scoped">
	
	.blurbg{
		/* #ifndef APP-PLUS-NVUE */ 
		/* backdrop-filter: blur(4px); */
		/* #endif */ 
		opacity: 0;
	}

	
</style>
