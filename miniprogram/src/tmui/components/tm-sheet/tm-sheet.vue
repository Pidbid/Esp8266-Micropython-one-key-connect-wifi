<!--
 * @Date: 2022-03-29 12:54:41
 * @LastEditors: tmzdy
 * @Author: tmzdy
 * @Description: 文件
-->
<template>
  <view v-if="_blue_sheet" :blurEffect="_blurEffect" @click="emits('click', $event)" @longpress="longpress" @touchend="touchend"
    @touchstart="touchstart" @touchcancel="touchcancel" @mousedown="mousedown" @mouseup="mouseup"
    @mouseleave="mouseleave" :elevation="props.shadow" :class="[
      'flex flex-col', parenClass_p,
      `mx-${_margin[0]}`,
      `my-${_margin[1]}`,
      `px-${_padding[0]}`,
      `py-${_padding[1]}`,
      isLongPress ? props.hoverClass : '',
      !isDisabledRoundAndriod ? `round-${props.round}` : '',
    ]" :style="[
  _height ? { height: _height + _padding[1] + props.unit } : '',
  _width ? { width: _width + _padding[0] + props.unit } : '',
  tmcomputed.borderCss,
  _blur && store.tmStore.os == 'ios' &&_isNvue===true ? '' : _bgcolor,
  !_transprent && props.shadow > 0 ? tmcomputed.shadowColor : '',
  !_transprent && _blur ? { 'backdrop-filter': 'blur(10px)' } : '',
  customCSSStyle,
]">
    <view :class="['flex flex-1', customClass]" :style="contStyle_p">
      <slot></slot>
    </view>
  </view>
</template>
<script lang="ts" setup>
/**
 * 基础容器
 * @description 提供了基础窗口布局，以代替view进行布局，可随意修改样式。
 */
import { getCurrentInstance, computed, ref, provide, watch, PropType, nextTick, } from "vue";
import { cssstyle, tmVuetify } from "../../tool/lib/interface";
import {
  custom_props,
  computedTheme,
  computedClass,
  computedStyle,
  computedDark,
} from "../../tool/lib/minxs";
import { useTmpiniaStore } from '../../tool/lib/tmpinia';
const store = useTmpiniaStore();
// 混淆props共有参数
const props = defineProps({
  ...custom_props,
  parenClass: {
    type: String,
    default: ''
  },
  contStyle: {
    type: String,
    default: ''
  },
  height: {
    type: [Number],
    default: 0,
  },
  width: {
    type: [Number],
    default: 0,
  },
  color: {
    type: String,
    default: "white",
  },
  transprent: {
    type: [Boolean, String],
    default: false,
  },

  border: {
    type: [Number, String],
    default: 0,
  },
  margin: {
    type: Array as PropType<Array<number>>,
    default: () => [32, 24],
  },
  padding: {
    type: Array as PropType<Array<number>>,
    default: () => [24, 24],
  },
  unit: {
    type: String,
    default: 'rpx'
  },
  hoverClass: {
    type: String,
    default: 'none'
  },
  //暗下强制的背景色，
  //有时自动的背景，可能不是你想要暗黑背景，此时可以使用此参数，强制使用背景色，
  //只能是颜色值。
  darkBgColor: {
    type: String,
    default: ''
  },
  //不是同层背景，默认是同层，为false
  //如果输入框表单与tmshee在同一层下。他们的黑白暗黑背景色是相同的。为了区分这个问题，需要单独指示，以便区分背景同层。
  //主意：它只在黑和白之间的色系才起作用，其它颜色下不起作用。
  noLevel: {
    type: Boolean,
    default: false
  },
  //是否开启磨砂背景。
  blur: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["click", "longpress", "touchend", "touchstart", "touchcancel", "mousedown", "mouseup", "mouseleave"]);
const { proxy } = getCurrentInstance();
const parenClass_p = computed(() => props.parenClass)
const contStyle_p = computed(() => props.contStyle)
const _transprent = computed(() => props.transprent)

// 设置响应式全局组件库配置表。
const tmcfg = computed(() => store.tmStore);
const _blur = computed(() => {
  //安卓平台没有这功能
  if(tmcfg.value.os == 'android'&&_isNvue.value){
    return false;
  }
  return props.blur
})
//自定义样式：
const customCSSStyle = computed(() => computedStyle(props));
//自定类
const customClass = computed(() => computedClass(props));
//是否暗黑模式。
const isDark = computed(() => computedDark(props, tmcfg.value));
//计算主题
const tmcomputed = computed<cssstyle>(() => {
  return computedTheme({...props,blur:_blur.value}, isDark.value);
});
const _isNvue = ref(false)
// #ifdef APP-NVUE
_isNvue.value=true;
// #endif
const _margin = computed(() => props.margin)
const _padding = computed(() => props.padding)
const _width = computed(() => props.width)
const _height = computed(() => props.height)
const _noLevel = computed(() => props.noLevel)

const _blue_sheet = ref(true)
const _blurEffect = computed(() => {
  if (props.blur === true && isDark.value) return 'dark';
  if (props.blur === true && !isDark.value) return 'extralight';
  return 'none'
})
watch(() => isDark.value, () => {
// #ifdef APP-NVUE
//在ios下。如果切换带有磨砂效果时，如果不触发发更新视图，页面是不会更改。
if(store.tmStore.os=='ios'&&_blur.value===true){
  _blue_sheet.value = false;
  nextTick(()=>_blue_sheet.value=true)
}
// #endif

})
const _bgcolor = computed(() => {
  if (_transprent.value === true) return `background-color:rgba(255,255,255,0);`;
  if (props.darkBgColor !== '' && isDark.value === true) {
    return `background-color:${props.darkBgColor};`;
  }
  if (tmcomputed.value.gradientColor?.length === 2) {
    return tmcomputed.value.backgroundColorCss
  }
  if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {

    return `background-color: ${tmcomputed.value.inputcolor}`;
  }
  return `background-color: ${tmcomputed.value.backgroundColor}`

})
//当前是否点按，因为uniapp的hover-class在安卓端有bug，因此采用自定事件来定义hover类。
const isLongPress = ref(false)
function longpress(e: Event) {
  isLongPress.value = true;
  emits('longpress', e)
}
function touchstart(e: Event) {
  isLongPress.value = true;
  emits('touchstart', e)
}
function touchend(e: Event) {
  isLongPress.value = false;
  emits('touchend', e)
}
function touchcancel(e: Event) {
  isLongPress.value = false;
  emits('touchcancel', e)
}
function mousedown(e: Event) {
  isLongPress.value = true;
  emits('mousedown', e)
}
function mouseup(e: Event) {
  isLongPress.value = false;
  emits('mouseup', e)
}
function mouseleave(e: Event) {
  isLongPress.value = false;
  emits('mouseleave', e)
}


const c_w = computed(() => {
  let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
  // #ifndef APPNVUE
  w = w - parseFloat(String(props.border)) * 2;
  // #endif
  // #ifdef APPNVUE
  w = w - parseFloat(String(props.border));
  // #endif
  return w
})
const c_h = computed(() => {
  let h = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
  // #ifndef APPNVUE
  h = h - parseFloat(String(props.border)) * 2;
  // #endif
  // #ifdef APPNVUE
  h = h - parseFloat(String(props.border));
  // #endif
  return h;
})
// 设置响应式主题文字色。
let textColor = computed(() => tmcomputed.value.textColor);
provide("appTextColor", textColor);
</script>

<style>
</style>
