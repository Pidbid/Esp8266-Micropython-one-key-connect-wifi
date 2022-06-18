<template>
	<tm-overlay :transprent="!showmask"  :_style="{zIndex:'500 !important'}" :overlayClick="false" v-model:show="showValue">
		<tm-translate @end="msgOver" :reverse="reverse" ref="tranAni" name="zoom" :duration="150" :auto-play="false">
			<tm-sheet blur :_style="props._style"  
			:_class="props._class" :color="bgColor" 
			:border="1" :shadow="6" 
			:width="300"
			:height="300"
			:margin="[10,10]" :round="12"  :padding="[24, 0]">
				<view class="flex flex-center flex-col ma-30" style="line-height: normal">
					<tm-translate name="zoom" :delay="200">
						<tm-icon _style="line-height: normal" style="line-height: normal" _class="pa-10" :spin="model_ref == 'load'" 
						:color="color_ref" :fontSize="72" :name="icon_ref"></tm-icon>
					</tm-translate>
					<tm-text :font-size="30" _class="pt-8 text-overflow-1" :label="text_ref"></tm-text>
				</view>
			</tm-sheet>
		</tm-translate>
	</tm-overlay>
</template>

<script lang="ts" setup>
	/**
	 * 消息提示
	 * @description 消息提示，属于全局阻断式提醒，会打断用户操作。
	 */
	import tmSheet from "../tm-sheet/tm-sheet.vue";
	import tmText from "../tm-text/tm-text.vue";
	import tmIcon from "../tm-icon/tm-icon.vue";
	import tmTranslate from "../tm-translate/tm-translate.vue";
	import tmOverlay from "../tm-overlay/tm-overlay.vue";
	import { useTmpiniaStore } from '../../tool/lib/tmpinia';
	import { getCurrentInstance, computed, ref, provide, inject, onMounted, onUnmounted, nextTick ,watch } from 'vue';
	const store = useTmpiniaStore();
	const emits = defineEmits(['click'])
	const {proxy} = getCurrentInstance();
	const props = defineProps({
		//自定义的样式属性
		_style: {
			type: [Array, String, Object],
			default: () => { }
		},
		//自定义类名
		_class: {
			type: [Array, String],
			default: 'flex-center'
		},
		//是否显示遮罩
		mask: {
			type: [Boolean, String],
			default: false
		},
		//自动关闭时,需要显示多久关闭,单位ms
		duration: {
			type: Number,
			default: 1300
		}
	})
	const uid = ref(uni.$tm.u.getUid(5))
	const bgColor = ref('white')
	const model_ref = ref('info')
	const showValue = ref(false)
	const icon_ref = ref('')
	const text_ref = ref('')
	const color_ref = ref('')
	const reverse = ref(false)
	const dur = ref(0)
	const aniPlaying = ref(false)
	const showmask = ref(props.mask)
	const dark_ref = ref(null)
	onUnmounted(()=>clearTimeout(uid.value))
	watch(()=>props.mask,(val)=>showmask.value=val)
	const modelIcon = computed(()=>{
		return {
				load: {
					icon: 'tmicon-loading',
					color: 'primary',
					text: '加载中'
				},
				error: {
					icon: 'tmicon-times-circle',
					color: 'red',
					text: '操作错误'
				},
				info: {
					icon: 'tmicon-info-circle',
					text: '提示信息',
					color: 'black'
				},
				warn: {
					icon: 'tmicon-exclamation-circle',
					text: '警告信息',
					color: 'orange'
				},
				quest: {
					icon: 'tmicon-question-circle',
					text: '似乎有问题',
					color: 'pink'
				},
				success: {
					icon: 'tmicon-check-circle',
					text: '操作成功',
					color: 'green'
				},
				disabled: {
					icon: 'tmicon-ban',
					text: '禁止操作',
					color: 'red'
				},
				wait: {
					icon: 'tmicon-ios-alarm',
					text: '请稍候..',
					color: 'black'
				}
		}
	})
	//动画播放结束。
	function msgOver(){
			if(aniPlaying.value||!proxy.$refs?.tranAni) return;
			aniPlaying.value  = true;
			if (dur.value > 0 && model_ref.value != 'load'){
				clearTimeout(uid.value);
				uid.value = setTimeout(function(){
					reverse.value = true;
					if(!proxy.$refs?.tranAni){
						reverse.value = false;
						showValue .value= false
						aniPlaying.value  = false;
						clearTimeout(uid.value);
						return;
					}
					proxy.$refs.tranAni.play()
					uid.value = setTimeout(function(){
						reverse.value = false;
						showValue .value= false
						aniPlaying.value  = false;
					},100)
				},dur.value)
			}
		}
		//显示
	function show() {
			clearTimeout(uid.value);
			//显示所需要的参数
			let arg = typeof arguments[0] ==='object'?arguments[0]:{};
			let { duration, icon, text, color, dark, model ,mask} = arg;
			model_ref.value = model??model_ref.value;
			icon_ref.value = icon = icon??modelIcon.value[model_ref.value].icon;
			text_ref.value = text = text??modelIcon.value[model_ref.value].text;
			color_ref.value = color = color??modelIcon.value[model_ref.value].color;
			showmask.value = typeof mask ==='boolean' ?mask:showmask.value
			if (dark === true) {
				bgColor.value = 'black';
				
			}
			if(typeof dark !== 'boolean'){
				dark = store.tmStore.dark;
			}
			if(color_ref.value=='white'||color_ref.value=="black"){
				color_ref.value=""
			}
			
			dark_ref.value = dark;
			if (typeof duration === 'undefined') {
				duration = props.duration;
			}
			dur.value = isNaN(parseInt(duration)) ? 1500 : parseInt(duration);
			
			showValue.value = true;
			nextTick(function() {
				aniPlaying.value  = false;
				reverse.value = false;
				proxy.$refs.tranAni.play()
			})
		}
	//隐藏
	function hide(){
		clearTimeout(uid.value);
		showValue.value = false;
	}
	defineExpose({show:show,hide:hide})

</script>

<style></style>
