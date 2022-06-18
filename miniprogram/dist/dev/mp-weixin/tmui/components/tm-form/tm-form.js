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
  tmSheet();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    },
    margin: {
      type: Array,
      default: () => [32, 24]
    },
    padding: {
      type: Array,
      default: () => [16, 0]
    },
    layout: {
      type: String,
      default: "horizontal"
    },
    labelWidth: {
      type: Number,
      default: 160
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  emits: ["submit", "reset", "validate", "clearValidate", "update:modelValue"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const _modelVal = common_vendor.ref({});
    common_vendor.watchEffect(() => _modelVal.value = props.modelValue);
    const _backModelVal = __spreadValues({}, props.modelValue);
    const _callBackModelVal = common_vendor.ref([]);
    const tmFormComnameId = "tmFormId";
    const safeFormCom = common_vendor.ref([
      "tm-radio-group",
      "tm-checkbox-box",
      "tm-input",
      "tm-rate",
      "tm-slider",
      "tm-segtab",
      "tm-switch",
      "tm-upload"
    ]);
    const formFunCallBack = common_vendor.ref("");
    common_vendor.provide("tmFormFun", common_vendor.computed$1(() => formFunCallBack.value));
    common_vendor.provide("tmFormLabelWidth", common_vendor.computed$1(() => props.labelWidth));
    common_vendor.provide("tmFormLabelAlign", common_vendor.computed$1(() => props.labelAlign));
    common_vendor.provide("tmFormLayout", common_vendor.computed$1(() => props.layout));
    common_vendor.provide("tmFormBorder", common_vendor.computed$1(() => props.border));
    function reset() {
      formFunCallBack.value = "";
      common_vendor.nextTick(() => {
        formFunCallBack.value = "reset";
        common_vendor.nextTick(() => {
          emits("reset");
          emits("update:modelValue", __spreadValues({}, _backModelVal));
        });
      });
    }
    function clearValidate() {
      formFunCallBack.value = "";
      common_vendor.nextTick(() => {
        formFunCallBack.value = "clearValidate";
        common_vendor.nextTick(() => {
          emits("clearValidate");
        });
      });
    }
    function submit() {
      formFunCallBack.value = "";
      common_vendor.nextTick(() => {
        formFunCallBack.value = "validate";
        common_vendor.nextTick(() => {
          let isPass = true;
          for (let i = 0, len = _callBackModelVal.value.length; i < len; i++) {
            if (_callBackModelVal.value[i].isRequiredError == true) {
              isPass = false;
              break;
            }
          }
          let data = __spreadValues({}, _modelVal.value);
          _callBackModelVal.value.forEach((el) => {
            setObjectVal(data, el.field, el.value);
          });
          console.log({ data, validate: isPass });
          emits("submit", { data, validate: isPass });
        });
      });
    }
    function validate() {
      formFunCallBack.value = "";
      common_vendor.nextTick(() => {
        formFunCallBack.value = "validate";
        common_vendor.nextTick(() => {
          emits("reset");
        });
      });
    }
    function pushKey(item) {
      if (item.componentsName == "" && !safeFormCom.value.includes(item.componentsName))
        return;
      let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
      if (idsIndex == -1) {
        _callBackModelVal.value.push(item);
      } else {
        _callBackModelVal.value[idsIndex] = item;
      }
    }
    function delKey(item) {
      let idsIndex = _callBackModelVal.value.findIndex((el) => el.id == item.id);
      if (idsIndex > -1) {
        _callBackModelVal.value.splice(idsIndex, 1);
      }
    }
    function setObjectVal(obj, field = "", val) {
      if (field == "")
        return obj;
      var arr = field.split(".");
      while (arr.length > 1) {
        let key = String(arr.shift());
        obj = common_vendor.isProxy(obj[key]) ? common_vendor.toRaw(obj[key]) : obj[key];
      }
      return obj[arr[0]] = common_vendor.isProxy(val) ? common_vendor.toRaw(val) : val;
    }
    expose({ reset, validate, clearValidate, submit, pushKey, delKey, tmFormComnameId });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          round: 3,
          _class: "flex flex-col overflow",
          padding: props.padding,
          margin: props.margin
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-form/tm-form.vue"]]);
wx.createComponent(Component);
