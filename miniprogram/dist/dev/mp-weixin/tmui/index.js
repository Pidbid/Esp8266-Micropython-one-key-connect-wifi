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
var common_vendor = require("../common/vendor.js");
var tmui_tool_theme_theme = require("./tool/theme/theme.js");
var tmui_tool_function_util = require("./tool/function/util.js");
var tmui_tool_function_preview = require("./tool/function/preview.js");
const language$1 = "English-US";
var en = {
  language: language$1
};
const language = "\u7B80\u4F53-\u4E2D\u56FD";
var zhHans = {
  language
};
const $tm = {
  isColor: tmui_tool_theme_theme.theme.isCssColor,
  u: __spreadProps(__spreadValues({}, tmui_tool_function_util.util), { preview: tmui_tool_function_preview.preview })
};
common_vendor.index.$tm = $tm;
const messages = {
  en,
  "zh-Hans": zhHans
};
let i18nConfig = {
  locale: common_vendor.index.getLocale(),
  messages
};
const i18n = common_vendor.createI18n(i18nConfig);
var tmui = {
  install: (app, options) => {
    app.use(i18n);
    app.config.globalProperties.$tm = $tm;
  }
};
exports.tmui = tmui;
