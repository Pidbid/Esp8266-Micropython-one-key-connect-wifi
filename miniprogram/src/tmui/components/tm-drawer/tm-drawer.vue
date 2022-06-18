<template>
	<tm-overlay :transprent="!props.mask" v-if="show" @click="clickClose" :align="align_rp" :overlayClick="false"
		v-model:show="props.show">
		<tm-translate @end="animationClose" :reverse="reverse_rp" :width='anwidth' :height="anheight" ref="drawerANI"
			:auto-play="false" :name="aniname" :duration="props.duration">
			<view @click.stop="$event.stopPropagation()" :style="[
				{ width: anwidth, height: anheight, },
				!props.transprent ? tmcomputed.borderCss : '',
				!props.transprent ? tmcomputed.backgroundColorCss : '',
				!props.transprent ? tmcomputed.shadowColor : '',
				customCSSStyle,
			]" :class="[round_rp, 'flex flex-col overflow ', customClass]">
				<view v-if="!props.closable && !props.hideHeader"
					class="flex flex-row flex-row-center-center flex-between  px-24 " style="height:44px">
					<view class="flex-4 flex-shrink">
						<tm-text v-if="!props.hideCancel" @click="cancel" :label="props.cancelText"></tm-text>
					</view>
					<view class="flex-8 px-32 flex-center">
						<tm-text _class="text-overflow-1 opacity-7" :label="props.title"></tm-text>
					</view>
					<view class="flex-4 flex-shrink flex-row flex-row-center-end">
						<tm-text :color="okColor" @click="ok" v-if="!ok_loading" :dark="props.dark"
							:label="props.okText"></tm-text>
						<tm-icon :color="okColor" v-if="ok_loading" :spin="ok_loading" :dark="isDark"
							:_class="isDark !== true ? 'opacity-4' : ''" :fontSize="34"
							:name="ok_loading ? 'tmicon-jiazai_dan' : 'tmicon-times-circle-fill'"></tm-icon>
					</view>
				</view>
				<view v-if="props.closable && !props.hideHeader"
					class="flex flex-row flex-row-center-center flex-between  px-24 " style="height:44px">

					<view class="flex-9 pr-32 ">
						<tm-text _class="text-overflow-1 opacity-7" :dark="props.dark" :label="props.title"></tm-text>
					</view>
					<view class="flex-3 flex-shrink flex-row flex-row-center-end">
						<tm-icon @click="cancel" :dark="props.dark" :_class="isDark !== true ? 'opacity-3' : ''"
							:fontSize="36" name="tmicon-times-circle-fill"></tm-icon>
					</view>
				</view>
				<scroll-view scroll-y :style="[{ height: contentHeight }]" class="overflow">
					<slot name="default"></slot>
				</scroll-view>
			</view>
		</tm-translate>
	</tm-overlay>
</template>

<script lang="ts" setup>
/**
 * 抽屉
 * @description 别名poup弹层，提供，左，右，上，下，中弹出内容。
 */
