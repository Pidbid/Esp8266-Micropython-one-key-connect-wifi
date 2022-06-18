"use strict";
var common_vendor = require("../../../common/vendor.js");
var tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../../theme/index.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmIcon + tmTranslate + tmText + tmSheet + tmOverlay)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const tmOverlay = () => "../tm-overlay/tm-overlay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    _style: {
      type: [Array, String, Object],
      default: () => {
      }
    },
    _class: {
      type: [Array, String],
      default: "flex-center"
    },
    mask: {
      type: [Boolean, String],
      default: false
    },
    duration: {
      type: Number,
      default: 1300
    }
  },
  emits: ["click"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const { proxy } = common_vendor.getCurrentInstance();
    const uid = common_vendor.ref(common_vendor.index.$tm.u.getUid(5));
    const bgColor = common_vendor.ref("white");
    const model_ref = common_vendor.ref("info");
    const showValue = common_vendor.ref(false);
    const icon_ref = common_vendor.ref("");
    const text_ref = common_vendor.ref("");
    const color_ref = common_vendor.ref("");
    const reverse = common_vendor.ref(false);
    const dur = common_vendor.ref(0);
    const aniPlaying = common_vendor.ref(false);
    const showmask = common_vendor.ref(props.mask);
    const dark_ref = common_vendor.ref(null);
    common_vendor.onUnmounted(() => clearTimeout(uid.value));
    common_vendor.watch(() => props.mask, (val) => showmask.value = val);
    const modelIcon = common_vendor.computed$1(() => {
      return {
        load: {
          icon: "tmicon-loading",
          color: "primary",
          text: "\u52A0\u8F7D\u4E2D"
        },
        error: {
          icon: "tmicon-times-circle",
          color: "red",
          text: "\u64CD\u4F5C\u9519\u8BEF"
        },
        info: {
          icon: "tmicon-info-circle",
          text: "\u63D0\u793A\u4FE1\u606F",
          color: "black"
        },
        warn: {
          icon: "tmicon-exclamation-circle",
          text: "\u8B66\u544A\u4FE1\u606F",
          color: "orange"
        },
        quest: {
          icon: "tmicon-question-circle",
          text: "\u4F3C\u4E4E\u6709\u95EE\u9898",
          color: "pink"
        },
        success: {
          icon: "tmicon-check-circle",
          text: "\u64CD\u4F5C\u6210\u529F",
          color: "green"
        },
        disabled: {
          icon: "tmicon-ban",
          text: "\u7981\u6B62\u64CD\u4F5C",
          color: "red"
        },
        wait: {
          icon: "tmicon-ios-alarm",
          text: "\u8BF7\u7A0D\u5019..",
          color: "black"
        }
      };
    });
    function msgOver() {
      var _a;
      if (aniPlaying.value || !((_a = proxy.$refs) == null ? void 0 : _a.tranAni))
        return;
      aniPlaying.value = true;
      if (dur.value > 0 && model_ref.value != "load") {
        clearTimeout(uid.value);
        uid.value = setTimeout(function() {
          var _a2;
          reverse.value = true;
          if (!((_a2 = proxy.$refs) == null ? void 0 : _a2.tranAni)) {
            reverse.value = false;
            showValue.value = false;
            aniPlaying.value = false;
            clearTimeout(uid.value);
            return;
          }
          proxy.$refs.tranAni.play();
          uid.value = setTimeout(function() {
            reverse.value = false;
            showValue.value = false;
            aniPlaying.value = false;
          }, 100);
        }, dur.value);
      }
    }
    function show() {
      clearTimeout(uid.value);
      let arg = typeof arguments[0] === "object" ? arguments[0] : {};
      let { duration, icon, text, color, dark, model, mask } = arg;
      model_ref.value = model != null ? model : model_ref.value;
      icon_ref.value = icon = icon != null ? icon : modelIcon.value[model_ref.value].icon;
      text_ref.value = text = text != null ? text : modelIcon.value[model_ref.value].text;
      color_ref.value = color = color != null ? color : modelIcon.value[model_ref.value].color;
      showmask.value = typeof mask === "boolean" ? mask : showmask.value;
      if (dark === true) {
        bgColor.value = "black";
      }
      if (typeof dark !== "boolean") {
        dark = store.tmStore.dark;
      }
      if (color_ref.value == "white" || color_ref.value == "black") {
        color_ref.value = "";
      }
      dark_ref.value = dark;
      if (typeof duration === "undefined") {
        duration = props.duration;
      }
      dur.value = isNaN(parseInt(duration)) ? 1500 : parseInt(duration);
      showValue.value = true;
      common_vendor.nextTick(function() {
        aniPlaying.value = false;
        reverse.value = false;
        proxy.$refs.tranAni.play();
      });
    }
    function hide() {
      clearTimeout(uid.value);
      showValue.value = false;
    }
    expose({ show, hide });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          _style: "line-height: normal",
          _class: "pa-10",
          spin: model_ref.value == "load",
          color: color_ref.value,
          fontSize: 72,
          name: icon_ref.value
        }),
        b: common_vendor.p({
          name: "zoom",
          delay: 200
        }),
        c: common_vendor.p({
          ["font-size"]: 30,
          _class: "pt-8 text-overflow-1",
          label: text_ref.value
        }),
        d: common_vendor.p({
          blur: true,
          _style: props._style,
          _class: props._class,
          color: bgColor.value,
          border: 1,
          shadow: 6,
          width: 300,
          height: 300,
          margin: [10, 10],
          round: 12,
          padding: [24, 0]
        }),
        e: common_vendor.sr("tranAni", "f3235f30-1,f3235f30-0"),
        f: common_vendor.o(msgOver),
        g: common_vendor.p({
          reverse: reverse.value,
          name: "zoom",
          duration: 150,
          ["auto-play"]: false
        }),
        h: common_vendor.o(($event) => showValue.value = $event),
        i: common_vendor.p({
          transprent: !showmask.value,
          _style: {
            zIndex: "500 !important"
          },
          overlayClick: false,
          show: showValue.value
        })
      };
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-message/tm-message.vue"]]);
wx.createComponent(Component);
