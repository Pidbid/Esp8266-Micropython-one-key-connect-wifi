"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var e=require("./common/vendor.js"),o=require("./tmui/index.js");require("./tmui/tool/theme/theme.js"),require("./tmui/tool/theme/colortool.js"),require("./tmui/tool/lib/interface.js"),require("./theme/index.js"),require("./tmui/tool/function/util.js"),require("./tmui/tool/function/preview.js"),Math;const t=e.defineComponent({setup:o=>(e.onLaunch((()=>{console.log("App Launch")})),e.onShow((()=>{console.log("App Show")})),e.onHide((()=>{console.log("App Hide")})),()=>{})});function i(){const i=e.createSSRApp(t);return i.use(e.createPinia()),i.use(o.tmui),{app:i,Pinia:e.Pinia}}i().app.mount("#app"),exports.createApp=i;
