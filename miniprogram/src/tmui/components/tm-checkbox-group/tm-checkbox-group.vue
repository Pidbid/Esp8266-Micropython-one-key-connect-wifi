<template>
  <view class="flex" :class="[props.direction=='row'?'flex-row flex-row-center-start':'flex-col']" :style="{flexWrap:'wrap'}">
  <slot></slot>
  </view>
</template>
<script lang="ts" setup>
import { computed , nextTick, provide ,ref ,watch ,getCurrentInstance,inject } from 'vue';
const emits = defineEmits(['update:modelValue','change'])
const {proxy} = getCurrentInstance()
const props = defineProps({
    disabled:{
        type:Boolean,
        default:false
    },
    //最大选中数量。
    max:{
        type:Number,
        default:999
    },
    defaultValue:{
        type:Array,
        default:()=>[]
    },
    modelValue:{
        type:Array,
        default:()=>[]
    },
    direction:{
        type:String,
        default:'row' //row横排，col为竖排。
    }
})
let _cacheBoxList:Array<string|number|boolean> = [];
//去重
const _mValue = ref([...new Set([...props.defaultValue,...props.modelValue])])
//组件唯一标识。
const checkBoxkeyId = 'tmCheckBoxGroup';
watch(()=>props.modelValue,()=>{
    _mValue.value = props.modelValue;
},{deep:true})
const _maxChecked = computed(()=>_mValue.value.length>=props.max??0)
function pushKey(key:string|number|boolean){
    _cacheBoxList.push(key);
}
nextTick(()=>{
    //只取有用的交集数据，不在列表中的需要过滤掉。
    let a = new Set(_mValue.value);
    let b = new Set(_cacheBoxList);
    const _filter_key = new Set([...b].filter(x=>a.has(x)))
    _mValue.value = [..._filter_key];
    emits('update:modelValue',_mValue.value)
})
function addKey(key:string|number|boolean){
    let seletedKeys = new Set(_mValue.value)
    seletedKeys.add(key)
    _mValue.value=[...seletedKeys];
    emits('change',_mValue.value)
    emits('update:modelValue',_mValue.value)
	pushFormItem()
}
function delKey(key:string|number|boolean){
     let seletedKeys = new Set(_mValue.value)
    seletedKeys.delete(key)
    _mValue.value=[...seletedKeys]
    emits('change',_mValue.value)
    emits('update:modelValue',_mValue.value)
	pushFormItem()
}
/** -----------form专有------------ */
const rulesObj = inject("tmFormItemRules",computed<rulesItem>(()=>{
    return {
        message:"请选择",
        required:false,
        validator:false
    }
}))
//父级方法。
let parentFormItem = proxy.$parent
while (parentFormItem) {
    if (parentFormItem?.tmFormComnameFormItem == 'tmFormComnameFormItem' || !parentFormItem) {
        break;
    } else {
        parentFormItem = parentFormItem?.$parent ?? undefined
       
    }
}

async function pushFormItem(isCheckVail = true){
    if(parentFormItem){
        let isRe = false;
        if(isCheckVail&&rulesObj.value?.required===true){
            if(typeof rulesObj.value.validator == 'function'){
                isRe =await !rulesObj.value.validator(_mValue.value)
            }else if(typeof rulesObj.value.validator == 'boolean'){
                isRe =  rulesObj.value.validator;
            }
            if(typeof rulesObj.value.validator !== 'function'){
                isRe = _mValue.value.length == 0
            }
        }else{
            isRe = _mValue.value.length == 0
        }
        parentFormItem.pushCom({
            value:_mValue.value,
            isRequiredError:isRe,//true,错误，false正常 检验状态
            componentsName:'tm-checkbox-group',//表单组件类型。
            message:rulesObj.value.message,//检验信息提示语。
        })
    }
}
pushFormItem(false)

/** -----------end------------ */


provide("tmCheckedBoxDisabled",computed(()=>props.disabled))
provide("tmCheckedBoxVal",computed(()=>_mValue.value))
provide("tmCheckedBoxMax",_maxChecked)
defineExpose({pushKey:pushKey,addKey:addKey,delKey:delKey,checkBoxkeyId:checkBoxkeyId});
</script>
