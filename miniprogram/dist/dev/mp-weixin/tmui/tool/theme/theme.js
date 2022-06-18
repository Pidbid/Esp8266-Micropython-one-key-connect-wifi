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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var tmui_tool_theme_colortool = require("./colortool.js");
var tmui_tool_lib_interface = require("../lib/interface.js");
var theme_index = require("../../../theme/index.js");
var colors = [];
var colorObj = __spreadValues({
  red: "#ff2414",
  pink: "#ea2a6a",
  purple: "#9C27B0",
  "deep-purple": "#673AB7",
  indigo: "#3F51B5",
  blue: "#2196F3",
  "light-blue": "#03A9F4",
  cyan: "#00BCD4",
  teal: "#009688",
  green: "#4ec752",
  "light-green": "#8BC34A",
  lime: "#CDDC39",
  yellow: "#ffe814",
  amber: "#FFC107",
  orange: "#ffa114",
  "deep-orange": "#FF5722",
  brown: "#795548",
  "blue-grey": "#607D8B",
  grey: "#9E9E9E",
  black: "#000000",
  white: "#FFFFFF",
  primary: "#3B5CF0",
  "grey-5": "#fafafa",
  "grey-4": "#f5f5f5",
  "grey-3": "#eeeeee",
  "grey-2": "#e0e0e0",
  "grey-1": "#bdbdbd",
  "grey-darken-1": "#757575",
  "grey-darken-2": "#616161",
  "grey-darken-3": "#424242",
  "grey-darken-4": "#212121",
  "grey-darken-5": "#131313",
  "grey-darken-6": "#0a0a0a"
}, theme_index.theme);
for (const key in colorObj) {
  if (Object.prototype.hasOwnProperty.call(colorObj, key)) {
    const element = String(colorObj[key]);
    if (isCssColor(element)) {
      let rgba2 = tmui_tool_theme_colortool.colortool.cssToRgba(element);
      colors.push({
        name: key,
        value: element,
        hsva: tmui_tool_theme_colortool.colortool.rgbaToHsva(tmui_tool_theme_colortool.colortool.cssToRgba(element)),
        rgba: tmui_tool_theme_colortool.colortool.cssToRgba(element),
        hsla: tmui_tool_theme_colortool.colortool.rgbaToHsla(rgba2),
        csscolor: `rgba(${rgba2.r},${rgba2.g},${rgba2.b},${rgba2.a})`
      });
    }
  }
}
function isCssColor(color) {
  const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  const reg2 = /^(rgb|RGB|rgba|RGBA)/;
  return reg1.test(color) || reg2.test(color);
}
function getColor(colorName) {
  let isHand = colors.findIndex(function(el, index) {
    return el.name == colorName;
  });
  if (isHand == -1) {
    colorName = "primary";
    isHand = colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    console.error("\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
  }
  return colors[isHand];
}
class themeColors {
  constructor(c = colors) {
    __publicField(this, "colors", []);
    this.colors = c;
  }
  add(colorName = "", value = "") {
    let isHand = this.colors.filter(function(el, index) {
      return el.name == colorName;
    });
    if (isHand.length > 0) {
      console.error("\u5DF2\u5B58\u5728\u76F8\u5173\u989C\u8272\u540D\u79F0!!!");
      return;
    }
    if (!value) {
      console.error("\u989C\u8272\u503C\u5FC5\u586B!!!");
      return;
    }
    let rgba2 = tmui_tool_theme_colortool.colortool.cssToRgba(value);
    let color = {
      csscolor: "",
      hsva: { h: 0, s: 0, v: 0, a: 0 },
      hsla: { h: 0, s: 0, l: 0, a: 0 },
      rgba: { r: 0, g: 0, b: 0, a: 0 },
      name: colorName,
      value
    };
    color.csscolor = tmui_tool_theme_colortool.colortool.rgbaToCss(rgba2);
    color.hsva = tmui_tool_theme_colortool.colortool.rgbaToHsva(rgba2);
    color.rgba = rgba2;
    color.hsla = tmui_tool_theme_colortool.colortool.rgbaToHsla(rgba2);
    this.colors.push(color);
    return this.colors;
  }
  del(colorName) {
    let isHand = this.colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      console.error("\u5220\u9664\u5931\u8D25\uFF0C\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
      return;
    }
    this.colors.splice(isHand, 1);
  }
  getColor(colorName) {
    let isHand = this.colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      console.error("\u4E3B\u9898\u4E2D\u4E0D\u5B58\u5728\u76F8\u5173\u540D\u79F0\u7684\u4E3B\u9898\u3002");
    }
    return this.colors[isHand];
  }
  getTheme(config = { colorname: "primary", dark: false }) {
    var _a, _b;
    if (!config["colorname"]) {
      console.error("\u989C\u8272\u540D\u79F0\u5FC5\u586B");
      config.colorname = "primary";
    }
    config.borderWidth = isNaN(parseInt(String(config["borderWidth"]))) ? 0 : config["borderWidth"];
    config.borderStyle = config["borderStyle"] ? config["borderStyle"] : "solid";
    config.borderDirection = config["borderDirection"] || tmui_tool_lib_interface.cssDirection.all;
    config.linearDirection = config["linearDirection"] || tmui_tool_lib_interface.linearDirection.none;
    config.linearDeep = config["linearDeep"] || tmui_tool_lib_interface.linearDeep.light;
    config.shadow = isNaN(parseInt(String(config["shadow"]))) ? 6 : config["shadow"];
    config.round = isNaN(parseInt(String(config["round"]))) ? 4 : config["round"];
    config.opaticy = isNaN(parseInt(String(config["opaticy"]))) ? 1 : config["opaticy"];
    config.outlined = typeof config["outlined"] == "boolean" ? config["outlined"] : false;
    config.text = typeof config["text"] == "boolean" ? config["text"] : false;
    config.blur = typeof config["blur"] == "boolean" ? config["blur"] : false;
    let index = this.colors.findIndex((el) => el.name == config.colorname);
    let isBlack = false;
    let isWhite = false;
    let isBlackAndWhite = false;
    let isGrey = false;
    let nowColor = __spreadValues({}, this.colors[index]);
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
      isBlack = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
      isWhite = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l < 100) {
      isGrey = true;
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
      isBlackAndWhite = true;
    }
    let css = {};
    css.config = __spreadValues({}, config);
    css.isBlackAndWhite = isBlackAndWhite;
    css.gradientColor = [];
    css.colorname = config.colorname;
    let borderhsl = __spreadValues({}, nowColor.hsla);
    css.borderCss = {};
    let bghsl = __spreadValues({}, nowColor.hsla);
    if (config.dark) {
      if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        bghsl.l = 45;
      }
    }
    if (config.blur) {
      bghsl.a = 0.85;
    }
    css.backgroundColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadValues({}, bghsl)));
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
      css.backgroundColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { l: 9 })));
      css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 16 })));
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 100) {
      css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
    }
    if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && !config.dark && nowColor.hsla.l == 0) {
      css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 16 })));
    }
    css.backgroundColorCss = { "background-color": css.backgroundColor };
    let txcolor = __spreadValues({}, nowColor.hsla);
    if (config.dark) {
      txcolor.l = 95;
    } else {
      if (((_a = nowColor.hsla) == null ? void 0 : _a.l) <= 60) {
        txcolor.l = 95;
      } else if (((_b = nowColor.hsla) == null ? void 0 : _b.l) > 60) {
        if (isGrey) {
          txcolor.l = 10;
        } else {
          txcolor.l = 20;
        }
      }
    }
    if (nowColor.hsla.h > 45 && nowColor.hsla.h < 90 && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
      txcolor.l = 20;
    }
    if (config.outlined) {
      txcolor.l = 50;
      if (config.dark) {
        txcolor.l = 40;
      }
      if ((isBlack || isWhite) && config.dark) {
        txcolor.l = 100;
      }
      config.borderWidth = config["borderWidth"] || 2;
      let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
      let o_bgcss = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(n_hsl));
      css.backgroundColor = o_bgcss;
      css.backgroundColorCss = { "background-color": o_bgcss };
      css.textColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(txcolor));
      css.border = css.textColor;
    }
    if (config.text) {
      if (isGrey) {
        txcolor.l = 15;
      } else {
        txcolor.l = 55;
      }
      if (config.dark) {
        txcolor.l = 50;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config.dark) {
        txcolor.l = 90;
      }
      css.textColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(txcolor));
      css.border = css.textColor;
      let o_now_bgColor = nowColor.csscolor;
      let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
      if (config.dark) {
        if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
          n_hsl.l = 15;
          n_hsl.s = 35;
        } else {
          n_hsl.l = 15;
          n_hsl.s = 0;
        }
      }
      if (config.blur) {
        n_hsl.a = 0.85;
      }
      o_now_bgColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(n_hsl));
      css.backgroundColor = o_now_bgColor;
      css.backgroundColorCss = { "background-color": o_now_bgColor };
    }
    if (config.shadow) {
      let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
      }
      let o_bgcss = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(n_hsl));
      css.shadowColor = {
        boxShadow: `0rpx ${config.shadow * 2.5}rpx ${config.shadow * 6}rpx ${o_bgcss}`
      };
    }
    if (config.linearDirection) {
      let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
      let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
      let dir_str = tmui_tool_lib_interface.linearDirection[config.linearDirection];
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
        if (config.linearDeep == "light") {
          liner_color_1.l = 80;
          liner_color_2.l = 20;
        } else {
          liner_color_1.l = 50;
          liner_color_2.l = 40;
        }
      } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
        if (config.linearDeep == "light") {
          liner_color_1.l = 40;
          liner_color_2.l = 10;
        } else {
          liner_color_1.l = 30;
          liner_color_2.l = 0;
        }
      } else {
        liner_color_2.h = nowColor.hsla.h;
        liner_color_2.s = nowColor.hsla.s;
        liner_color_1.h = nowColor.hsla.h;
        liner_color_1.s = nowColor.hsla.s;
        if (config.linearDeep == "light") {
          liner_color_1.l = 70;
          liner_color_2.l = 50;
        } else if (config.linearDeep == "dark") {
          liner_color_1.l = 60;
          liner_color_2.l = 35;
        } else if (config.linearDeep == "accent") {
          liner_color_1.h = liner_color_1.h - 5;
          liner_color_1.s = liner_color_1.s + 20;
          liner_color_1.l = 65;
          liner_color_2.l = 65;
          liner_color_2.h = liner_color_2.h + 30;
          liner_color_2.s = liner_color_2.s + 20;
        }
      }
      if (config.dark) {
        liner_color_1.l = 45;
        liner_color_2.l = 30;
        txcolor.l = 90;
      }
      let color_t_1 = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(liner_color_1));
      let color_t_2 = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(liner_color_2));
      if (!config.text && !config.outlined) {
        css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
        css.gradientColor = [color_t_1, color_t_2];
      }
    }
    if (config.dark == true) {
      css.cardcolor = "rgba(20, 20,20, 1.0)";
      css.inputcolor = "#1f1f1f";
      css.bodycolor = "rgba(5,5,5, 1.0)";
      css.disablecolor = "rgba(30, 30, 30, 1.0)";
      css.textDisableColor = "rgba(100, 100, 100, 1.0)";
    }
    css.textColor = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(txcolor));
    if (config.dark) {
      if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l + 10 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 20 })));
      }
    } else {
      if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l - 10 })));
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        css.border = tmui_tool_theme_colortool.colortool.rgbaToCss(tmui_tool_theme_colortool.colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
      }
    }
    if (config.borderDirection == "all") {
      css.borderCss[`border`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "x") {
      css.borderCss[`border-left`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-right`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else if (config.borderDirection == "y") {
      css.borderCss[`border-top`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
      css.borderCss[`border-bottom`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    } else {
      let str = "-" + config.borderDirection;
      css.borderCss[`border${str}`] = `${config.borderWidth}rpx ${config.borderStyle} ${css.border}`;
    }
    return css;
  }
}
var theme = {
  isCssColor,
  themeColors,
  getColor
};
exports.theme = theme;
