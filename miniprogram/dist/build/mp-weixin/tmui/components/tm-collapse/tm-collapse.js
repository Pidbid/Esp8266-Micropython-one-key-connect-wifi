"use strict";var e=require("../../../common/vendor.js");const t=e.defineComponent({props:{activeKey:{type:[Array],default:()=>[]},defaultActiveKey:{type:[Array],default:()=>[]},accordion:{type:[Boolean,String],default:!1},border:{type:[Number,String],default:2}},emits:["change","update:active-key"],setup(t,{expose:a,emit:u}){const o=t,r=e.ref([...o.activeKey,...o.defaultActiveKey]);o.accordion&&r.value.length>0&&(r.value=[r.value[0]]);const l=e.ref([]);return u("update:active-key",r.value),a({tmCollapse:"tmCollapse",setKey:function(e){let t=r.value.findIndex((t=>String(t)==String(e)));o.accordion?r.value=t>-1?[]:[e]:t>-1?r.value.splice(t,1):r.value.push(e),u("update:active-key",r.value),u("change",r.value)},pushKey:function(e){l.value=[...new Set([...l.value,e])]},border:o.border}),e.provide("tmCollapseKeyList",e.computed$1((()=>r.value))),(e,t)=>({})}});wx.createComponent(t);