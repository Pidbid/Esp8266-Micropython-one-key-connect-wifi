"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var common_vendor = require("./common/vendor.js");
var tmui_index = require("./tmui/index.js");
require("./tmui/tool/theme/theme.js");
require("./tmui/tool/theme/colortool.js");
require("./tmui/tool/lib/interface.js");
require("./theme/index.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
if (!Math) {
  "./pages/index/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("App Launch");
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  app.use(tmui_index.tmui);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
