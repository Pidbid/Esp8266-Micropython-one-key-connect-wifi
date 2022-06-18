"use strict";
var __defProp = Object.defineProperty;
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
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (tmText + tmDivider + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    label: {
      type: String,
      default: ""
    },
    margin: {
      type: Array,
      default: () => [12, 12]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    field: {
      type: String,
      default: ""
    },
    help: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => {
        return { validator: false, required: false };
      }
    },
    border: {
      type: Boolean,
      default: null
    }
  },
  setup(__props, { expose }) {
    var _a;
    const props = __props;
    const { proxy } = common_vendor.getCurrentInstance();
    const tmFormComnameFormItem = "tmFormComnameFormItem";
    const item = common_vendor.ref({
      label: "",
      field: props.field,
      value: null,
      isRequiredError: true,
      message: "",
      id: common_vendor.index.$tm.u.getUid(1),
      componentsName: ""
    });
    const tmFormLabelWidth = common_vendor.inject("tmFormLabelWidth", common_vendor.computed$1(() => 100));
    const tmFormLabelAlign = common_vendor.inject("tmFormLabelAlign", common_vendor.computed$1(() => "left"));
    const tmFormLayout = common_vendor.inject("tmFormLayout", common_vendor.computed$1(() => "horizontal"));
    const tmFormBorder_inject = common_vendor.inject("tmFormBorder", common_vendor.computed$1(() => true));
    const tmFormBorder = common_vendor.computed$1(() => {
      if (props.border !== null && typeof props.border === "boolean")
        return props.border;
      return tmFormBorder_inject.value;
    });
    const _label = common_vendor.computed$1(() => props.label);
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmFormComnameId) == "tmFormId" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    pushCom();
    common_vendor.onUnmounted(() => {
      delCom();
    });
    common_vendor.provide("tmFormItemRules", common_vendor.computed$1(() => {
      var _a2, _b, _c, _d, _e, _f;
      let defaultrs = {
        message: (_b = (_a2 = props == null ? void 0 : props.rules) == null ? void 0 : _a2.message) != null ? _b : "\u8BF7\u586B\u5199\u5FC5\u8981\u7684\u5185\u5BB9",
        required: (_d = (_c = props.rules) == null ? void 0 : _c.required) != null ? _d : props.required,
        validator: (_f = (_e = props.rules) == null ? void 0 : _e.validator) != null ? _f : false
      };
      return defaultrs;
    }));
    function pushCom(itemComval = {}) {
      if (parent) {
        item.value = __spreadValues(__spreadValues({}, item.value), itemComval);
        parent.pushKey(__spreadValues({}, item.value));
      }
    }
    function delCom() {
      if (parent) {
        parent.delKey(item.value);
      }
    }
    const tmFormFun = common_vendor.inject("tmFormFun", common_vendor.computed$1(() => ""));
    expose({ pushCom, delCom, tmFormComnameFormItem });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(_label)
      }, common_vendor.unref(_label) ? {
        b: common_vendor.p({
          color: common_vendor.unref(tmFormFun) == "validate" && item.value.isRequiredError == true ? "red" : "",
          ["font-size"]: 30,
          label: common_vendor.unref(_label)
        }),
        c: common_vendor.s({
          width: common_vendor.unref(tmFormLabelWidth) + "rpx"
        }),
        d: common_vendor.n(common_vendor.unref(tmFormLabelAlign) == "right" ? "flex-col-center-end" : ""),
        e: common_vendor.n(common_vendor.unref(tmFormLayout) != "horizontal" ? "mb-24" : "")
      } : {}, {
        f: common_vendor.unref(tmFormFun) == "validate" && item.value.isRequiredError == true
      }, common_vendor.unref(tmFormFun) == "validate" && item.value.isRequiredError == true ? {
        g: common_vendor.p({
          color: "red",
          ["font-size"]: 22,
          label: item.value.message
        })
      } : {}, {
        h: common_vendor.s(common_vendor.unref(tmFormLayout) == "horizontal" ? {
          width: "0px"
        } : ""),
        i: common_vendor.n(common_vendor.unref(tmFormLayout) == "horizontal" ? "flex-row flex-row-center-start" : "flex-col"),
        j: common_vendor.unref(tmFormBorder)
      }, common_vendor.unref(tmFormBorder) ? {
        k: common_vendor.n(`mt-${props.margin[1] * 2}`),
        l: common_vendor.p({
          margin: [0, 0]
        })
      } : {}, {
        m: common_vendor.p({
          margin: props.margin,
          padding: props.padding
        })
      });
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-form-item/tm-form-item.vue"]]);
wx.createComponent(Component);
