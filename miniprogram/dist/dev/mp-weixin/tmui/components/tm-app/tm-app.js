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
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
var tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    theme: {
      type: String,
      default: "grey-5"
    },
    bgImg: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "grey-4"
    },
    blur: {
      type: [Boolean, String],
      default: false
    },
    navbar: {
      type: Object,
      default: () => {
        return {
          background: "#ffffff",
          fontColor: "#000000"
        };
      }
    },
    tabar: {
      type: Object,
      default: () => {
        return {
          background: "#ffffff",
          fontColor: "#222222"
        };
      }
    }
  }),
  setup(__props, { expose }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value));
    const {
      safeArea,
      windowWidth,
      windowHeight,
      statusBarHeight
    } = common_vendor.index.getSystemInfoSync();
    const view_width = (safeArea == null ? void 0 : safeArea.width) || windowWidth;
    let view_height = (safeArea == null ? void 0 : safeArea.height) - 44;
    view_height = safeArea == null ? void 0 : safeArea.height;
    let appConfig = common_vendor.ref({
      width: view_width,
      height: view_height,
      theme: tmcomputed.value.backgroundColor,
      bgImg: props.bgImg,
      dark: isDark.value
    });
    function setAppStyle() {
      if (isDark.value) {
        appConfig.value.theme = "#050505";
      } else {
        appConfig.value.theme = tmcomputed.value.backgroundColor;
      }
      common_vendor.index.setBackgroundColor({
        backgroundColor: appConfig.value.theme,
        backgroundColorBottom: appConfig.value.theme,
        backgroundColorTop: appConfig.value.theme
      }).catch((e) => {
      });
      if (isDark.value) {
        common_vendor.index.setNavigationBarColor({
          backgroundColor: appConfig.value.theme,
          frontColor: "#ffffff"
        }).catch((e) => {
        });
        common_vendor.index.setTabBarStyle({
          backgroundColor: "#000000",
          borderStyle: "#1a1a1a",
          color: "#ffffff"
        }).catch((e) => {
        });
      } else {
        common_vendor.index.setNavigationBarColor({
          backgroundColor: props.navbar.background,
          frontColor: props.navbar.fontColor
        }).catch((e) => {
        });
        common_vendor.index.setTabBarStyle({
          backgroundColor: props.navbar.background,
          borderStyle: "#888888",
          color: props.navbar.fontColor
        }).catch((e) => {
        });
      }
    }
    setAppStyle();
    common_vendor.provide("appTextColor", common_vendor.computed$1(() => tmcomputed.value.textColor));
    common_vendor.provide("custom_space_size", [0, 0]);
    function setTheme(colorName) {
      store.setTmVuetifyTheme(colorName);
    }
    function setDark(dark) {
      let maindark = !isDark.value;
      if (typeof dark !== "undefined" && typeof dark == "boolean") {
        maindark = dark;
      }
      appConfig.value.dark = maindark;
      store.setTmVuetifyDark(maindark);
    }
    expose({
      setTheme,
      setDark
    });
    common_vendor.onBeforeMount(() => setAppStyle());
    common_vendor.watch([tmcfg, isDark], () => {
      setAppStyle();
    }, { deep: true });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(__props.blur ? "blur" : ""),
        b: common_vendor.s({
          zIndex: 1,
          width: common_vendor.unref(appConfig).width + "px",
          minHeight: common_vendor.unref(appConfig).height + "px"
        }),
        c: common_vendor.s(__props.blur ? {
          backgroundColor: common_vendor.unref(isDark) ? "rgba(0,0,0,0.3)" : "rgba(248, 248, 248, 0.7)"
        } : ""),
        d: common_vendor.s(common_vendor.unref(appConfig).theme ? {
          background: common_vendor.unref(appConfig).theme
        } : ""),
        e: common_vendor.s({
          width: common_vendor.unref(appConfig).width + "px",
          minHeight: common_vendor.unref(appConfig).height + "px"
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-app/tm-app.vue"]]);
wx.createComponent(Component);
