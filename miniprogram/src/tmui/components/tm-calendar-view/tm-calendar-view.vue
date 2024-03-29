<!--
 * @Date: 2022-05-07 14:25:19
 * @LastEditors: tmzdy
 * @Author: tmzdy
 * @Description: 文件
-->
<template>
    <tm-sheet :margin="[0, 0]" :padding="[0, 0]">
        <!-- 按日选择的日期，可单选，多选。 -->
        <range-day ref="rDay" @confirm="confirm" @click-day="click" @change="change" @update:model-value="_value = $event"
            :model-value="_value" :default-value="_value" v-if="_modelType == 'rang'" :dateStyle="props.dateStyle"
            :disabledDate="props.disabledDate"  :start="props.start"
            :end="props.end" :color="props.color" :linear="props.linear" :linearDeep="props.linearDeep"></range-day>
        <month-day ref="Day" @confirm="confirm" @click-day="click" @change="change" @update:model-value="_value = $event"
            :model-value="_value" :default-value="_value" v-if="_modelType == 'day'" :dateStyle="props.dateStyle"
            :disabledDate="props.disabledDate" :max="props.max" :multiple="props.multiple" :start="props.start"
            :end="props.end" :color="props.color" :linear="props.linear" :linearDeep="props.linearDeep"></month-day>
        <!-- 按年选择 -->
        <year-du ref="Year" @confirm="confirm" @click-year="click" @change="change" @update:model-value="_value = $event"
            :model-value="_value" :default-value="_value" v-if="_modelType == 'year'" :start="props.start"
            :end="props.end" :color="props.color" :linear="props.linear" :linearDeep="props.linearDeep"></year-du>
        <!-- 按月选择 -->
        <month-year ref="Month" @confirm="confirm" @click-month="click" @change="change" @update:model-value="_value = $event"
            :model-value="_value" :default-value="_value" v-if="_modelType == 'month'" :start="props.start"
            :end="props.end" :color="props.color" :linear="props.linear" :linearDeep="props.linearDeep"></month-year>
        <!-- 按周选择时段 -->
        <week-day ref="Week" @confirm="confirm" @click-week="click" @change="change" @update:model-value="_value = $event"
            :model-value="_value" :default-value="_value" v-if="_modelType == 'week'" :start="props.start"
            :end="props.end" :color="props.color" :linear="props.linear" :linearDeep="props.linearDeep"></week-day>
    </tm-sheet>
</template>

<script lang="ts" setup>
/**
 * 日历(嵌入页面面板)
 * @description 可以按月，按日，按周，按季度显示
 */
import { computed, ref, watch, PropType, Ref ,getCurrentInstance, nextTick, watchEffect } from "vue"
import { custom_props, computedTheme, computedClass, computedStyle, computedDark } from '../../tool/lib/minxs';
import weekDay from './week-day.vue'
import monthYear from "./month-year.vue";
import yearDu from "./year-du.vue";
import monthDay from "./month-day.vue";
import rangeDay from "./range-day.vue";
import tmSheet from '../tm-sheet/tm-sheet.vue';
import { monthDayItem, dateItemStyle, monthYearItem, weekItem, yearItem } from "./interface"
const {proxy} = getCurrentInstance();
/**
 * 事件说明
 * v-model 绑定当前的时间。
 * confirm 当点击确认时触发
 * click 日期被选中时触发，注意禁用的日期不会触发 。
 * change 当切换年或者月的时候触发。
 */
const emits = defineEmits(["update:modelValue","update:modelStr", "confirm", "click", "change"])

const props = defineProps({
    ...custom_props,
    /**
     * 数组
     */
    defaultValue: {
        type: Array as PropType<Array<String | Number | Date>>,
        default: () => []
    },
    modelValue: {
        type: Array as PropType<Array<String | Number | Date>>,
        default: () => []
    },
    //单向绑定输入展示日期，此字段用来在页面上展示。只向外输出。
    //功能目的：用来在页面上显示，特别是在input上绑定显示非常方便。
    //标准数据保存时，请使用modelValue保存，而不是此值。
    modelStr:{
        type:String,
        default:''
    },
    /**
     * 日期模式
     * day : 单个日期选择模式（可多选，需要设置multiple=true;
     * week :按周选择模式。
     * month :按月选择模式。
     * year :按年选择模式。
     * rang :按日期范围选择模式。
     */
    model: {
        type: String,
        default: 'day'
    },
    color: {
        type: String,
        default: 'primary',
    },
    linear: {
        type: String,
        default: '',
    },
    linearDeep: {
        type: String,
        default: 'light',
    },
    //指的是：有效的可选时间，小于此时间，不允许选中。
    start: {
        type: [String, Number, Date],
        default: ""
    },
    //指的是：有效的可选时间，大于此时间，不允许选中。
    end: {
        type: [String, Number, Date],
        default: ""
    },

    /** 日历组件属性 */

    //被禁用的日期数组。如果["2022-1-1","2022-5-1"]
    //被禁用的日期将无法选中。
    disabledDate: {
        type: Array as PropType<Array<String | Number | Date>>,
        default: () => []
    },
    //是否允许多选。
    multiple: {
        type: Boolean,
        default: false
    },
    //设定单个日期的样式。
    dateStyle: {
        type: Array as PropType<Array<dateItemStyle>>,
        default: () => []
    },
    //当multiple=true时，可以选择的最大日期数量。
    max: {
        type: Number,
        default: 999
    }
    /** 日历组件属性结束 */

})
const _value = ref(props.defaultValue)
const _modelType = computed(()=>props.model)
watch(() => props.modelValue, () => _value.value = props.modelValue, { deep: true })
watch(_value,()=>{
    emits("update:modelStr",_value.value.join("~"))
},{deep:true})
function change(e: Array<string | number>) {
    emits("change", e)
}
function click(e: Array<string | number>) {
    emits("click", e)
}
function confirm(e: Array<string | number>) {
    emits("confirm", e)
    emits("update:modelValue", e)
}
function getRefs(){
    if(_modelType.value=='day') return proxy.$refs.Day
    if(_modelType.value=='rang') return proxy.$refs.rDay
    if(_modelType.value=='week') return proxy.$refs.Week
    if(_modelType.value=='month') return proxy.$refs.Month
    if(_modelType.value=='year') return proxy.$refs.Year
    return proxy.$refs.Day
}
/**
 * ref方法。外部如果要即时调用 ，请注意包裹在nextTick中执行。
 */

defineExpose({
    setDefault:(e)=>{
        nextTick(()=>getRefs().setDefault(e))
    },
    nextYear:()=>{
        nextTick(()=>getRefs().nextYear())
    },
    // mont,year模式下，没有此方法
    nextMonth:()=>{
        nextTick(()=>getRefs().nextMonth())
    }, 
    prevYear:()=>{
        nextTick(()=>getRefs().prevYear())
    },
    // mont,year模式下，没有此方法
    prevMonth:()=>{
        nextTick(()=>getRefs().prevMonth())
    } 
})

</script>
