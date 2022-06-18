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
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    parenClass: {
      type: String,
      default: ""
    },
    contStyle: {
      type: String,
      default: ""
    },
    height: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Number, String],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    unit: {
      type: String,
      default: "rpx"
    },
    hoverClass: {
      type: String,
      default: "none"
    },
    darkBgColor: {
      type: String,
      default: ""
    },
    noLevel: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click", "longpress", "touchend", "touchstart", "touchcancel", "mousedown", "mouseup", "mouseleave"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const parenClass_p = common_vendor.computed$1(() => props.parenClass);
    const contStyle_p = common_vendor.computed$1(() => props.contStyle);
    const _transprent = common_vendor.computed$1(() => props.transprent);
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const _blur = common_vendor.computed$1(() => {
      if (tmcfg.value.os == "android" && _isNvue.value) {
        return false;
      }
      return props.blur;
    });
    const customCSSStyle = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed$1(() => {
      return tmui_tool_lib_minxs.computedTheme(__spreadProps(__spreadValues({}, props), { blur: _blur.value }), isDark.value);
    });
    const _isNvue = common_vendor.ref(false);
    const _margin = common_vendor.computed$1(() => props.margin);
    const _padding = common_vendor.computed$1(() => props.padding);
    const _width = common_vendor.computed$1(() => props.width);
    const _height = common_vendor.computed$1(() => props.height);
    const _noLevel = common_vendor.computed$1(() => props.noLevel);
    const _blue_sheet = common_vendor.ref(true);
    const _blurEffect = common_vendor.computed$1(() => {
      if (props.blur === true && isDark.value)
        return "dark";
      if (props.blur === true && !isDark.value)
        return "extralight";
      return "none";
    });
    common_vendor.watch(() => isDark.value, () => {
    });
    const _bgcolor = common_vendor.computed$1(() => {
      var _a;
      if (_transprent.value === true)
        return `background-color:rgba(255,255,255,0);`;
      if (props.darkBgColor !== "" && isDark.value === true) {
        return `background-color:${props.darkBgColor};`;
      }
      if (((_a = tmcomputed.value.gradientColor) == null ? void 0 : _a.length) === 2) {
        return tmcomputed.value.backgroundColorCss;
      }
      if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
        return `background-color: ${tmcomputed.value.inputcolor}`;
      }
      return `background-color: ${tmcomputed.value.backgroundColor}`;
    });
    const isLongPress = common_vendor.ref(false);
    function longpress(e) {
      isLongPress.value = true;
      emits("longpress", e);
    }
    function touchstart(e) {
      isLongPress.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isLongPress.value = false;
      emits("touchend", e);
    }
    function touchcancel(e) {
      isLongPress.value = false;
      emits("touchcancel", e);
    }
    function mousedown(e) {
      isLongPress.value = true;
      emits("mousedown", e);
    }
    function mouseup(e) {
      isLongPress.value = false;
      emits("mouseup", e);
    }
    function mouseleave(e) {
      isLongPress.value = false;
      emits("mouseleave", e);
    }
    common_vendor.computed$1(() => {
      let w = parseFloat(String(_width.value)) - parseFloat(String(props.padding[0]));
      w = w - parseFloat(String(props.border)) * 2;
      return w;
    });
    common_vendor.computed$1(() => {
      let h = parseFloat(String(_height.value)) - parseFloat(String(props.padding[1]));
      h = h - parseFloat(String(props.border)) * 2;
      return h;
    });
    let textColor = common_vendor.computed$1(() => tmcomputed.value.textColor);
    common_vendor.provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _blue_sheet.value
      }, _blue_sheet.value ? {
        b: common_vendor.n(common_vendor.unref(customClass)),
        c: common_vendor.s(common_vendor.unref(contStyle_p)),
        d: common_vendor.unref(_blurEffect),
        e: common_vendor.o(($event) => emits("click", $event)),
        f: common_vendor.o(longpress),
        g: common_vendor.o(touchend),
        h: common_vendor.o(touchstart),
        i: common_vendor.o(touchcancel),
        j: common_vendor.o(mousedown),
        k: common_vendor.o(mouseup),
        l: common_vendor.o(mouseleave),
        m: props.shadow,
        n: common_vendor.n(common_vendor.unref(parenClass_p)),
        o: common_vendor.n(`mx-${common_vendor.unref(_margin)[0]}`),
        p: common_vendor.n(`my-${common_vendor.unref(_margin)[1]}`),
        q: common_vendor.n(`px-${common_vendor.unref(_padding)[0]}`),
        r: common_vendor.n(`py-${common_vendor.unref(_padding)[1]}`),
        s: common_vendor.n(isLongPress.value ? props.hoverClass : ""),
        t: common_vendor.n(!_ctx.isDisabledRoundAndriod ? `round-${props.round}` : ""),
        v: common_vendor.s(common_vendor.unref(_height) ? {
          height: common_vendor.unref(_height) + common_vendor.unref(_padding)[1] + props.unit
        } : ""),
        w: common_vendor.s(common_vendor.unref(_width) ? {
          width: common_vendor.unref(_width) + common_vendor.unref(_padding)[0] + props.unit
        } : ""),
        x: common_vendor.s(common_vendor.unref(tmcomputed).borderCss),
        y: common_vendor.s(common_vendor.unref(_blur) && common_vendor.unref(store).tmStore.os == "ios" && _isNvue.value === true ? "" : common_vendor.unref(_bgcolor)),
        z: common_vendor.s(!common_vendor.unref(_transprent) && props.shadow > 0 ? common_vendor.unref(tmcomputed).shadowColor : ""),
        A: common_vendor.s(!common_vendor.unref(_transprent) && common_vendor.unref(_blur) ? {
          "backdrop-filter": "blur(10px)"
        } : ""),
        B: common_vendor.s(common_vendor.unref(customCSSStyle))
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-sheet/tm-sheet.vue"]]);
wx.createComponent(Component);
