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
if (!Math) {
  (tmIcon + tmText + TmButton + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const TmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    color: {
      type: String,
      default: "grey-4"
    },
    focusColor: {
      type: String,
      default: "primary"
    },
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: Number,
      default: 64
    },
    prefix: {
      type: String,
      default: ""
    },
    prefixLabel: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    search: {
      type: String,
      default: ""
    },
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    errorLabel: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const { proxy } = common_vendor.getCurrentInstance();
    let parentFormItem = proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_a = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _a : void 0;
      }
    }
    const isAndroid = common_vendor.ref(false);
    isAndroid.value = common_vendor.index.getSystemInfoSync().platform == "android" ? true : false;
    const _height = common_vendor.computed$1(() => props.height);
    const _inputPadding = common_vendor.computed$1(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
    const propsDetail = common_vendor.computed$1(() => {
      return {
        prefix: props.prefix,
        prefixLabel: props.prefixLabel,
        fontSize: props.fontSize,
        fontSize_px: common_vendor.index.upx2px(props.fontSize),
        suffix: props.suffix,
        suffixLabel: props.suffixLabel,
        fontColor: props.fontColor,
        search: props.search,
        searchLabel: props.searchLabel,
        showClear: props.showClear,
        password: props.password,
        disabled: props.disabled,
        placeholder: props.placeholder,
        showCharNumber: props.showCharNumber,
        maxlength: props.maxlength,
        cursorSpacing: props.cursorSpacing,
        confirmType: props.confirmType,
        confirmHold: props.confirmHold,
        autoBlur: props.autoBlur,
        holdKeyboard: props.holdKeyboard,
        adjustPosition: props.adjustPosition,
        type: props.type
      };
    });
    const tmcfg = common_vendor.computed$1(() => store.tmStore);
    common_vendor.computed$1(() => tmui_tool_lib_minxs.computedStyle(props));
    common_vendor.computed$1(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed$1(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const _requiredError = common_vendor.ref(false);
    const _foucsActive = common_vendor.ref(false);
    const _color = common_vendor.computed$1(() => {
      let color = props.color;
      if (_foucsActive.value)
        color = props.focusColor;
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = common_vendor.computed$1(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return tmui_tool_lib_minxs.computedTheme(_props, isDark.value);
    });
    const showPasswordText = common_vendor.ref(propsDetail.value.password);
    const showPasswordIcon = common_vendor.computed$1(() => props.password);
    const _errorLabel = common_vendor.ref(props.errorLabel);
    const _value = common_vendor.ref(props.modelValue);
    const _valueLenChar = common_vendor.computed$1(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    common_vendor.watch(() => props.modelValue, () => _value.value = props.modelValue);
    const rulesObj = common_vendor.inject("tmFormItemRules", common_vendor.computed$1(() => {
      var _a2;
      return {
        message: (_a2 = props == null ? void 0 : props.errorLabel) != null ? _a2 : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
        required: false,
        validator: false
      };
    }));
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus() {
      _foucsActive.value = true;
      emits("focus");
    }
    function blur() {
      _foucsActive.value = false;
      pushFormItem();
      emits("blur");
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      _value.value = e.detail.value;
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    const tmFormFun = common_vendor.inject("tmFormFun", common_vendor.computed$1(() => ""));
    async function pushFormItem(isCheckVail = true) {
      var _a2;
      if (parentFormItem) {
        let isRe = false;
        if (isCheckVail && ((_a2 = rulesObj.value) == null ? void 0 : _a2.required) === true) {
          if (typeof rulesObj.value.validator == "function") {
            isRe = await !rulesObj.value.validator(_value.value);
          } else if (typeof rulesObj.value.validator == "boolean") {
            isRe = rulesObj.value.validator;
          }
          if (typeof rulesObj.value.validator !== "function") {
            isRe = String(_value.value).length == 0;
          }
          _requiredError.value = isRe;
        }
        _errorLabel.value = String(rulesObj.value.message);
        parentFormItem.pushCom({
          value: _value.value,
          isRequiredError: isRe,
          componentsName: "tm-input",
          message: rulesObj.value.message
        });
      }
    }
    common_vendor.watch(tmFormFun, () => {
      if (tmFormFun.value == "validate") {
        pushFormItem();
      }
      if (tmFormFun.value == "reset") {
        _value.value = "";
        _requiredError.value = false;
        emits("update:modelValue", _value.value);
        pushFormItem(false);
      }
      if (tmFormFun.value == "clearValidate") {
        _requiredError.value = false;
        pushFormItem(false);
      }
    });
    pushFormItem(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel
      }, common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel ? {} : {}, {
        b: common_vendor.unref(propsDetail).prefix
      }, common_vendor.unref(propsDetail).prefix ? {
        c: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: common_vendor.unref(propsDetail).prefix
        })
      } : {}, {
        d: common_vendor.unref(propsDetail).prefixLabel
      }, common_vendor.unref(propsDetail).prefixLabel ? {
        e: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          label: common_vendor.unref(propsDetail).prefixLabel
        })
      } : {}, {
        f: !isAndroid.value
      }, !isAndroid.value ? common_vendor.e({
        g: common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).type != "textarea" ? {
        h: _value.value,
        i: common_vendor.o(focus),
        j: common_vendor.o(blur),
        k: common_vendor.o(confirm),
        l: common_vendor.o(inputHandler),
        m: common_vendor.o(($event) => emits("keyboardheightchange")),
        n: showPasswordText.value,
        o: common_vendor.unref(propsDetail).maxlength,
        p: common_vendor.unref(propsDetail).disabled,
        q: common_vendor.unref(propsDetail).cursorSpacing,
        r: common_vendor.unref(propsDetail).confirmType,
        s: common_vendor.unref(propsDetail).confirmHold,
        t: common_vendor.unref(propsDetail).autoBlur,
        v: common_vendor.unref(propsDetail).holdKeyboard,
        w: common_vendor.unref(propsDetail).adjustPosition,
        x: common_vendor.unref(propsDetail).type,
        y: common_vendor.unref(propsDetail).placeholder,
        z: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        A: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px`
      } : {}, {
        B: common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).type == "textarea" ? {
        C: _value.value,
        D: common_vendor.o(focus),
        E: common_vendor.o(blur),
        F: common_vendor.o(confirm),
        G: common_vendor.o(inputHandler),
        H: common_vendor.o(($event) => emits("keyboardheightchange")),
        I: common_vendor.unref(propsDetail).maxlength,
        J: showPasswordText.value,
        K: common_vendor.unref(propsDetail).disabled,
        L: common_vendor.unref(propsDetail).placeholder,
        M: common_vendor.unref(propsDetail).cursorSpacing,
        N: common_vendor.unref(propsDetail).confirmType,
        O: common_vendor.unref(propsDetail).confirmHold,
        P: common_vendor.unref(propsDetail).autoBlur,
        Q: common_vendor.unref(propsDetail).holdKeyboard,
        R: common_vendor.unref(propsDetail).adjustPosition,
        S: common_vendor.unref(propsDetail).type,
        T: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          width: "auto",
          "word-break": "break-word",
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        U: {
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }
      } : {}, {
        V: common_vendor.o(($event) => emits("click", $event)),
        W: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        X: isAndroid.value
      }, isAndroid.value ? common_vendor.e({
        Y: common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).type != "textarea" ? {
        Z: common_vendor.o(($event) => emits("click", $event)),
        aa: _value.value,
        ab: common_vendor.o(focus),
        ac: common_vendor.o(blur),
        ad: common_vendor.o(confirm),
        ae: common_vendor.o(inputHandler),
        af: common_vendor.o(($event) => emits("keyboardheightchange")),
        ag: showPasswordText.value,
        ah: common_vendor.unref(propsDetail).disabled,
        ai: common_vendor.unref(propsDetail).cursorSpacing,
        aj: common_vendor.unref(propsDetail).confirmType,
        ak: common_vendor.unref(propsDetail).confirmHold,
        al: common_vendor.unref(propsDetail).autoBlur,
        am: common_vendor.unref(propsDetail).holdKeyboard,
        an: common_vendor.unref(propsDetail).adjustPosition,
        ao: common_vendor.unref(propsDetail).maxlength,
        ap: common_vendor.unref(propsDetail).type,
        aq: common_vendor.unref(propsDetail).placeholder,
        ar: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        as: `fontSize:${common_vendor.unref(propsDetail).fontSize_px}px`
      } : {}, {
        at: common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).type == "textarea" ? {
        av: common_vendor.o(($event) => emits("click", $event)),
        aw: _value.value,
        ax: common_vendor.o(focus),
        ay: common_vendor.o(blur),
        az: common_vendor.o(confirm),
        aA: common_vendor.o(inputHandler),
        aB: common_vendor.o(($event) => emits("keyboardheightchange")),
        aC: showPasswordText.value,
        aD: common_vendor.unref(propsDetail).disabled,
        aE: common_vendor.unref(propsDetail).placeholder,
        aF: common_vendor.unref(propsDetail).cursorSpacing,
        aG: common_vendor.unref(propsDetail).confirmType,
        aH: common_vendor.unref(propsDetail).confirmHold,
        aI: common_vendor.unref(propsDetail).autoBlur,
        aJ: common_vendor.unref(propsDetail).holdKeyboard,
        aK: common_vendor.unref(propsDetail).adjustPosition,
        aL: common_vendor.unref(propsDetail).maxlength,
        aM: common_vendor.unref(propsDetail).type,
        aN: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`,
          width: "auto",
          "word-break": "break-word",
          color: common_vendor.unref(propsDetail).fontColor ? common_vendor.unref(propsDetail).fontColor : common_vendor.unref(tmcomputed).textColor,
          "text-align": props.align,
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }),
        aO: {
          "fontSize": `${common_vendor.unref(propsDetail).fontSize_px}px`
        }
      } : {}, {
        aP: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        aQ: common_vendor.unref(propsDetail).showClear && common_vendor.unref(_valueLenChar) > 0
      }, common_vendor.unref(propsDetail).showClear && common_vendor.unref(_valueLenChar) > 0 ? {
        aR: common_vendor.o(clearBtn),
        aS: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize * 0.9,
          name: "tmicon-times-circle-fill"
        })
      } : {}, {
        aT: _requiredError.value
      }, _requiredError.value ? {
        aU: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: "tmicon-exclamation-circle"
        })
      } : {}, {
        aV: common_vendor.unref(propsDetail).suffix
      }, common_vendor.unref(propsDetail).suffix ? {
        aW: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize * 0.85,
          name: common_vendor.unref(propsDetail).suffix
        })
      } : {}, {
        aX: common_vendor.unref(propsDetail).suffixLabel
      }, common_vendor.unref(propsDetail).suffixLabel ? {
        aY: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          label: common_vendor.unref(propsDetail).suffixLabel
        })
      } : {}, {
        aZ: common_vendor.unref(showPasswordIcon)
      }, common_vendor.unref(showPasswordIcon) ? {
        ba: common_vendor.o(changeSeePassword),
        bb: common_vendor.p({
          ["font-size"]: common_vendor.unref(propsDetail).fontSize,
          name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
        })
      } : {}, {
        bc: common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type != "textarea"
      }, common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type != "textarea" ? common_vendor.e({
        bd: common_vendor.p({
          label: common_vendor.unref(_valueLenChar)
        }),
        be: common_vendor.unref(propsDetail).maxlength > 0
      }, common_vendor.unref(propsDetail).maxlength > 0 ? {
        bf: common_vendor.p({
          label: "/" + common_vendor.unref(propsDetail).maxlength
        })
      } : {}) : {}, {
        bg: common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type == "textarea"
      }, common_vendor.unref(propsDetail).showCharNumber && common_vendor.unref(_valueLenChar) > 0 && common_vendor.unref(propsDetail).type == "textarea" ? common_vendor.e({
        bh: common_vendor.p({
          label: common_vendor.unref(_valueLenChar)
        }),
        bi: common_vendor.unref(propsDetail).maxlength > 0
      }, common_vendor.unref(propsDetail).maxlength > 0 ? {
        bj: common_vendor.p({
          label: "/" + common_vendor.unref(propsDetail).maxlength
        })
      } : {}) : {}, {
        bk: common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel
      }, common_vendor.unref(propsDetail).search || common_vendor.unref(propsDetail).searchLabel ? {
        bl: common_vendor.o(searchClick),
        bm: common_vendor.p({
          color: props.focusColor,
          ["font-size"]: 24,
          height: common_vendor.unref(_height) - 11,
          padding: [16, 0],
          block: true,
          margin: [0, 0],
          icon: common_vendor.unref(propsDetail).search,
          label: common_vendor.unref(propsDetail).searchLabel
        })
      } : {}, {
        bn: common_vendor.n(common_vendor.unref(propsDetail).type == "textarea" ? "flex-row-top-center" : "flex-row-center-center"),
        bo: common_vendor.s({
          height: `${common_vendor.unref(_height)}rpx`
        }),
        bp: common_vendor.p({
          transprent: props.transprent,
          round: props.round,
          ["no-level"]: true,
          margin: [0, 0],
          padding: common_vendor.unref(_inputPadding),
          border: props.border,
          text: props.text,
          color: common_vendor.unref(_color),
          outlined: props.outlined
        }),
        bq: common_vendor.p({
          transprent: true,
          margin: props.margin,
          padding: props.padding
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-input/tm-input.vue"]]);
wx.createComponent(Component);