import tmTranslate from "../tm-translate/tm-translate.vue";
import tmText from "../tm-text/tm-text.vue";
import tmIcon from "../tm-icon/tm-icon.vue";
import tmOverlay from "../tm-overlay/tm-overlay.vue";
import { getCurrentInstance, computed, ref, provide, inject, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { cssstyle, tmVuetify, colorThemeType } from '../../tool/lib/interface';
import { custom_props, computedTheme, computedClass, computedStyle, computedDark } from '../../tool/lib/minxs';
import { useTmpiniaStore } from '../../tool/lib/tmpinia';
const store = useTmpiniaStore();
const props = defineProps({
	...custom_props,
	//是否显示遮罩
	mask: {
		type: [Boolean, String],
		default: true
	},
	//抽屉放置的位置
	placement: {
		type: String,
		default: 'bottom' //top|left|right|bottom
	},
	show: {
		type: [Boolean, String],
		default: false
	},
	width: {
		type: Number,
		default: 500
	},
	height: {
		type: Number,
		default: 600
	},
	round: {
		type: Number,
		default: 12
	},
	//弹出的动画时间单位ms.
	duration: {
		type: Number,
		default: 300
	},
	//是否允许点击遮罩关闭
	overlayClick: {
		type: Boolean,
		default: true
	},
	transprent: {
		type: [Boolean, String],
		default: false
	},
	//如果显示关闭。标题栏被替换为左标题右关闭按钮。
	closable: {
		type: [Boolean, String],
		default: false
	},
	color: {
		type: String,
		default: 'white'
	},
	title: [String],
	okText: {
		type: [String],
		default: "完成"
	},
	okColor: {
		type: [String],
		default: "primary"
	},
	//true时，确认按钮将出现加载状态。
	okLoading: {
		type: [Boolean, String],
		default: false
	},
	cancelText: {
		type: [String],
		default: "取消"
	},
	hideCancel: {
		type: [Boolean, String],
		default: false
	},
	//隐藏工具栏，标题，取消，确认
	hideHeader: {
		type: [Boolean, String],
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	}
});
const emits = defineEmits(['click', 'open', 'close', 'update:show', 'ok', 'cancel']);
const { proxy } = getCurrentInstance();
// 设置响应式全局组件库配置表。
const tmcfg = computed<tmVuetify>(() => store.tmStore);
//自定义样式：
const customCSSStyle = computed(() => computedStyle(props));
//自定类
const customClass = computed(() => computedClass(props));
//是否暗黑模式。
const isDark = computed(() => computedDark(props, tmcfg.value));
//计算主题
const tmcomputed = computed<cssstyle>(() => computedTheme(props, isDark.value));
const syswidth = ref(0);
const sysheight = ref(0);
const reverse = ref(true);
const aniEnd = ref(false);
const flag = ref(null);
const timeid = ref(null);
let { windowWidth, windowHeight, windowTop, safeArea, statusBarHeight, titleBarHeight } = uni.getSystemInfoSync();
syswidth.value = windowWidth;
sysheight.value = windowHeight;
// #ifdef APP || MP
sysheight.value = safeArea.height;
// #endif
// #ifdef H5
sysheight.value = windowHeight;
// #endif
timeid.value = uni.$tm.u.getUid(4)
if (props.show) {
	reverse.value = false;
}
watch(() => props.show, (val) => {
	if (val) {
		open();
	} else {
		close();
	}
})
onMounted(() => open())
const ok_loading = computed(() => props.okLoading)
const round_rp = computed(() => {
	if (aniname.value == 'left') return 'round-r-' + props.round;
	if (aniname.value == 'right') return 'round-l-' + props.round;
	if (aniname.value == 'up') return 'round-b-' + props.round;
	if (aniname.value == 'down') return 'round-t-' + props.round;
	if (aniname.value == 'zoom') return 'round-' + props.round;
})
const reverse_rp = computed(() => {
	if (aniname.value != 'zoom') return reverse.value;
	return !reverse.value;
})
const aniname = computed(() => {
	if (props.placement == 'center') return 'zoom'
	if (props.placement == 'top') return 'up'
	if (props.placement == 'bottom') return 'down'
	return props.placement;
})
const anwidth = computed(() => {
	if (aniname.value == 'zoom') {
		return props.width + 'rpx'
	}
	if (props.placement == 'left' || props.placement == 'right') {
		return props.width + 'rpx'
	}
	return syswidth.value + 'px';
})
const anheight = computed(() => {
	let wucha = 0
	if (props.placement == 'top' || props.placement == 'bottom' || aniname.value == 'zoom') {
		return (props.height + wucha) + 'rpx'
	}
	return (sysheight.value) + 'px';
})
const contentHeight = computed(() => {
	let base_height = props.hideHeader ? 0 : 44;
	if (props.placement == 'top' || props.placement == 'bottom' || aniname.value == 'zoom') {
		return (uni.upx2px(props.height) - base_height) + 'px'
	}
	return (sysheight.value - base_height) + 'px';
})
const align_rp = computed(() => {
	if (aniname.value == 'down') {
		return 'flex-col-bottom-center'
	}
	if (aniname.value == 'up') {
		return 'flex-top-custom'
	}
	if (aniname.value == 'left') {
		return 'flex-row-top-start'
	}
	if (aniname.value == 'right') {
		return 'flex-row-bottom-start'
	}
	if (aniname.value == 'zoom') {
		return 'flex-center'
	};
})

function ok() {
	if (props.disabled) return;
	emits("ok")
	close()
}
function cancel() {
	if (props.disabled) return;
	emits("cancel")
	close()
}
function open() {
	if (props.disabled) return;
	if (flag.value) return;
	aniEnd.value = false;
	reverse.value = reverse.value === false ? true : false;
	nextTick(function () {
		if (!proxy?.$refs?.drawerANI) return;
		flag.value = true;
		proxy.$refs.drawerANI.play();
		timeid.value = setTimeout(function () {
			emits("open")
			flag.value = false;
		}, props.duration)
	})
}
function animationClose() {
	aniEnd.value = true;
}
//外部手动调用关闭方法
function close() {
	if (props.disabled) return;
	if (flag.value) return;
	uni.$tm.u.throttle(closeFun(),props.duration)
}
//内部通过点击遮罩关闭的方法.同时需要发送事件。
function clickClose(e) {
	if (props.disabled) return;
	emits('click', e);
	if (flag.value) return;
	if (!props.overlayClick) return;
	uni.$tm.u.throttle(cancel(),props.duration)
}
function closeFun() {
	if (props.disabled) return;
	if (flag.value) return;
	nextTick(function () {
		reverse.value = false;
		if (!proxy?.$refs?.drawerANI) return;
		flag.value = true;
		nextTick(function () {
			proxy.$refs.drawerANI.play();
			timeid.value = setTimeout(function () {
				if (aniEnd.value) {
					emits("close")
					emits("update:show", false)
					flag.value = false;
				}
			}, props.duration)
		})

	})
}
//外部调用的方法。
defineExpose({ close: close, open: open })
</script>

<style scoped>
.flex-left-custom {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}

.flex-right-custom {
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
}

.flex-top-custom {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}

.flex-end-custom {
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
}

.flex-center-custom {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}
</style>
