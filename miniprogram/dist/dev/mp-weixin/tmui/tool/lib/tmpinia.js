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
var tmui_tool_theme_theme = require("../theme/theme.js");
var tmui_tool_function_util = require("../function/util.js");
let pdefault_cookies_color = tmui_tool_function_util.getCookie("setTmVuetifyColor") || "";
let pdefault_cookies_black = tmui_tool_function_util.getCookie("setTmVuetifyBlack");
let pdefault_cookies_local = tmui_tool_function_util.getCookie("setTmVuetifyLocal") || "zh-Hans";
let dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
let themeObj = new tmui_tool_theme_theme.theme.themeColors();
const colorArray = themeObj.colors;
const os = common_vendor.index.getSystemInfoSync().platform;
const useTmpiniaStore = common_vendor.defineStore("tmpinia", {
  state: () => {
    return {
      tmStore: {
        color: pdefault_cookies_color,
        dark,
        tmVueTifly_pages: "",
        tmVueTifly_pagesIndex: "",
        os,
        wxshareConfig_miniMp: {
          title: "",
          desc: "",
          imageUrl: "",
          path: "",
          copyLink: "",
          query: {}
        },
        colorList: colorArray,
        local: pdefault_cookies_local
      }
    };
  },
  actions: {
    setPageNow(url) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        tmVueTifly_pages: url
      });
    },
    setPageNowIndex(index) {
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        tmVueTifly_pagesIndex: index
      });
    },
    setTmVuetifyDark(dark2) {
      dark2 = typeof dark2 !== "boolean" ? false : dark2;
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        dark: dark2
      });
      tmui_tool_function_util.setCookie("setTmVuetifyBlack", dark2);
    },
    setWxShare(cfg) {
      let pcf = cfg || {};
      if (typeof pcf !== "object" || Array.isArray(cfg))
        pcf = {};
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
      });
    },
    setTmVuetifyTheme(color) {
      let defaultColorName = color;
      if (!defaultColorName || defaultColorName == "" || tmui_tool_theme_theme.theme.isCssColor(defaultColorName)) {
        defaultColorName = "primary";
        console.error("\u4E0D\u652F\u6301\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u4E0A\u7684\u989C\u8272\u503C\uFF0C\u8BF7\u5728theme/theme.js\u4E2D\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684\u989C\u8272\u503C\u4E3A\u4E3B\u9898\u3002\u5F53\u524D\u5DF2\u5207\u6362\u4E3Aprimary\u4E3B\u9898\u3002");
      }
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), { color: defaultColorName });
      tmui_tool_function_util.setCookie("setTmVuetifyColor", defaultColorName);
    },
    setTmLocal(language) {
      language = language || "zh-Hans";
      tmui_tool_function_util.setCookie("setTmVuetifyLocal", language);
      this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
        local: language
      });
    }
  }
});
exports.useTmpiniaStore = useTmpiniaStore;
