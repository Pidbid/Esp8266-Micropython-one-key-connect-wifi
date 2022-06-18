"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    align: {
      type: String,
      default: "flex-center"
    },
    bgColor: {
      type: String,
      default: "rgba(0,0,0,0.2)"
    },
    zIndex: {
      type: [Number, String],
      default: 120
    },
    show: {
      type: Boolean,
      default: false
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    duration: {
      type: Number,
      default: 300
    }
  }),
  emits: ["click", "open", "close", "update:show"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const customCSSStyle = tmui_tool_lib_minxs.computedStyle(props);
    const customClass = tmui_tool_lib_minxs.computedClass(props);
    const width = common_vendor.ref(0);
    const height = common_vendor.ref(0);
    const top = common_vendor.ref(0);
    const { windowTop, windowWidth, windowHeight, safeArea, statusBarHeight } = common_vendor.index.getSystemInfoSync();
    width.value = windowWidth;
    height.value = windowHeight + (windowTop || 0);
    height.value = windowHeight;
    const timeid = common_vendor.ref(common_vendor.index.$tm.u.getUid(3));
    const animationData = common_vendor.ref(null);
    const showMask = common_vendor.ref(false);
    common_vendor.onUnmounted(() => clearTimeout(timeid.value));
    const align_rpx = common_vendor.computed$1(() => props.align);
    const bgColor_rp = common_vendor.computed$1(() => {
      if (!props.bgColor || props.transprent)
        return "rgba(0,0,0,0)";
      return props.bgColor || "rgba(0,0,0,0.2)";
    });
    common_vendor.onMounted(() => {
      if (!props.show)
        return;
      open(props.show);
    });
    function close(e) {
      e.stopPropagation();
      emits("click", e);
      if (!props.overlayClick)
        return;
      open(false);
    }
    function open(off) {
      fadeInVue(off);
    }
    function fadeInVue(off = false) {
      let animation2 = common_vendor.index.createAnimation({
        duration: props.duration,
        timingFunction: "ease",
        delay: 0
      });
      animation2.opacity(off ? 1 : 0).step();
      animationData.value = animation2.export();
      if (off == false) {
        if (showMask.value == off)
          return;
        common_vendor.index.$tm.u.debounce(function() {
          showMask.value = off;
          emits("close");
          emits("update:show", false);
        }, props.duration, false);
      } else {
        showMask.value = off;
        emits("open");
      }
    }
    common_vendor.watch(() => props.show, (newval) => open(newval));
    expose({ close, open });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showMask.value
      }, showMask.value ? {
        b: common_vendor.o(close),
        c: common_vendor.n(common_vendor.unref(bgColor_rp) && !props.transprent ? "blurbg" : ""),
        d: common_vendor.n(common_vendor.unref(align_rpx)),
        e: common_vendor.n(common_vendor.unref(customClass)),
        f: common_vendor.s(common_vendor.unref(bgColor_rp) && !props.transprent ? {
          backgroundColor: showMask.value ? common_vendor.unref(bgColor_rp) : ""
        } : ""),
        g: common_vendor.s({
          position: "fixed"
        }),
        h: common_vendor.s(__props.zIndex ? {
          zIndex: __props.zIndex
        } : ""),
        i: common_vendor.s({
          width: width.value + "px",
          height: height.value + "px",
          top: top.value + "px"
        }),
        j: common_vendor.s(common_vendor.unref(customCSSStyle)),
        k: animationData.value
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cf63bea2"], ["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-overlay/tm-overlay.vue"]]);
wx.createComponent(Component);
