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
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    color: {
      type: String,
      default: "white"
    },
    transprent: {
      type: [Boolean, String],
      default: true
    },
    border: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number, String],
      default: 200,
      required: true
    },
    height: {
      type: [Number, String],
      default: 200,
      required: true
    },
    src: {
      type: String,
      default: "",
      required: true
    },
    errorIcon: {
      type: String,
      default: ""
    },
    errorLabel: {
      type: String,
      default: "\u52A0\u8F7D\u9519\u8BEF"
    },
    loadIcon: {
      type: String,
      default: ""
    },
    preview: {
      type: [Boolean, String],
      default: false
    },
    extra: {
      type: [Boolean, String],
      default: false
    },
    extraPosition: {
      type: String,
      default: "in"
    },
    delete: {
      type: [Boolean, String],
      default: false
    },
    allowDelete: {
      type: [Boolean, String],
      default: true
    },
    model: {
      type: String,
      default: "scaleToFill"
    },
    unit: {
      type: String,
      default: "rpx"
    }
  }),
  emits: ["load", "error", "click", "delete"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    if (!props.height && !props.width) {
      console.error("\u9519\u8BEF\uFF1A\u56FE\u7247\u5BBD\u5EA6\u548C\u9AD8\u5EA6\u5FC5\u987B\u8BBE\u7F6E\u4E00\u4E2A");
    }
    const img_width = common_vendor.computed$1(() => {
      return props.width;
    });
    const img_height = common_vendor.computed$1(() => {
      return props.height - props.padding[1];
    });
    const loading = common_vendor.ref(true);
    const error = common_vendor.ref(false);
    const isRmove = common_vendor.ref(false);
    let parent = proxy.$parent;
    while (parent) {
      if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
        break;
      } else {
        parent = (_a = parent == null ? void 0 : parent.$parent) != null ? _a : void 0;
      }
    }
    const ImagGrupList = common_vendor.inject("ImagGrupList", common_vendor.computed$1(() => []));
    if (parent == null ? void 0 : parent.pushKey) {
      parent.pushKey({
        width: img_width.value,
        height: img_width.value,
        src: props.src
      });
    }
    function imageLoad(event) {
      loading.value = false;
      emits("load", event);
    }
    function imageError(event) {
      console.error("\u56FE\u7247\u52A0\u8F7D\u9519:" + props.src);
      error.value = true;
      loading.value = false;
      emits("error", event);
    }
    function imageClick(event) {
      emits("click", event);
      if (props.preview) {
        let list = ImagGrupList ? ImagGrupList.value : [props.src];
        common_vendor.index.previewImage({
          urls: list,
          current: props.src
        });
      }
    }
    async function del() {
      var _a2;
      isRmove.value = false;
      if (!props.allowDelete) {
        emits("delete", props.src);
        return;
      }
      if ((_a2 = proxy.$refs) == null ? void 0 : _a2.aniplay) {
        proxy.$refs.aniplay.play();
      } else {
        isRmove.value = true;
      }
    }
    function aniEnd() {
      isRmove.value = true;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isRmove.value
      }, !isRmove.value ? common_vendor.e({
        b: loading.value
      }, loading.value ? {
        c: props.src,
        d: common_vendor.o(imageLoad),
        e: common_vendor.o(imageError)
      } : {}, {
        f: !loading.value && !error.value
      }, !loading.value && !error.value ? {
        g: common_vendor.o(imageClick),
        h: common_vendor.n("round-" + props.round),
        i: props.src,
        j: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        }),
        k: props.model
      } : {}, {
        l: loading.value && !error.value
      }, loading.value && !error.value ? {
        m: common_vendor.p({
          spin: true,
          name: "tmicon-loading"
        }),
        n: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        })
      } : {}, {
        o: !loading.value && error.value
      }, !loading.value && error.value ? {
        p: common_vendor.p({
          name: "tmicon-exclamation-circle"
        }),
        q: common_vendor.p({
          _class: "pt-10",
          ["font-size"]: 26,
          label: props.errorLabel
        }),
        r: common_vendor.s({
          width: common_vendor.unref(img_width) + props.unit,
          height: common_vendor.unref(img_height) + props.unit
        })
      } : {}, {
        s: props.extra
      }, props.extra ? {
        t: common_vendor.o(imageClick),
        v: common_vendor.n(props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5" : ""),
        w: common_vendor.s(props.extra && props.extraPosition == "in" ? {
          height: common_vendor.unref(img_height) + props.unit,
          width: common_vendor.unref(img_width) + props.unit
        } : ""),
        x: common_vendor.s(props.extra && props.extraPosition == "out" ? {
          width: common_vendor.unref(img_width) + props.unit
        } : "")
      } : {}, {
        y: props.delete
      }, props.delete ? {
        z: common_vendor.o(del),
        A: common_vendor.p({
          color: "red",
          name: "tmicon-times-circle-fill"
        }),
        B: common_vendor.s(props.delete ? {
          width: common_vendor.unref(img_width) + props.unit
        } : "")
      } : {}, {
        C: common_vendor.n(`pb-${props.padding[1]}`),
        D: common_vendor.n("round-" + props.round),
        E: common_vendor.p({
          color: props.color,
          transprent: props.transprent,
          margin: props.margin,
          round: props.round,
          border: props.border,
          padding: [props.padding[0], 0],
          width: common_vendor.unref(img_width),
          unit: props.unit
        }),
        F: common_vendor.sr("aniplay", "709b3e68-0"),
        G: common_vendor.o(aniEnd),
        H: common_vendor.p({
          width: common_vendor.unref(img_width) + props.unit,
          autoPlay: false,
          name: "zoom",
          reverse: true
        })
      }) : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-image/tm-image.vue"]]);
wx.createComponent(Component);
