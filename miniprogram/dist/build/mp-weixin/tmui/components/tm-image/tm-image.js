"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,l=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,a=require("../../../common/vendor.js"),u=require("../../tool/lib/minxs.js");require("../../tool/theme/theme.js"),require("../../tool/theme/colortool.js"),require("../../tool/lib/interface.js"),require("../../../theme/index.js"),Math||(s+p+d+c)();const d=()=>"../tm-sheet/tm-sheet.js",p=()=>"../tm-text/tm-text.js",s=()=>"../tm-icon/tm-icon.js",c=()=>"../tm-translate/tm-translate.js",f=a.defineComponent({props:(m=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&l(e,r,t[r]);if(n)for(var r of n(t))i.call(t,r)&&l(e,r,t[r]);return e})({},u.custom_props),v={margin:{type:Array,default:()=>[0,0]},padding:{type:Array,default:()=>[0,0]},color:{type:String,default:"white"},transprent:{type:[Boolean,String],default:!0},border:{type:Number,default:0},width:{type:[Number,String],default:200,required:!0},height:{type:[Number,String],default:200,required:!0},src:{type:String,default:"",required:!0},errorIcon:{type:String,default:""},errorLabel:{type:String,default:"加载错误"},loadIcon:{type:String,default:""},preview:{type:[Boolean,String],default:!1},extra:{type:[Boolean,String],default:!1},extraPosition:{type:String,default:"in"},delete:{type:[Boolean,String],default:!1},allowDelete:{type:[Boolean,String],default:!0},model:{type:String,default:"scaleToFill"},unit:{type:String,default:"rpx"}},t(m,r(v))),emits:["load","error","click","delete"],setup(e,{emit:t}){var r;const n=e,{proxy:o}=a.getCurrentInstance();n.height||n.width||console.error("错误：图片宽度和高度必须设置一个");const i=a.computed$1((()=>n.width)),l=a.computed$1((()=>n.height-n.padding[1])),u=a.ref(!0),d=a.ref(!1),p=a.ref(!1);let s=o.$parent;for(;s&&"tmImageGroup"!=(null==s?void 0:s.tmImageGroup)&&s;)s=null!=(r=null==s?void 0:s.$parent)?r:void 0;const c=a.inject("ImagGrupList",a.computed$1((()=>[])));function f(e){u.value=!1,t("load",e)}function m(e){console.error("图片加载错:"+n.src),d.value=!0,u.value=!1,t("error",e)}function v(e){if(t("click",e),n.preview){let e=c?c.value:[n.src];a.index.previewImage({urls:e,current:n.src})}}async function g(){var e;p.value=!1,n.allowDelete?(null==(e=o.$refs)?void 0:e.aniplay)?o.$refs.aniplay.play():p.value=!0:t("delete",n.src)}function h(){p.value=!0}return(null==s?void 0:s.pushKey)&&s.pushKey({width:i.value,height:i.value,src:n.src}),(e,t)=>a.e({a:!p.value},p.value?{}:a.e({b:u.value},u.value?{c:n.src,d:a.o(f),e:a.o(m)}:{},{f:!u.value&&!d.value},u.value||d.value?{}:{g:a.o(v),h:a.n("round-"+n.round),i:n.src,j:a.s({width:a.unref(i)+n.unit,height:a.unref(l)+n.unit}),k:n.model},{l:u.value&&!d.value},u.value&&!d.value?{m:a.p({spin:!0,name:"tmicon-loading"}),n:a.s({width:a.unref(i)+n.unit,height:a.unref(l)+n.unit})}:{},{o:!u.value&&d.value},!u.value&&d.value?{p:a.p({name:"tmicon-exclamation-circle"}),q:a.p({_class:"pt-10","font-size":26,label:n.errorLabel}),r:a.s({width:a.unref(i)+n.unit,height:a.unref(l)+n.unit})}:{},{s:n.extra},n.extra?{t:a.o(v),v:a.n("in"==n.extraPosition?"absolute l-0 b-0 zIndex-5":""),w:a.s(n.extra&&"in"==n.extraPosition?{height:a.unref(l)+n.unit,width:a.unref(i)+n.unit}:""),x:a.s(n.extra&&"out"==n.extraPosition?{width:a.unref(i)+n.unit}:"")}:{},{y:n.delete},n.delete?{z:a.o(g),A:a.p({color:"red",name:"tmicon-times-circle-fill"}),B:a.s(n.delete?{width:a.unref(i)+n.unit}:"")}:{},{C:a.n(`pb-${n.padding[1]}`),D:a.n("round-"+n.round),E:a.p({color:n.color,transprent:n.transprent,margin:n.margin,round:n.round,border:n.border,padding:[n.padding[0],0],width:a.unref(i),unit:n.unit}),F:a.sr("aniplay","709b3e68-0"),G:a.o(h),H:a.p({width:a.unref(i)+n.unit,autoPlay:!1,name:"zoom",reverse:!0})}))}});var m,v;wx.createComponent(f);