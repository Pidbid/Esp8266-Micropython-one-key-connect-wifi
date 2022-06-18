"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  props: {
    activeKey: {
      type: [Array],
      default: () => []
    },
    defaultActiveKey: {
      type: [Array],
      default: () => []
    },
    accordion: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Number, String],
      default: 2
    }
  },
  emits: ["change", "update:active-key"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const _activeKey = common_vendor.ref([...props.activeKey, ...props.defaultActiveKey]);
    if (props.accordion) {
      if (_activeKey.value.length > 0) {
        _activeKey.value = [_activeKey.value[0]];
      }
    }
    const cacheKey = common_vendor.ref([]);
    const pushKey = function(key) {
      cacheKey.value = [.../* @__PURE__ */ new Set([...cacheKey.value, key])];
    };
    const setKey = function(key) {
      let findkey = _activeKey.value.findIndex((el) => String(el) == String(key));
      if (props.accordion) {
        if (findkey > -1) {
          _activeKey.value = [];
        } else {
          _activeKey.value = [key];
        }
      } else {
        if (findkey > -1) {
          _activeKey.value.splice(findkey, 1);
        } else {
          _activeKey.value.push(key);
        }
      }
      emits("update:active-key", _activeKey.value);
      emits("change", _activeKey.value);
    };
    emits("update:active-key", _activeKey.value);
    expose({ tmCollapse: "tmCollapse", setKey, pushKey, border: props.border });
    common_vendor.provide("tmCollapseKeyList", common_vendor.computed$1(() => _activeKey.value));
    return (_ctx, _cache) => {
      return {};
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/tmui/components/tm-collapse/tm-collapse.vue"]]);
wx.createComponent(Component);
