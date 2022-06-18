"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,a=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,i=require("../../../common/vendor.js"),s=require("../../tool/lib/minxs.js");require("../../tool/theme/theme.js"),require("../../tool/theme/colortool.js"),require("../../tool/lib/interface.js"),require("../../../theme/index.js"),Math||(p+d+u)();const u=()=>"../tm-sheet/tm-sheet.js",d=()=>"../tm-text/tm-text.js",p=()=>"../tm-icon/tm-icon.js",f=i.defineComponent({props:(c=((e,t)=>{for(var r in t||(t={}))n.call(t,r)&&a(e,r,t[r]);if(o)for(var r of o(t))l.call(t,r)&&a(e,r,t[r]);return e})({},s.custom_props),m={transprent:{type:Boolean,default:!1},size:{type:String,default:"normal"},fontSize:{type:Number,default:0},margin:{type:Array,default:()=>[0,16]},padding:{type:Array,default:()=>[0,0]},shadow:{type:Number,default:2},width:{type:Number,default:0},height:{type:Number,default:0},block:{type:Boolean,default:!1},round:{type:Number,default:2},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},url:{type:String,default:""},label:{type:String,default:""},icon:{type:String,default:""},formType:{type:String,default:""},openType:{type:String,default:""},appParameter:{type:String,default:""},sessionFrom:{type:String,default:""},sendMessageTitle:{type:String,default:""},sendMessagePath:{type:String,default:""},sendMessageImg:{type:String,default:""},sendMessageCard:{type:String,default:""}},t(c,r(m))),emits:["click","touchstart","touchmove","touchcancel","touchend","tap","longpress","getphonenumber","getuserinfo","getUserProfile","error","opensetting","launchapp","contact"],setup(e,{emit:t}){var r;const o=e,{proxy:n}=i.getCurrentInstance(),l=i.computed$1((()=>o.formType));let a=null;if("reset"==l.value||"submit"==l.value)for(a=n.$parent;a&&"tmFormId"!=(null==a?void 0:a.tmFormComnameId)&&a;)a=null!=(r=null==a?void 0:a.$parent)?r:void 0;const u=i.computed$1((()=>s.computedStyle(o))),d=i.computed$1((()=>s.computedClass(o))),p=i.ref(!1),f=i.computed$1((()=>o.loading)),c=i.computed$1((()=>o.disabled)),m=i.computed$1((()=>o.label)),g=i.computed$1((()=>o.icon)),h=i.computed$1((()=>{let e=o.fontSize||0;return o.block?{w:0,h:o.height?o.height:88,fontSize:e||30}:o.width||o.height?{w:o.width,h:o.height,fontSize:e||30}:"mini"==o.size?{w:88,h:50,fontSize:e||22}:"normal"==o.size?{w:220,h:88,fontSize:e||28}:"middle"==o.size?{w:310,h:88,fontSize:e||30}:"large"==o.size?{w:500,h:100,fontSize:e||34}:{w:220,h:88,fontSize:e||28}}));function y(e){p.value=!0,t("touchstart",e)}function b(e){p.value=!1,t("touchend",e)}function w(e){if(null!=a&&void 0!==a&&l.value&&a[l.value](),t("click",e),""!==o.url&&"string"==typeof o.url){let e=o.url;return"/"!==e[0]&&(e="/"+e),void i.index.navigateTo({url:e})}"getUserInfo"!=o.openType&&"getUserProfile"!=o.openType||i.index.getUserProfile({desc:"需要获取用户信息",lang:"zh",complete:function(e){"getUserProfile:ok"==e.errMsg?(t("getuserinfo",e),t("getUserProfile",e)):i.index.showToast({title:e.errMsg,icon:"error",mask:!0})},fail:e=>{i.index.showToast({title:e})}})}return(e,r)=>({a:i.p({userInteractionEnabled:!1,_class:i.unref(m)?"pr-10":"",fontSize:.9*i.unref(h).fontSize,name:i.unref(g)}),b:i.p({userInteractionEnabled:!1,fontSize:i.unref(h).fontSize,label:i.unref(m)}),c:i.o(w),d:i.o(y),e:i.o(b),f:i.o((e=>t("longpress",e))),g:i.o((e=>{p.value=!1,t("touchcancel",e)})),h:i.o((e=>t("touchmove",e))),i:i.o((e=>t("getphonenumber",e))),j:i.o((e=>t("getuserinfo",e))),k:i.o((e=>t("error",e))),l:i.o((e=>t("opensetting",e))),m:i.o((e=>t("launchapp",e))),n:i.o((e=>t("contact",e))),o:o.formType,p:o.openType,q:o.appParameter,r:o.sessionFrom,s:o.sendMessageTitle,t:o.sendMessagePath,v:o.sendMessageImg,w:o.sendMessageCard,x:i.unref(f),y:i.unref(c),z:i.n(i.unref(d)),A:i.s({height:i.unref(h).h+"rpx"}),B:i.s(i.unref(u)),C:i.p({"no-level":!0,_style:[{opacity:p.value||i.unref(c)?.7:1}],round:o.round,width:i.unref(h).w,height:i.unref(h).h,padding:o.padding,margin:o.margin,color:o.color,shadow:o.shadow,transprent:o.transprent,linear:o.linear,"linear-deep":o.linearDeep,text:o.text,outlined:o.outlined,dark:o.dark,"follow-dark":o.followDark,"follow-theme":o.followTheme,"border-direction":o.borderDirection,"border-style":o.borderStyle,border:o.border,_class:"flex flex-row flex-center"})})}});var c,m,g=i._export_sfc(f,[["__scopeId","data-v-543ad62c"]]);wx.createComponent(g);
