"use strict";
var common_vendor = require("../../common/vendor.js");
var logoimg = "/static/logo.png";
if (!Array) {
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_sheet2 = common_vendor.resolveComponent("tm-sheet");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_form_item2 = common_vendor.resolveComponent("tm-form-item");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_form2 = common_vendor.resolveComponent("tm-form");
  const _easycom_tm_collapse_item2 = common_vendor.resolveComponent("tm-collapse-item");
  const _easycom_tm_collapse2 = common_vendor.resolveComponent("tm-collapse");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_message2 = common_vendor.resolveComponent("tm-message");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_image2 + _easycom_tm_text2 + _easycom_tm_sheet2 + _easycom_tm_input2 + _easycom_tm_form_item2 + _easycom_tm_button2 + _easycom_tm_form2 + _easycom_tm_collapse_item2 + _easycom_tm_collapse2 + _easycom_tm_divider2 + _easycom_tm_message2 + _easycom_tm_app2)();
}
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_sheet = () => "../../tmui/components/tm-sheet/tm-sheet.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_form_item = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_form = () => "../../tmui/components/tm-form/tm-form.js";
const _easycom_tm_collapse_item = () => "../../tmui/components/tm-collapse-item/tm-collapse-item.js";
const _easycom_tm_collapse = () => "../../tmui/components/tm-collapse/tm-collapse.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_message = () => "../../tmui/components/tm-message/tm-message.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_image + _easycom_tm_text + _easycom_tm_sheet + _easycom_tm_input + _easycom_tm_form_item + _easycom_tm_button + _easycom_tm_form + _easycom_tm_collapse_item + _easycom_tm_collapse + _easycom_tm_divider + _easycom_tm_message + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const formData = { ip: "192.168.4.1", ssid: "", password: "", port: 7788 };
    const startConnect = () => {
      if (formData.ssid === "" || formData.password === "") {
        proxy.$refs.message.show({ text: "\u6570\u636E\u4E0D\u5B8C\u6574", model: "error" });
      }
      const udps = wx.createUDPSocket();
      udps.bind();
      udps.send({
        address: formData.ip,
        port: formData.port,
        message: JSON.stringify({ login: "yes", ssid: formData.ssid, password: formData.password })
      });
      proxy.$refs.message.show({ text: "\u914D\u7F51\u4E2D", model: "primary" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: 108,
          height: 67.5,
          src: common_vendor.unref(logoimg)
        }),
        b: common_vendor.p({
          _class: "text-weight-b",
          ["font-size"]: 36,
          label: "Mpy\u4E00\u952E\u914D\u7F51"
        }),
        c: common_vendor.p({
          color: "grey",
          label: "\u4F7F\u7528 Micropython \u5B9E\u73B0\u7684Esp8266/32\u914D\u7F51"
        }),
        d: common_vendor.p({
          darkBgColor: "#050505",
          margin: [0, 0]
        }),
        e: common_vendor.p({
          text: true,
          color: "blue"
        }),
        f: common_vendor.o(($event) => formData.ip = $event),
        g: common_vendor.p({
          modelValue: formData.ip
        }),
        h: common_vendor.p({
          label: "\u8BBE\u5907ip"
        }),
        i: common_vendor.o(($event) => formData.port = $event),
        j: common_vendor.p({
          type: "number",
          modelValue: formData.port
        }),
        k: common_vendor.p({
          label: "\u8BBE\u5907\u7AEF\u53E3"
        }),
        l: common_vendor.o(($event) => formData.ssid = $event),
        m: common_vendor.p({
          type: "text",
          placeholder: "WIFI SSID",
          modelValue: formData.ssid
        }),
        n: common_vendor.p({
          label: "WIFI\u540D"
        }),
        o: common_vendor.o(($event) => formData.password = $event),
        p: common_vendor.p({
          type: "text",
          placeholder: "WIFI\u5BC6\u7801",
          password: true,
          modelValue: formData.password
        }),
        q: common_vendor.p({
          label: "\u5BC6\u7801"
        }),
        r: common_vendor.o(startConnect),
        s: common_vendor.p({
          color: "green",
          size: "large",
          block: true
        }),
        t: common_vendor.p({
          round: 3,
          margin: [15, 15]
        }),
        v: common_vendor.p({
          name: "0",
          title: "\u9879\u76EE\u4ECB\u7ECD"
        }),
        w: common_vendor.p({
          name: "1",
          title: "\u5982\u4F55\u4F7F\u7528\uFF1F"
        }),
        x: common_vendor.p({
          round: 3,
          margin: [15, 15]
        }),
        y: common_vendor.p({
          color: "grey-2",
          label: "Mpy\u914D\u7F51-Wicos\u9879\u76EE"
        }),
        z: common_vendor.sr("message", "7a7b0078-23,7a7b0078-0"),
        A: common_vendor.sr("app", "7a7b0078-0")
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/CODE/mpyConnect/src/pages/index/index.nvue"]]);
wx.createPage(MiniProgramPage);
