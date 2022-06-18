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
  (tmIcon + tmText + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    transprent: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "normal"
    },
    fontSize: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 16]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    shadow: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 2
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    formType: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: ""
    },
    appParameter: {
      type: String,
      default: ""
    },
    sessionFrom: {
      type: String,
      default: ""
    },
    sendMessageTitle: {
      type: String,
      default: ""
    },
    sendMessagePath: {
      type: String,
      default: ""
    },
    sendMessageImg: {
      type: String,
      default: ""
    },
    sendMessageCard: {
      type: String,
      default: ""
    }
  }),
  emits: [
    "click",
    "touchstart",
    "touchmove",
    "touchcancel",
    "touchend",
    "tap",
    "longpress",
    "getphonenumber",
    "getuserinfo",
    "getUserProfile",
    "error",
    "opensetting",
    "launchapp",
    "contact"
  ],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const formtype = common_vendor.computed$1(() => props.formType);
    let FormParent = null;
    if (formtype.value == "reset" || formtype.value == "submit") {
      FormParent = proxy.$parent;
      while (FormParent) {
        if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
          break;
        } else {
          FormParent = (_a = FormParent == null ? void 0 : FormParent.$parent) != null ? _a : void 0;
        }
      }
    }
    const customCSSStyle = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isclickOn = common_vendor.ref(false);
    const _load = common_vendor.computed$1(() => props.loading);
    const _disabled = common_vendor.computed$1(() => props.disabled);
    const _label = common_vendor.computed$1(() => props.label);
    const _icon = common_vendor.computed$1(() => props.icon);
    const btnSize = common_vendor.computed$1(() => {
      let fontSize = props.fontSize || 0;
      if (props.block) {
        return { w: 0, h: props.height ? props.height : 88, fontSize: fontSize || 30 };
      }
      if (props.width || props.height) {
        return { w: props.width, h: props.height, fontSize: fontSize || 30 };
      }
      if (props.size == "mini") {
        return { w: 88, h: 50, fontSize: fontSize || 22 };
      }
      if (props.size == "normal") {
        return { w: 220, h: 88, fontSize: fontSize || 28 };
      }
      if (props.size == "middle") {
        return { w: 310, h: 88, fontSize: fontSize || 30 };
      }
      if (props.size == "large") {
        return { w: 500, h: 100, fontSize: fontSize || 34 };
      }
      return { w: 220, h: 88, fontSize: fontSize || 28 };
    });
    function touchstart(e) {
      isclickOn.value = true;
      emits("touchstart", e);
    }
    function touchend(e) {
      isclickOn.value = false;
      emits("touchend", e);
    }
    function onclick(e) {
      if (FormParent != null && typeof FormParent != "undefined" && formtype.value) {
        FormParent[formtype.value]();
      }
      emits("click", e);
      if (props.url !== "" && typeof props.url === "string") {
        let url = props.url;
        if (url[0] !== "/")
          url = "/" + url;
        common_vendor.index.navigateTo({
          url
        });
        return;
      }
      if (props.openType == "getUserInfo" || props.openType == "getUserProfile") {
        common_vendor.index.getUserProfile({
          desc: "\u9700\u8981\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
          lang: "zh",
          complete: function(userProfile) {
            if (userProfile.errMsg != "getUserProfile:ok") {
              common_vendor.index.showToast({
                title: userProfile.errMsg,
                icon: "error",
                mask: true
              });
              return;
            }
            emits("getuserinfo", userProfile);
            emits("getUserProfile", userProfile);
          },
          fail: (error) => {
            common_vendor.index.showToast({
              title: error
            });
          }
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          userInteractionEnabled: false,
          _class: common_vendor.unref(_label) ? "pr-10" : "",
          fontSize: common_vendor.unref(btnSize).fontSize * 0.9,
          name: common_vendor.unref(_icon)
        }),
        b: common_vendor.p({
          userInteractionEnabled: false,
          fontSize: common_vendor.unref(btnSize).fontSize,
          label: common_vendor.unref(_label)
        }),
        c: common_vendor.o(onclick),
        d: common_vendor.o(touchstart),
        e: common_vendor.o(touchend),
        f: common_vendor.o(($event) => emits("longpress", $event)),
        g: common_vendor.o(($event) => {
          isclickOn.value = false;
          emits("touchcancel", $event);
        }),
        h: common_vendor.o(($event) => emits("touchmove", $event)),
        i: common_vendor.o(($event) => emits("getphonenumber", $event)),
        j: common_vendor.o(($event) => emits("getuserinfo", $event)),
        k: common_vendor.o(($event) => emits("error", $event)),
        l: common_vendor.o(($event) => emits("opensetting", $event)),
        m: common_vendor.o(($event) => emits("launchapp", $event)),
        n: common_vendor.o(($event) => emits("contact", $event)),
        o: props.formType,
        p: props.openType,
        q: props.appParameter,
        r: props.sessionFrom,
        s: props.sendMessageTitle,
        t: props.sendMessagePath,
        v: props.sendMessageImg,
        w: props.sendMessageCard,
        x: common_vendor.unref(_load),
        y: common_vendor.unref(_disabled),
        z: common_vendor.n(common_vendor.unref(customClass)),
        A: common_vendor.s({
          height: common_vendor.unref(btnSize).h + "rpx"
        }),
        B: common_vendor.s(common_vendor.unref(customCSSStyle)),
        C: common_vendor.p({
          ["no-level"]: true,
          _style: [{
            opacity: isclickOn.value || common_vendor.unref(_disabled) ? 0.7 : 1
          }],
          round: props.round,
          width: common_vendor.unref(btnSize).w,
          height: common_vendor.unref(btnSize).h,
          padding: props.padding,
          margin: props.margin,
          color: props.color,
          shadow: props.shadow,
          transprent: props.transprent,
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          text: props.text,
          outlined: props.outlined,
          dark: props.dark,
          ["follow-dark"]: props.followDark,
          ["follow-theme"]: props.followTheme,
          ["border-direction"]: props.borderDirection,
          ["border-style"]: props.borderStyle,
          border: props.border,
          _class: "flex flex-row flex-center"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fbe2c206"], ["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-button/tm-button.vue"]]);
wx.createComponent(Component);
