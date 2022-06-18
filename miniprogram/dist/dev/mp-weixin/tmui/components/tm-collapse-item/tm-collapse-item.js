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
if (!Math) {
  (tmIcon + tmText + tmSheet + tmTranslate)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    color: {
      type: String,
      default: "white"
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: [Number, String],
      default: ""
    },
    activeColor: {
      type: [String],
      default: "primary"
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [32, 0]
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const _activekeyArray = common_vendor.inject("tmCollapseKeyList", common_vendor.computed$1(() => []));
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmCollapse) == "tmCollapse" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    if (parent) {
      parent.pushKey(props.name);
    }
    const cborder = common_vendor.ref(props.border ? props.border : parent.border);
    const isActive = common_vendor.computed$1(() => {
      let index = _activekeyArray.value.findIndex((el) => {
        return el == props.name;
      });
      return index > -1;
    });
    function openAndClose(e) {
      emits("click", e);
      if (props.disabled)
        return;
      parent.setKey(props.name);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          dark: props.dark,
          followTheme: props.followTheme,
          followDark: props.followDark,
          color: common_vendor.unref(isActive) ? props.activeColor : "",
          name: common_vendor.unref(isActive) ? "tmicon-sort-down" : "tmicon-caret-right",
          ["font-size"]: 24,
          _class: "pr-16",
          _style: "line-height:88rpx;"
        }),
        b: common_vendor.r("icon", {
          data: {
            isActive: common_vendor.unref(isActive)
          }
        }),
        c: common_vendor.p({
          dark: props.dark,
          followTheme: props.followTheme,
          followDark: props.followDark,
          fontSize: 30,
          color: common_vendor.unref(isActive) ? props.activeColor : "",
          _style: "line-height:88rpx;",
          label: props.title
        }),
        d: common_vendor.r("title", {
          data: {
            isActive: common_vendor.unref(isActive)
          }
        }),
        e: common_vendor.o(openAndClose),
        f: common_vendor.p({
          color: props.color,
          text: __props.disabled,
          border: cborder.value,
          linear: props.linear,
          linearDeep: props.linearDeep,
          followTheme: props.followTheme,
          dark: props.dark,
          followDark: props.followDark,
          borderDirection: "bottom",
          margin: props.margin,
          padding: props.padding,
          height: 88
        }),
        g: common_vendor.unref(isActive)
      }, common_vendor.unref(isActive) ? {
        h: common_vendor.p({
          duration: 350
        })
      } : {}, {
        i: common_vendor.n(__props.disabled ? "opacity-7" : "")
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-collapse-item/tm-collapse-item.vue"]]);
wx.createComponent(Component);
